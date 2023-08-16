import React, { useEffect, useState } from 'react';
import { SortTree, TreeNode } from '../components';

const x = 4;
const y = 3;
const z = 2;
const defaultData: TreeNode[] = [];

const generateData = (
  _level: number,
  _preKey?: React.Key,
  _tns?: TreeNode[],
) => {
  const preKey = _preKey || '0';
  const tns = _tns || defaultData;

  const children: React.Key[] = [];
  for (let i = 0; i < x; i++) {
    const id = `${preKey}-${i}`;
    tns.push({ title: id, id, parent: preKey, key: id });
    if (i < y) {
      children.push(id);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((id, index) => {
    tns[index].children = [];
    return generateData(level, id, tns[index].children);
  });
};
generateData(z);

const fetchData = (success) => {
  return new Promise((r, j) => {
    setTimeout(() => {
      success ? r(defaultData) : j('error');
    }, 1000);
  });
};
// const sorterFetch = (success) => {
//   return new Promise((r, j) => {
//     setTimeout(() => {
//       success ? r('success') : j('error');
//     }, 1000);
//   });
// };

export default () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData(true)
      .then((r) => setDataSource(r))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <SortTree
        loading={loading}
        treeData={dataSource}
        onDropEnd={async (newData, oldData) => {
          console.log({
            newData,
            oldData,
          });
          // setLoading(true);
          // return sorterFetch(true)
          //   .then((r) => {
          //     setDataSource(newData);
          //   })
          //   .finally(() => {
          //     setLoading(false);
          //   });
        }}
        isRoot={(r) => r.parent === '0'}
        fieldNames={{
          key: 'id',
          // children: onlyRoot ? 'x' : 'children',
          parentId: 'parent',
          // title: 'title',
          sorter: 'sorter',
        }}
        style={{ height: 200, overflow: 'auto' }}
      />
    </div>
  );
};
