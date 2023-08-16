import { Spin, Tree } from 'antd';
import { DataNode, TreeProps } from 'antd/es/tree';
import { arrayMoveImmutable } from 'array-move';
import lodash from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { diffNodesSameLevel, findNode, renderTitle } from '@/util';
export type TreeNode = DataNode & {
  parentId?: React.Key;
  sorter?: string;
} & Record<string, any>;

interface SortTreeProps extends Omit<TreeProps, 'onDropEnd'> {
  onDropEnd?: (
    newData: TreeNode[],
    oldData: TreeNode[],
    changeNodes: TreeNode[],
  ) => Promise<any> | void;
  isRoot: (node: TreeNode) => boolean;
  fieldNames: TreeProps['fieldNames'] & { parentId: string; sorter: string };
  keyword?: string;
  loading?: boolean;
}
export const SortTree = (props: SortTreeProps) => {
  const {
    treeData,
    onDropEnd,
    onExpand,
    expandedKeys,
    isRoot,
    fieldNames,
    keyword = '',
    loading,
  } = props;
  const [gData, setGData] = useState<TreeNode[]>([]);
  const [expands, setExpands] = useState<React.Key[]>([]);
  const draggingRef = useRef(false);
  // const [loading, setLoading] = useState(false);
  const {
    key: fieldKey = 'key',
    // title: fieldTitle = 'title',
    children: fieldChildren = 'children',
    parentId: fieldParentId = 'parentId',
    sorter: fieldSorter = 'sorter',
  } = fieldNames || {};

  const onDrop: TreeProps['onDrop'] = async (info) => {
    const { dragNode, node, dropPosition } = info;
    const root = isRoot(info.dragNode);
    let parentNode;
    let newNodes = lodash.cloneDeep(gData);
    let oldNodes, sameLevelNodes;
    if (root) {
      oldNodes = sameLevelNodes = newNodes;
    } else {
      parentNode = findNode(
        (info.dragNode as TreeNode)[fieldParentId] as string,
        fieldKey,
        newNodes,
        fieldChildren,
      );
      oldNodes = sameLevelNodes = [...(parentNode?.[fieldChildren] || [])];
    }
    sameLevelNodes = sameLevelNodes.map((node, index) => ({
      ...node,
      [fieldSorter]: index,
    }));

    const oldPos = Number(dragNode.pos.split('-').pop());
    const newPosAbsolute = Number(node.pos.split('-').pop());
    const newPos =
      dropPosition === -1 || dragNode[fieldParentId] === node[fieldKey] //这里就是第一级和其他级拖拽到首位的逻辑
        ? 0
        : newPosAbsolute > oldPos
        ? newPosAbsolute
        : newPosAbsolute + 1;
    const newData = arrayMoveImmutable(sameLevelNodes, oldPos, newPos).map(
      (node, index) => ({ ...(node as TreeNode), [fieldSorter]: index }),
    );
    const changeNodes = diffNodesSameLevel(
      sameLevelNodes,
      newData,
      fieldSorter,
      fieldKey,
    );
    if (changeNodes.length === 0) return;

    let newResult;
    let oldResult;

    if (root) {
      newResult = newData;
      oldResult = oldNodes;
    } else {
      parentNode[fieldChildren] = newData;
      newResult = newNodes;
      oldResult = gData;
    }
    try {
      // setLoading(true);
      setGData(newResult);
      await onDropEnd?.(newResult, oldResult, changeNodes);
    } catch (error) {
      setGData(oldResult);
    } finally {
      // setLoading(false);
    }
  };


  useEffect(() => {
    setGData(treeData || []);
  }, [treeData]);

  useEffect(() => {
    expandedKeys && setExpands(expandedKeys);
  }, [expandedKeys]);

  useEffect(() => {
    setGData([...gData]);
  }, [fieldNames.children]);

  const keywordData = useMemo(() => {
    const word = keyword.trim();
    if (word.length === 0) return gData;
    const loop = (data: DataNode[]): DataNode[] =>
      data.map((item) => {
        const title = renderTitle(item.title, keyword);

        if (item[fieldNames.children as string]) {
          return {
            ...item,
            title,
            [fieldKey]: item[fieldKey],
            [fieldNames.children as string]: loop(
              item[fieldNames.children as string],
            ),
          };
        }
        return {
          ...item,
          title,
          [fieldKey]: item[fieldKey],
        };
      });

    return loop(gData);
  }, [gData, keyword, fieldKey, renderTitle]);

  return (
    <Spin spinning={loading}>
      <Tree
        {...props}
        expandedKeys={expands}
        onExpand={(keys, info) => {
          if (draggingRef.current) return;
          setExpands(keys);
          onExpand?.(keys, info);
        }}
        draggable
        blockNode
        onDrop={onDrop}
        treeData={keywordData}
        allowDrop={(inf) => {
          const { dragNode, dropNode, dropPosition } = inf;
          //拖拽到第一行
          if (dropPosition === 0)
            return dragNode[fieldParentId] === dropNode[fieldKey];
          return dragNode[fieldParentId] === dropNode[fieldParentId];
        }}
        onDragStart={() => {
          draggingRef.current = true;
        }}
        onDragEnd={() => {
          draggingRef.current = false;
        }}
      />
    </Spin>
  );
};