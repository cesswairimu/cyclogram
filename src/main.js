
let video;
let movingMouse = false;
let clicked = false;
let rectX, rectY;
let url;
let mainCanva; // the canva with the video --- ideally the selection boxes should be within this canva
let patternGraphics; // the canva wherw we draw the pattern
let videoGraphics;
let rectSize = 50;

// frame vars
let frameRate = 30;
let rowNumber = 0;
let colNumber = 0;
let steps;
let density;
let myX = 100;
let myY = 400;
let i = 0;
let framesPerDay = 288 / 2;
let dotSize = 6;
let videoPlaying = true;
let playBtn = document.getElementById("playVid")
let pauseBtn = document.getElementById("pauseVid")

function setup() {
  mainCanva = createCanvas(800, 1000).parent('canvas');

  document.getElementById('fileInput').addEventListener('change', function (event) {
    var file = event.target.files[0];
    var fileReader = new FileReader();
    fileReader.onload = function () {
      var blob = new Blob([fileReader.result], { type: file.type });
      url = URL.createObjectURL(blob);

      video = createVideo(url).parent('video');
      video.loop();
      video.showControls();
      rect(50, 60, 40, 30);
      video.hide();

      videoGraphics = createGraphics(800, 500); // space for video display
      controlsGraphics = createGraphics(800, 80); // space for video display
      patternGraphics = createGraphics(800, 300); // space for the graph

      // setup for graph 
      steps = parseInt(frameRate * video.elt.duration) // in seconds
      density = 1;//pixelDensity();

      video.elt.onclick = function click(e) {
        myX = parseInt(e.offsetX / video.elt.clientWidth * video.width);
        myY = parseInt(e.offsetY / video.elt.clientHeight * video.height);
        e.preventDefault();
      }

    }
    fileReader.readAsArrayBuffer(file);
  })
}

function draw() {
  if (!(video == null)) {
    // background(0, 0, 0, 0);
    // let img = video.get();// Set transparent background
    // canvaVideo = image(img, 0, 0); // Draw the video on the canvas
    video.noLoop();
    videoGraphics.image(video, 0, 0);
    video.loadPixels();
    drawPattern(myX, myY);
    video.onended(handleEnd)

    // control graphics
    controlsGraphics.background('cyan');
    controlsGraphics.fill(0, 0, 0);
    controlsGraphics.textSize(22);
    controlsGraphics.text("The video controls will go on this space!", 50, 50);

    // draw both graphics
    image(videoGraphics, 0, 0);
    image(controlsGraphics, 0, 530)
    image(patternGraphics, 0, 660)


    // show controls
    videoControls();

    if (isOverVideo()) {
      if (clicked) {
        stroke('red');
        noFill()
        rect(rectX, rectY, rectSize, rectSize);
      }

      if (movingMouse) {
        stroke('yellow');
        noFill();
        rect(mouseX, mouseY, rectSize, rectSize)
      }
    }
  }
}

function handleEnd() {
  console.log("The video has ended---")
  videoPlaying = false;
}

function drawPattern(x, y) {
  let color = [
    video.pixels[(y * video.width * 4 * density) + (x * 4 * density)], // get red 
    video.pixels[(y * video.width * 4 * density) + (x * 4 * density + 1)], // get green
    video.pixels[(y * video.width * 4 * density) + (x * 4 * density + 2)] // get blue
  ];

  patternGraphics.noStroke();
  if (videoPlaying) {
    patternGraphics.rect(i % framesPerDay * dotSize, rowNumber * dotSize, dotSize, dotSize);
    patternGraphics.fill(color);
    colNumber += 1;
    if (i % framesPerDay == 0) {
      rowNumber += 1; // new row
      colNumber = 0;
    }
    if (i == steps) i = 0;
    else i++;
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

function isOverVideo() {
  overVideo = mouseX >= 0 && mouseX < videoGraphics.width - rectSize && mouseY >= 0 && mouseY < videoGraphics.height - rectSize;
  if (overVideo) {
    return true
  } else {
    return false
  }

}


// Event Listener for controls and toggle between play/pause
function videoControls() {
  let controlsSection = document.getElementById("controls-section");
  controlsSection.style.display = 'block';
}



function playVideo() {
  let playBtn = document.getElementById("playVid")
  let pauseBtn = document.getElementById("pauseVid")

  video.play();
  videoPlaying = true;
  playBtn.style.display = 'none'
  pauseBtn.style.display = 'block';
}

function pauseVideo() {
  let playBtn = document.getElementById("playVid")
  let pauseBtn = document.getElementById("pauseVid")

  video.pause();
  videoPlaying = false;
  playBtn.style.display = 'block';
  pauseBtn.style.display = 'none';
}
