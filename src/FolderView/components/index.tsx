import { Button, Tree } from 'antd';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import { useState } from 'react';
const { DirectoryTree } = Tree;

export const FolderView = () => {
  const [folderTree, setFolderTree] = useState([]);
  const [current, setCurrent] = useState('');
  const [loading, setLoading] = useState(false);
  const showFile = async (handle) => {
    const file = await handle.getFile();
    const reader = new FileReader();
    reader.readAsText(file, 'utf-8');
    reader.onload = (e) => {
      setCurrent(e.target?.result as string);
      setTimeout(() => {
        hljs.highlightAll();
      }, 0);
    };
  };
  const openFolder = async () => {
    try {
      // showOpenFilePicker 选择文件
      const w = window as any;
      const handle = await w.showDirectoryPicker();
      setLoading(true);
      const root = await processHandle(handle);
      setFolderTree(root.children);
      setLoading(false);
    } catch (e) {
      console.log(e, 'e');
      setLoading(false);
    }
  };
  const processHandle = async (handle) => {
    if (handle.kind === 'file') {
      handle.isLeaf = true;
      return handle;
    }
    handle.selectable = false;
    const iter = await handle.entries();
    handle.children = [];
    for await (const info of iter) {
      const subHandle = await processHandle(info[1]);
      handle.children.push(subHandle);
    }
    return handle;
  };

  return (
    <div style={{ display: 'flex', border: '1px solid #e4e9ec' }}>
      <div
        style={{
          flex: '0 0 300px',
          overflow: 'auto',
          borderRight: '1px solid #e4e9ec',
          padding: 16
        }}
      >
        {!folderTree.length && (
          <Button loading={loading} onClick={openFolder}>
            打开文件夹
          </Button>
        )}
        <DirectoryTree
          fieldNames={{
            title: 'name',
          }}
          height={300}
          defaultExpandAll
          treeData={folderTree}
          onSelect={(_, { node }) => {
            const target = node as any;
            showFile(target.props.data);
          }}
        />
      </div>

      <div style={{ width: 'calc(100% - 300px)' }}>
        <pre style={{ margin: 0 }}>
          <code
            style={{
              overflow: 'auto',
              height: 300,
            }}
          >
            {current}
          </code>
        </pre>
      </div>
    </div>
  );
};
