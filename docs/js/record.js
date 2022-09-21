// https://codepen.io/naotokui/pen/wxjNox

const $recordLight = document.getElementById('recordlight');
$recordLight.classList.add('hide');

let isVideoPlaying = false;
let video, recorder;

function videoLoad() {
  video.loop();
  isVideoPlaying = true;
}

async function startRecording() {
  deleteRecording();
  $recordLight.classList.remove('hide');
  recorder.start();
}
async function stopRecording() {
  $recordLight.classList.add('hide');
  if (video) {
    video.remove();
    video = undefined;
  }
  return new Promise(resolve => {
    // https://stackoverflow.com/a/34259326
    if (recorder.state === 'recording') {
      recorder.ondataavailable = e => {
        video = createVideo(URL.createObjectURL(e.data), videoLoad);
        video.id('playback');
        recorder.ondataavailable = () => {};
        resolve();
      };
      recorder.stop();
    } else {
      resolve();
    }
  });
}
async function deleteRecording() {
  $recordLight.classList.add('hide');
  if (recorder.state === 'recording') {
    recorder.stop();
  }
  if (video) {
    video.remove();
    video = undefined;
  }
}

function toggleRecording(){
  if (video) {
    deleteRecording();
    setMessage('deleted recording', 3000);
  } else if (recorder.state != 'recording'){
    startRecording();
    setMessage('recording');
  } else {
    stopRecording();
    setMessage('playback', 3000);
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
