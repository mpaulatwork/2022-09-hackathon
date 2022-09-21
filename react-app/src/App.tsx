import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div
        className="content"
      >
        <div className='button'>
          example text
        </div>
        <div className='gap'></div>
        <div className='button'>
          example button
        </div>
      </div>
      <iframe
        className="pauls_iframe"
        src="https://mpaulatwork.github.io/2022-09-hackathon/"
        allow="camera;microphone"
      ></iframe>
    </div>
  );
}

export default App;
