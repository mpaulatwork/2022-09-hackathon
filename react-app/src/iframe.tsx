import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

export const usePaulFrame = () => {
  const [iframeNode, setIframeNode] = useState<HTMLIFrameElement>();
  const onLoad = useCallback((node: HTMLIFrameElement) => {
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

  return {
    onLoad,
    sendSignal,
  }
}

export const PaulFrame = (props: {
  onLoad: (node: HTMLIFrameElement) => void;
}) => {
  return (
    <iframe
      className="pauls_iframe"
      ref={props.onLoad}
      // src="https://mpaulatwork.github.io/2022-09-hackathon/"
      src="http://localhost:8000"
      allow="camera;microphone"
    ></iframe>
  );
}
