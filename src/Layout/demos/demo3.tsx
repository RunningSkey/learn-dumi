import { Button, Typography } from 'antd';
import { useRef } from 'react';
import { getColor } from '../../util';
import { useWidth } from '../../util/hooks';
export default () => {
  const text = `要实现隐藏 不能使用flex-basis设置宽度 否则他会自动撑开盒子 要实现隐藏不能使用flex-width 否则他会自动撑开盒子`;
  const center = 80;
  const left = `calc(50% - (${center / 2}px)`;
  const right = left;
  const leftRef = useRef<HTMLDivElement>(null);
  const leftWidth = useWidth(leftRef.current);
  const rightRef = useRef<HTMLDivElement>(null);
  const rightWidth = useWidth(rightRef.current);
  return (
    <>
      <div style={{ display: 'flex', height: 200 }}>
        <div style={{ background: getColor(), width: left }} ref={leftRef}>
          left: {leftWidth}px
          <Typography.Paragraph ellipsis={{ rows: 1, tooltip: text }}>
            {text}
          </Typography.Paragraph>
        </div>
        <div
          style={{
            background: getColor(),
            width: center,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button>center</Button>
        </div>
        <div style={{ background: getColor(), width: right }} ref={rightRef}>
          right: {rightWidth}px
          <Typography.Paragraph ellipsis={{ rows: 1, tooltip: text }}>
            {text}
          </Typography.Paragraph>
        </div>
      </div>
    </>
  );
};
