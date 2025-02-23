let font;
// let noiseScale = 0.005;

let type = "ABCDEFUCKU";
let dots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  inputField = createInput(type); // Default text is set to the initial string
  inputField.position(windowWidth / 2 - 100, windowHeight - 150); // Positioning the input box at the top-left of the canvas
  inputField.size(400, 30); // Set the size of the input box

  // Create dots for initial text
  createTextDots(type);

  // let points = font.textToPoints(type, 100, windowHeight / 2, 90, {
  //   sampleFactor: 0.99,
  // });

  // for (var i = 0; i < points.length; i++) {
  //   let pt = points[i];
  //   let dot = new Dot(pt.x, pt.y);
  //   dots.push(dot);
  // }
}

function draw() {
  background(13);

  for (let i = 0; i < dots.length; i++) {
    let dot = dots[i];
    dot.behavior();
    dot.update();
    dot.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  font = loadFont("AvenirNextLTPro-Demi.otf");
}

function keyPressed() {
  // If the user presses the Enter key, we update the text based on the input field's value
  if (keyCode === ENTER) {
    type = inputField.value(); // Get the current value from the input field
    createTextDots(type); // Regenerate dots with the new text
  }
}

// Function to create dots from text
function createTextDots(newText) {
  dots = []; // Reset the dots array
  let points = font.textToPoints(newText, 100, windowHeight / 2, 80, {
    sampleFactor: 0.99,
  });

  // Create dots based on the points of the new text
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let dot = new Dot(pt.x, pt.y);
    dots.push(dot);
  }
}
