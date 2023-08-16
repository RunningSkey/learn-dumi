import { Button, Switch, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getColor } from '../../util';
const text =
  '在一行隐藏时，子盒子需要使用绝对定位，父盒子flex1的宽度才不会被自动撑开';
export default () => {
  const [position, setPostion] = useState(true);
  const [rows, setRows] = useState(1);
  return (
    <>
      <Switch
        checked={position}
        onChange={setPostion}
        checkedChildren="绝对定位"
        unCheckedChildren="非绝对定位"
      />
      <Button onClick={() => setRows(rows + 1)}>+</Button>
      <Button onClick={() => setRows(rows - 1)}>-</Button>
      ellipsis-rows：{rows}
      {new Array(10).fill({}).map((_, number) => (
        <div style={{ display: 'flex' }} key={number}>
          {new Array(number + 1).fill({}).map((_, index) => (
            <div style={{ flex: 1 }} key={index}>
              <div
                style={{
                  background: getColor(),
                  margin: 4,
                  height: 50,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: position ? 'absolute' : 'relative',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Typography.Paragraph
                    ellipsis={{ rows: rows, tooltip: text }}
                  >
                    {index + 1} {':'}
                    {text}
                  </Typography.Paragraph>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
