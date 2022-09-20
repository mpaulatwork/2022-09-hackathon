console.log('hello');

let width = 0;
let height = 0;
function windowResized() {
  width = windowWidth;
  height = windowHeight;
  resizeCanvas(width, height);
}

const Views = {
  Normal: 'normal',
  ASCII: 'ascii',
}
let view = Views.Normal;
function changeView() {
  view = (
   (view === Views.Normal && Views.ASCII) ||
   (Views.Normal)
  );
}

let myAsciiArt,
    myCapture,
    gfx,
    ascii_arr;

function initCaptureDevice() {
  try {
    myCapture = createCapture(VIDEO);
    myCapture.size(320, 240);
    myCapture.elt.setAttribute('playsinline', '');
    scale(-1, 1);
    myCapture.hide();

    console.log(
      '[initCaptureDevice] capture ready. Resolution: ' +
      myCapture.width + ' ' + myCapture.height
    );
  } catch(_err) {
    console.log('[initCaptureDevice] capture error: ' + _err);
  }
}

function setup() {
  createCanvas(1600, 200);
  windowResized();

  initCaptureDevice();

  gfx = createGraphics(Math.ceil(width / 8), Math.ceil(height / 8));
  gfx.pixelDensity(1);
  myAsciiArt = new AsciiArt(this);
  myAsciiArt.printWeightTable();
  textAlign(CENTER, CENTER); textFont('monospace', 8); textStyle(NORMAL);
  noStroke();
  fill(255);
  frameRate(30);
}

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
    image(myCapture, 0, 0, width, height);
  }

  if (view === Views.ASCII) {
    gfx.background(0);
    gfx.image(myCapture, 0, 0, gfx.width, gfx.height);
    gfx.filter(POSTERIZE, 5);
    ascii_arr = myAsciiArt.convert(gfx);
    myAsciiArt.typeArray2d(ascii_arr, this);
  }

  // mirror end
  pop();
}

function mouseReleased() {
  changeView();
}
