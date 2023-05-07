import React, { useState, useEffect, useCallback } from 'react';

// 自定义hook监听window大小
function useWindowSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const onWindowResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    }
  }, [])

  return size;
}

export default function Example(){
  const size = useWindowSize();
  return <div>页面size: {size.width}x{size.height}</div>
}