import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [iframeNode, setIframeNode] = useState<HTMLIFrameElement>();
  const onRefChange = useCallback((node: HTMLIFrameElement) => {
    setIframeNode(node);
  }, []);

  useEffect(() => {
    window.addEventListener('message', event => {
      // todo handle messages from iframe
      console.log('parent received', event);
    });
  }, []);

  const sendSignal = useCallback((msg: string) => {
    if (!iframeNode) { return; }
    iframeNode.contentWindow?.postMessage(msg, '*');
  }, [iframeNode]);

  return (
    <div className="App">
      <div className="content">
        <div className='button'>
          example text
        </div>
        <div className='gap'>
          {/* creates whitespace within flexbox */}
        </div>
        <div className='button' onClick={() => sendSignal('record')}>
          example button
        </div>
      </div>
      <iframe
        className="pauls_iframe"
        ref={onRefChange}
        // src="https://mpaulatwork.github.io/2022-09-hackathon/"
        src="http://localhost:8000"
        allow="camera;microphone"
      ></iframe>
    </div>
  );
}

export default App;
