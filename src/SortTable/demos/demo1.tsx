import { useState } from 'react';
import { SortTable } from '../components/index';
import { message } from 'antd';

export default () => {
  const current = 3;
  const pageSize = 10;
  const computeNumber = (current - 1) * pageSize;
  const [dataSource] = useState(new Array(2).fill({}).map((_, index) => ({
    id: computeNumber + index,
    name: computeNumber + index + 'name',
    idx: computeNumber + index,
  })));
  const total = computeNumber + dataSource.length;
  const columns = [
    { dataIndex: 'idx', title: 'idx' },
    { dataIndex: 'id', title: 'id' },
    { dataIndex: 'name', title: 'name' },
  ];

  const [loading, setLoading] = useState(false);

  return (
    <SortTable
      loading={loading}
      isSort={true}
      rowKey={'id'}
      sortKey={'sorter'}
      pagination={{
        current,
        pageSize,
        total,
      }}
      dataSource={dataSource}
      columns={columns}
      onSortEnd={(changeNodes, newData) => {
        console.log(changeNodes, newData, 'newData');
        setLoading(true);
        return new Promise((resolve,reject) => {
          setTimeout(() => {
            // resolve('success');
            message.error("sort error")
            reject('error')
          }, 1000);
        }).finally(() => {
          setLoading(false);
        });
      }}
      service={true}
    />
  );
};
