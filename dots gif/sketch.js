let numFrames = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  let t = (1 * (frameCount - 1)) / numFrames;

  let r = 100;
  let x = width / 2 + r * cos(TWO_PI * t);
  let y = height / 2 + r * sin(TWO_PI * t);

  stroke(0);
  strokeWeight(9.0); // size of black dot

  point(x, y);

  // if (frameCount <= numFrames) {
  //   saveFrames("fr", "png", 1, 1, function () {
  //     if (frameCount === numFrames) {
  //       console.log("All frames have been saved");
  //     }
  //   });
  // }
}
