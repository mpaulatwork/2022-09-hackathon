import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import './App.css';

type Signal = 'record' | 'playback' | 'stop';
type SendSignal = (signal: Signal) => void;

export const usePaulFrame = (props?: {
  receiveMessage?: (msg: string) => void;
}) => {
  const [iframeNode, setIframeNode] = useState<HTMLIFrameElement>();
  const onLoad = useCallback((node: HTMLIFrameElement) => {
    setIframeNode(node);
  }, []);

  useEffect(() => {
    window.addEventListener('message', event => {
      console.log('parent received', event);
      if (props?.receiveMessage) {
        props.receiveMessage(event.data);
      }
    });
  }, []);

  const sendSignal = useCallback<SendSignal>((signal: Signal) => {
    if (!iframeNode) { return; }
    iframeNode.contentWindow?.postMessage(signal, '*');
  }, [iframeNode]);

  return {
    onLoad,
    sendSignal,
  }
}

export const PaulFrame = (props: {
  onLoad: (node: HTMLIFrameElement) => void;
}) => {
  const styles: CSSProperties = {
    position: 'absolute',
    zIndex: '-1',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
  };
  return (
    <iframe
      style={styles}
      ref={props.onLoad}
      src="https://mpaulatwork.github.io/2022-09-hackathon/"
      // src="http://localhost:8000"
      allow="camera;microphone"
    ></iframe>
  );
}
