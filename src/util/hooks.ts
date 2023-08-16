import { useEffect, useMemo, useState } from 'react';

export const useFilter = ({
  initKeyword = '',
  dataSource,
  filterFields = [] as string[],
  rowKey = 'key',
  childrenKey = 'children',
  onlyRoot = false, //是否只显示根节点
  filterRoot = false, //关键字筛选掉根节点
}) => {
  const [keyword, setKeyword] = useState(initKeyword);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const filterData = useMemo(() => {
    const resultMap = {};
    const keysMap = {};
    const word = keyword.trim();
    if (word.length === 0) {
      // setExpandedRowKeys([]);
      return dataSource;
    }
    const findMatch = (tree, rootNode, parentKeysMap) => {
      for (let index = 0; index < tree.length; index++) {
        const node = tree[index];
        const current = rootNode || node;
        for (let j = 0; j < filterFields.length; j++) {
          if (node[filterFields[j]].includes(word)) {
            Object.assign(keysMap, {
              ...parentKeysMap,
              [node[rowKey]]: node[rowKey],
            });
            resultMap[current[rowKey]] = current;
          }
        }
        //不筛选掉根节点
        if (!filterRoot) resultMap[current[rowKey]] = current;
        if (node[childrenKey] && node[childrenKey].length > 0 && !onlyRoot) {
          findMatch(node[childrenKey], current, {
            ...parentKeysMap,
            [node[rowKey]]: node[rowKey],
          });
        }
      }
    };
    findMatch(dataSource, undefined, {});
    const keys = Object.values(keysMap);
    setExpandedRowKeys(keys as React.Key[]);
    setKeyword(keyword);
    return Object.values(resultMap);
  }, [dataSource, keyword, onlyRoot]);

  return {
    keyword,
    setKeyword,
    dataSource: filterData,
    expandedRowKeys,
    setExpandedRowKeys,
  };
};

export const useWidth = (el) => {
  const [width, setWidth] = useState(0);
  const observe = useMemo(() => {
    return new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const contentBoxSize = Array.isArray(entry.contentBoxSize)
            ? entry.contentBoxSize[0]
            : entry.contentBoxSize;
          setWidth(contentBoxSize.inlineSize);
        }
      }
    });
  }, []);
  useEffect(() => {
    console.log(el,'e');
    
    if (el) observe.observe(el);
  }, [el]);
  return width;
};
