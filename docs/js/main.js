let cameraWidth = 10;
let cameraHeight = 10;
let width = 0;
let height = 0;
function windowResized() {
  height = windowHeight;
  width = windowHeight * (cameraWidth / cameraHeight);
  resizeCanvas(width, height);
}
// ios fix?
setInterval(() => windowResized(), 1000);

const Views = {
  Normal: 'Normal',
  Rainbow: 'Rainbow',
  ASCII: 'ASCII',
}
let view = Views.Normal;
function changeView(newView) {
  view = newView ?? (
   (view === Views.Normal && Views.Rainbow) ||
   (view === Views.Rainbow && Views.ASCII) ||
   (Views.Normal)
  );
  setMessage(`${view} mode`, 3000);
}
changeView(Views.Normal);

let myAsciiArt,
    myCapture,
    gfx,
    ascii_arr;

function initCaptureDevice() {
  try {
    myCapture = createCapture(VIDEO, stream => {
      cameraHeight = myCapture.height;
      cameraWidth = myCapture.width;
      $debug.innerHTML += `
        <div>
          camera ${cameraWidth}x${cameraHeight}
        </div>
      `;
      windowResized();
      setRecorder(stream);
    });
    // for mac
    myCapture.elt.setAttribute('playsinline', '');
    myCapture.hide();

    // setup mirror
    scale(-1, 1);
  } catch(_err) {
    console.log('[initCaptureDevice] capture error: ' + _err);
  }
}

function setup() {
  createCanvas(1600, 200);
  initCaptureDevice();
  windowResized();

  gfx = createGraphics(Math.ceil(width / 8), Math.ceil(height / 8));
  gfx.pixelDensity(1);
  myAsciiArt = new AsciiArt(this);
  myAsciiArt.printWeightTable();
  textAlign(CENTER, CENTER); textFont('monospace', 8); textStyle(NORMAL);
  noStroke();
  fill(255);
  frameRate(30);
}

const rainbow = new RainbowAssistant();
function draw() {
  if (myCapture === null || myCapture === undefined) {
    background(50);
    return;
  }

  // mirror start
  push();
  translate(width, 0);
  scale(-1, 1);

  background(0);

  if (view === Views.Normal) {
    tint('white');
    image(myCapture, 0, 0, width, height);
  }

  if (view === Views.Rainbow) {
    tint(rainbow.getColor());
    image(myCapture, 0, 0, width, height);
  }

  if (view === Views.ASCII) {
    gfx.background(0);
    gfx.tint('white');
    gfx.image(myCapture, 0, 0, gfx.width, gfx.height);
    gfx.filter(POSTERIZE, 5);
    ascii_arr = myAsciiArt.convert(gfx);
    myAsciiArt.typeArray2d(ascii_arr, this);
  }

  // mirror end
  pop();
}

document.body.addEventListener('click', evt => {
  if (evt.target.id === 'debug') {
    // todo
  }
  if (evt.target.nodeName.toLowerCase() === 'canvas') {
    changeView();
  }
});

// iframe
// https://stackoverflow.com/a/536624
window.parent.postMessage('child loaded', '*');
window.addEventListener('message', event => {
  if (event.data === 'record') {
    startRecording();
  }
  if (event.data === 'stop') {
    stopRecording();
  }
  if (event.data === 'reset') {
    deleteRecording();
  }
});
