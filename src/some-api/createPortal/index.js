import { createPortal } from 'react-dom';

function App() {
  return (
    <div style={{ border: '2px solid black' }}>
      <p>这个子节点被放置在父节点 div 中。</p>
      {createPortal(
        <p>这个子节点被放置在 document body 中。</p>,
        document.body,
        "qwerasdf"
      )}
    </div>
  );
}

export default App;