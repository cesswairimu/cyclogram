// DRAG AND DROP

function dragDrop() {

  let frameRate = 30;
  let rowNumber = 0;
  let framesPerDay = 288 / 2; // remove nighttime hours, crudely
  let colNumber = 0;
  let myX = 100; // where you've clicked
  let myY = 400;
  let video;
  let playVideo = false;
  let i = 0;
  let dotSize = 6;
  let steps;
  let density;

  function setup() {
    createCanvas(1000, 400).parent('canvas');

    document.getElementById('input').addEventListener('change', function (event) {
      var file = event.target.files[0];
      var fileReader = new FileReader();
      fileReader.onload = function () {
        var blob = new Blob([fileReader.result], { type: file.type });
        var url = URL.createObjectURL(blob);
        video = createVideo(url).parent('video');

        //video.elt.getVideoPlaybackQuality().totalVideoFrames // only how many frames have loaded so far
        video.elt.controls = true;
        video.elt.load();
        noStroke();
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

}
function draw() {
  if (video) {
    //  video.elt.currentTime = i/frameRate;
    video.loadPixels();
    let color = [
      video.pixels[(myY * video.width * 4 * density) + (myX * 4 * density)], // get red 
      video.pixels[(myY * video.width * 4 * density) + (myX * 4 * density + 1)], // get green
      video.pixels[(myY * video.width * 4 * density) + (myX * 4 * density + 2)] // get blue
    ];

    rect(i % framesPerDay * dotSize, rowNumber * dotSize, dotSize, dotSize);
    fill(color);
    colNumber += 1;
    if (i % framesPerDay == 0) {
      rowNumber += 1; // new row
      colNumber = 0;
    }
    if (i == steps) i = 0;
    else i++;
  }
}


function drawRect() {
  
  
}



// PROTOTYPE
function prototype() {

  function setup() {
    createCanvas(1000, 400).parent('canvas');

    video = createVideo('examples/river.mp4').parent('video');
    //video = createVideo('https://archive.org/download/cyclogram-timelapse-test/9-month-river-timelapse-autumn-winter-sprin.mp4')
    //video.elt.getVideoPlaybackQuality().totalVideoFrames // only how many frames have loaded so far
    video.elt.controls = true;
    video.elt.load();
    noStroke();
    steps = parseInt(frameRate * video.elt.duration) // in seconds
    density = 1;//pixelDensity();

    video.elt.onclick = function click(e) {
      myX = parseInt(e.offsetX / video.elt.clientWidth * video.width);
      myY = parseInt(e.offsetY / video.elt.clientHeight * video.height);
      e.preventDefault();
    }
  }

  function draw() {
    //  video.elt.currentTime = i/frameRate;
    video.loadPixels();
    let color = [
      video.pixels[(myY * video.width * 4 * density) + (myX * 4 * density)], // get red 
      video.pixels[(myY * video.width * 4 * density) + (myX * 4 * density + 1)], // get green
      video.pixels[(myY * video.width * 4 * density) + (myX * 4 * density + 2)] // get blue
    ];

    rect(i % framesPerDay * dotSize, rowNumber * dotSize, dotSize, dotSize);
    fill(color);
    colNumber += 1;
    if (i % framesPerDay == 0) {
      rowNumber += 1; // new row
      colNumber = 0;
    }
    if (i == steps) i = 0;
    else i++;
  }
}