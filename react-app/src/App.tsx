import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

interface PaulFrame {
  sendSignal(msg: string): void;
}

function App() {
  const [iframeNode, setIframeNode] = useState<HTMLIFrameElement>();
  // const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    window.addEventListener('message', event => {
      console.log('parent received', event);
    });
  }, []);

  // (window as any).sendConfirm = () => {
  //   doneCallback();
  // };
  const sendSignal = useCallback(() => {
    if (!iframeNode) { return; }
    iframeNode.contentWindow?.postMessage('record', '*');
  }, [iframeNode]);

  const onRefChange = useCallback((node: HTMLIFrameElement) => {
    console.log(node);
    setIframeNode(node);
  }, []);

  return (
    <div className="App">
      <div className="content">
        <div className='button'>
          example text
        </div>
        <div className='gap'>
          {/* creates whitespace within flexbox */}
        </div>
        <div className='button' onClick={sendSignal}>
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
