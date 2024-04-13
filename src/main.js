
let video;
let movingMouse = false;
let clicked = false;
let rectX, rectY;
let url;
let mainCanva; // the canva with the video --- ideally the selection boxes should be within this canva
let patternGraphics; // the canva wherw we draw the pattern
let videoGraphics;

function setup() {
  mainCanva = createCanvas(1000, 600).parent('canvas');

  document.getElementById('fileInput').addEventListener('change', function (event) {
    var file = event.target.files[0];
    var fileReader = new FileReader();
    fileReader.onload = function () {
      let res = fileReader.result;
      var blob = new Blob([fileReader.result], { type: file.type });
      url = URL.createObjectURL(blob);

      video = createVideo(url).parent('video');
      video.loop();
      video.showControls();
      rect(50, 60, 40, 30);
      video.hide();
    }
    fileReader.readAsArrayBuffer(file);
    draw()
  })
}

function draw() {
  if (!(video == null)) {
    background(0, 0, 0, 0);
    let img = video.get();// Set transparent background
    canvaVideo = image(img, 0, 0); // Draw the video on the canvas

    // show controls
    videoControls();

    if (clicked) {
      stroke('red');
      noFill()
      rect(rectX, rectY, 60, 60);
    }

    if (movingMouse) {
      stroke('yellow');
      noFill();
      rect(mouseX, mouseY, 50, 50)
    }
  }
}

function mousePressed() {
  clicked = true;
  rectX = mouseX;
  rectY = mouseY;
}

function mouseMoved() {
  movingMouse = true;
}

// Event Listener for controls and toggle between play/pause
function videoControls() {
  let controlsSection = document.getElementById("controls-section");
  controlsSection.style.display = 'block';
}

function playVideo() {
  video.play();
  let playBtn = document.getElementById("playVid")
  let pauseBtn = document.getElementById("pauseVid")

  playBtn.style.display = 'none'
  pauseBtn.style.display = 'block';

}

function pauseVideo() {
  video.pause();
  let playBtn = document.getElementById("playVid")
  let pauseBtn = document.getElementById("pauseVid")

  playBtn.style.display = 'block';
  pauseBtn.style.display = 'none';
}
