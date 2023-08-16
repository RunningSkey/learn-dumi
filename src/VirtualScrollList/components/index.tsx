import { useEffect, useState } from 'react';
export const VirtualScrollList = ({ data, itemHeight, containerHeight }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const container = document.getElementById('scroll-container');

    const handleScroll = () => {
      const scrollTop = container!.scrollTop;
      const newStartIndex = Math.floor(scrollTop / itemHeight);
      setStartIndex(newStartIndex);
    };

    container!.addEventListener('scroll', handleScroll);
    return () => {
      container!.removeEventListener('scroll', handleScroll);
    };
  }, [itemHeight]);

  useEffect(() => {
    const newVisibleItems = data.slice(
      startIndex,
      startIndex + Math.ceil(containerHeight / itemHeight),
    );
    setVisibleItems(newVisibleItems);
  }, [data, startIndex, containerHeight, itemHeight]);

  return (
    <div
      id="scroll-container"
      style={{ height: `${containerHeight}px`, overflow: 'auto' }}
    >
      <div
        style={{
          height: `${data.length * itemHeight}px`,
          position: 'relative',
        }}
      >
        {visibleItems.map((item, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: `${(startIndex + index) * itemHeight}px`,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
