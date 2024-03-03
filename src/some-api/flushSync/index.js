import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

export default function PrintApp() {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    function handleBeforePrint() {
      flushSync(() => {
        setIsPrinting(true);
        console.log('flushSync1', isPrinting); // false
      });
      console.log('flushSync2', isPrinting); // false
      // 改变状态并渲染dom
    }

    function handleAfterPrint() {
      setIsPrinting(false);
    }

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    }
  }, []);

  return (
    <>
      <h1>是否打印：{isPrinting ? '是' : '否'}</h1>
      <button onClick={() => window.print()}>
        打印
      </button>
    </>
  );
}
