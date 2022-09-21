import React, { useCallback, useState } from 'react';
import './App.css';
import { PaulFrame, usePaulFrame } from './PaulFrame';
import { RecordButton } from './RecordButton';

function App() {
  const {
    onLoad,
    sendSignal,
  } = usePaulFrame();

  const [isRecording, setIsRecording] = useState(false);
  const onClick = useCallback(() => {
    if (isRecording) {
      sendSignal('stop');
    } else {
      sendSignal('record');
    }
    setIsRecording(!isRecording);
  }, [isRecording, sendSignal])

  return (
    <div className="App">
      <div className="content">
        <div className='button'>
          example text
        </div>
        <div>

        </div>
        <div className='gap'>
          {/* creates whitespace within flexbox */}
        </div>
        <RecordButton
          isRecording={isRecording}
          onClick={onClick}
        />
        <div className='buttonRow'>
          <div className='button' onClick={() => sendSignal('record')}>
            record
          </div>
          <div className='button' onClick={() => sendSignal('stop')}>
            stop
          </div>
          <div className='button' onClick={() => sendSignal('reset')}>
            reset
          </div>
        </div>
      </div>
      <PaulFrame onLoad={onLoad} />
    </div>
  );
}

export default App;
