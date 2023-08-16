import { DataNode } from 'antd/es/tree';
export const diffNodesSameLevel = (
  oldNodes: DataNode[],
  newNodes: DataNode[],
  changeKey: string,
  matchKey: string = 'key',
) => {
  const re: DataNode[] = [];
  oldNodes.forEach((oldNode) => {
    const matchNewNode = newNodes.find(
      (newNode) => newNode[matchKey] === oldNode[matchKey],
    );
    if (!matchNewNode) {
      re.push(oldNode);
    } else {
      if (oldNode[changeKey] !== matchNewNode[changeKey]) re.push(matchNewNode);
    }
  });

  return re;
};

export const findNode = (
  key: string,
  keyString: string,
  list: DataNode[],
  childrenString = 'children',
) => {
  for (let index = 0; index < list.length; index++) {
    const node = list[index];
    if (node[keyString] === key) return node;
    if (node[childrenString]) {
      const res = findNode(
        key,
        keyString,
        node[childrenString],
        childrenString,
      );
      if (res) return res;
    }
  }
};

export const animation = (
  duration: number,
  from: number,
  to: number,
  onProgress: (current: number) => void,
) => {
  const dis = to - from;
  const speed = dis / duration; //速度
  const startTime = Date.now();
  let value = from; //当前的状态值
  onProgress(value);
  function _run() {
    const now = Date.now();
    const time = now - startTime; //持续时间
    console.log(time);

    if (time >= duration) {
      value = to;
      onProgress(value);
      return;
    }
    const d = time * speed; //单位时间更新的时间
    value = from + d;
    onProgress(value);
    requestAnimationFrame(_run);
  }
  requestAnimationFrame(_run);
};

export const renderTitle = (title, keyword) => {
  const searchValue = keyword.trim();
  const strTitle = title;
  const index = strTitle.indexOf(searchValue);
  const beforeStr = strTitle.substring(0, index);
  const afterStr = strTitle.slice(index + searchValue.length);
  const re =
    index > -1 ? (
      <span>
        {beforeStr}
        <span style={{ color: '#f09' }}>{searchValue}</span>
        {afterStr}
      </span>
    ) : (
      <span>{strTitle}</span>
    );
  return re;
};

export const getColor = (index = 0) => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return [
    `rgb(${r},${g},${b})`,
    `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
  ][index]
};
