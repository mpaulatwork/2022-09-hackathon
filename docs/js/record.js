// https://codepen.io/naotokui/pen/wxjNox

let isVideoPlaying = false;
let video, recorder;

function videoLoad() {
  video.loop();
  isVideoPlaying = true;
}

function toggleRecording(){
  if (video) {
    video.remove();
    video = undefined;
    setMessage('deleted recording');
  } else if (recorder.state != 'recording'){
    recorder.start();
    setMessage('recording');
  } else {
    // https://stackoverflow.com/a/34259326
    recorder.ondataavailable = e => {
      video = createVideo(URL.createObjectURL(e.data), videoLoad);
      video.id('playback');
    };
    recorder.stop();
    setMessage('recording playback');
  }
}

function setRecorder(stream) {
  recorder = new MediaRecorder(stream, {
    // mimeType: 'video/mp4'
  });
}

$debug.addEventListener('click', () => {
  toggleRecording();
})
