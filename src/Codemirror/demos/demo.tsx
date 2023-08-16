import CodeMirror from '@uiw/react-codemirror';
import { EXAMPLE } from '../components';
import './style.less';
// const reg = /#"(.*?)".\["(.*?)"\]/g;

export default () => {
  const value = `#"cc"
.["dd"]
#"aa".["bb"]
3
string
(2)
(string)
`;
  return (
    <CodeMirror
      value={value}
      height="200px"
      extensions={[
        EXAMPLE([
          {
            label: '#defun',
            type: 'keyword', //左侧样式 - 自带icon
            detail: 'detail', //斜杠显示
            info: 'info', //右侧提示文字
            apply: '#"defun"', //回填文字
          },
          {
            label: '@let',
            type: 'blue', //自定义 icon
          },
          { label: '.cons', type: 'green', apply: '.["cons"]' },
        ]),
      ]}
    />
  );
};
