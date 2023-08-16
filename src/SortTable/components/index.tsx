import { MenuOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import React, { useEffect, useState } from 'react';
import type { SortEnd, SortableContainerProps } from 'react-sortable-hoc';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import { diffNodesSameLevel } from '../../util';
import './style.less';

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
));

const SortableItem = SortableElement(
  (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />,
);
const SortableBody = SortableContainer(
  (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
  ),
);

interface SortTableProps {
  dataSource: any[];
  columns: any[];
  loading?: boolean;
  isSort: boolean;
  onSortEnd?: (
    changeNodes: any[],
    newData: any[],
    oldData: any[],
  ) => Promise<any> | void;
  rowKey: string;
  sortKey?: string;
  pagination?: any;
  service?: boolean; //后端分页
}

export const SortTable = (props: SortTableProps) => {
  const {
    dataSource: propsDataSource,
    columns: propsColumns,
    onSortEnd: propsOnSortEnd,
    isSort = true,
    rowKey,
    sortKey = 'sort',
    pagination,
    service = false,
    loading,
    ...others
  } = props;
  const [dataSource, setDataSource] = useState<typeof propsDataSource>([]);
  const [columns, setColumns] = useState<typeof propsColumns>([]);

  useEffect(() => {
    setColumns(
      isSort
        ? [
            {
              title: '排序',
              dataIndex: sortKey,
              width: 90,
              render: () => <DragHandle />,
            },
          ].concat(propsColumns)
        : propsColumns,
    );
  }, [isSort]);

  useEffect(() => {
    setDataSource(
      propsDataSource.map((i: any, index: number) => ({ ...i, index })),
    );
  }, [propsDataSource]);

  const onSortEnd = async ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const oldData = dataSource.map((source: any, index: any) => ({
        ...source,
        [sortKey]: index,
      }));

      const newData = arrayMoveImmutable(dataSource, oldIndex, newIndex).map(
        (item, index) => ({
          ...(item as any),
          [sortKey]: index,
        }),
      );

      const changeNodes = diffNodesSameLevel(
        oldData,
        newData,
        sortKey,
        rowKey,
      ).map((item) => {
        const node = {};
        node[rowKey] = item[rowKey];
        //这里针对的是 后端分页时
        if (service) {
          node[sortKey] =
            item[sortKey] +
            (pagination ? (pagination.current - 1) * pagination.pageSize : 0);
        } else {
          node[sortKey] = item[sortKey];
        }
        return node;
      });
      if (changeNodes.length === 0) return;
      setDataSource(newData);
      await propsOnSortEnd?.(changeNodes, newData, oldData)?.catch(() =>
        setDataSource(oldData),
      );
    }
  };

  const DraggableContainer = (props: SortableContainerProps) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow: React.FC<any> = ({ _1, _2, ...restProps },i) => {
    const index = dataSource.findIndex(
      (x: any) => x.index === restProps['data-row-key'],
    );
    restProps.index = index;
    return <SortableItem {...restProps} />;
  };

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey="index"
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
      pagination={pagination}
      loading={loading}
      {...others}
    />
  );
};
