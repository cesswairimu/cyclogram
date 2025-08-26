function createCyclogramCanvas(p5Instance, canvasOptions) {
    const { width, height, element } = canvasOptions;
    const canvas = p5Instance.createCanvas(width, height);
    canvas.parent(element);
    p5Instance.createGraphics(800, 500);
    p5Instance.createGraphics(800, 300);
    console.log(canvas)
    return canvas;
}

function drawCyclogram(p5Instance, drawOptions) {
    const { video, frameRate, steps, density, myX, myY, framesPerDay, dotSize } = drawOptions;
    let { i, rowNumber, colNumber } = drawOptions;

    // video.elt.currentTime = i/frameRate;
    video.loadPixels();
    let color = [
        video.pixels[(myY * video.width * 4 * density) + (myX * 4 * density)], // get red 
        video.pixels[(myY * video.width * 4 * density) + (myX * 4 * density + 1)], // get green
        video.pixels[(myY * video.width * 4 * density) + (myX * 4 * density + 2)] // get blue
    ];

    p5Instance.rect(i % framesPerDay * dotSize, rowNumber * dotSize, dotSize, dotSize);
    // console.log("color", color)
    p5Instance.fill(color);
    colNumber += 1;
    if (i % framesPerDay == 0) {
        rowNumber += 1; // new row
        colNumber = 0;
    }
    if (i == steps) i = 0;
    else i++;

    return { i, rowNumber, colNumber };
}

export {
    createCyclogramCanvas,
    drawCyclogram,
}
