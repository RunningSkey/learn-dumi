---
nav: 代码
---

## 深度优先和广度优先

```jsx | pure
const tree = [
  {
    id: '1',
    children: [
      {
        id: '1-1',
        children: [
          {
            id: '1-1-1',
          },
        ],
      },
    ],
    children: [
      {
        id: '1-2',
        children: [
          {
            id: '1-2-1',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    children: [
      {
        id: '2-1',
        children: [
          {
            id: '2-1-1',
          },
        ],
      },
    ],
    children: [
      {
        id: '2-2',
        children: [
          {
            id: '2-2-1',
          },
        ],
      },
    ],
  },
];

const dfs = (tree, result = []) => {
  let index = 0;
  const list = [];
  while (index < tree.length) {
    result.push(tree[index].id);
    if (tree[index].children) dfs(tree[index].children, result);
    index++;
  }
  return result;
};

console.log(dfs(tree), 'dfs');

const bfs = (tree, result = []) => {
  let index = 0;
  const list = [];
  while (index < tree.length) {
    result.push(tree[index].id);
    if (tree[index].children) list.push(tree[index].children);
    index++;
  }
  list.forEach((item) => {
    bfs(item, result);
  });
  return result;
};

console.log(bfs(tree), 'bfs');
```

## 说出打印结果

```jsx | pure
async function async1() {
  console.log('async1 start', 2);
  await async2();
  console.log('async1 end', 6);
}
async function async2() {
  console.log('async2', 3);
}
console.log('script start', 1);
setTimeout(function () {
  console.log('setTimeout', 8);
}, 0);
async1(); //关键这里 没有使用await 那么他不会被阻碍执行
new Promise(function (resolve) {
  console.log('promise1', 4);
  resolve();
}).then(function () {
  console.log('promise2', 7);
});
console.log('script end', 5);
```

## 实现数组扁平化去并除其中重复部分数据

```jsx | pure
// 已知如下数组：
// var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
// 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
const arr = [
  [1, 7, 2],
  [3, 4, 8, 5],
  [6, 7, 18, 9, [11, 12, [22, 13, [74]]]],
  10,
];
const fn = (arr) => {
  return arr.reduce((result, next) => {
    return result.concat(Array.isArray(next) ? fn(next) : next);
  }, []);
};
console.log(
  fn(arr).sort((a, b) => a - b),
  '111',
);
```

```jsx | pure
//将全部0移动到最后，并尽量保持其他数字的顺序，在原数组上修改
//[2, 0, 1, 4, 0, 0, 0, 5, 7, 8] => [2, 1, 4, 5, 7, 8, 0, 0, 0, 0]
const a = [2, 0, 1, 4, 0, 0, 0, 5, 7, 8];

let index = 0;
let endIndex = a.length;

while (index < endIndex) {
  if (a[index] === 0) {
    a.push(0);
    a.splice(index, 1);
    endIndex--;
  } else {
    index++;
  }
}
console.log(a, 'a');
```
