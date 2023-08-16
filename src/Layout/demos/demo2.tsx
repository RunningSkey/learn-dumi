import { Button } from 'antd';
import { useState } from 'react';
import { getColor } from '../../util';
export default () => {
  const [height, setHeight] = useState(200);
  return (
    <div>
      <Button onClick={() => setHeight(height + 20)}>+</Button>
      <Button onClick={() => setHeight(height - 20)}>-</Button> <span>整体高度：{height}px</span>
      <div style={{ display: 'flex', flexDirection: 'column', height: height }}>
        <div style={{ background: getColor() }}>header</div>
        <div style={{ background: getColor(), flex: 1, overflow: 'auto' }}>
          start
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          end
        </div>
        <div style={{ background: getColor() }}>footer</div>
      </div>
    </div>
  );
};
