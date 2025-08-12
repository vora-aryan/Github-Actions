import React, { useRef, useState, useEffect, useCallback } from "react";

const itemHeight = 30; // px
const containerHeight = 300; // visible viewport height
const totalItems = 10000;

const items = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);

const VirtualList = () => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  // Calculate visible range
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight),
    totalItems
  );

  useEffect(() => {
    console.log("scrollTop", scrollTop);
  }, [scrollTop]);

  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = useCallback(() => {
    setScrollTop(() => containerRef.current.scrollTop);
  }, []);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: containerHeight,
        overflowY: "auto",
        border: "1px solid gray",
        position: "relative",
      }}
    >
      <div style={{ height: totalItems * itemHeight, position: "relative" }}>
        <div
          style={{
            transform: `translateY(${startIndex * itemHeight}px)`,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            background: "lightgray",
          }}
        >
          {visibleItems.map((item, idx) => (
            <div
              key={startIndex + idx}
              style={{
                height: itemHeight,
                borderBottom: "1px solid #eee",
                padding: "0 8px",
                boxSizing: "border-box",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
