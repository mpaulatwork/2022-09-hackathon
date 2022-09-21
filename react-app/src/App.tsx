import React from 'react';
import './App.css';
import { PaulFrame, usePaulFrame } from './iframe';

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
        <div className='gap'>
          {/* creates whitespace within flexbox */}
        </div>
        <div className='button' onClick={() => sendSignal('record')}>
          example button
        </div>
      </div>
      <PaulFrame onLoad={onLoad} />
    </div>
  );
}

export default App;
