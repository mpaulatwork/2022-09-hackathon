import React from 'react';
import './App.css';
import { PaulFrame, usePaulFrame } from './PaulFrame';

function App() {
  const {
    onLoad,
    sendSignal,
  } = usePaulFrame();

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
