//-------> all code by Aaron Reuland (give credit, forkers)

let carpet;
let colors = ["#c43416", "#294578", "#842632", "#41658a", "#6f8d67", "#e0c387"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  //setting dimensions of rug & border depending on aspect ratio of screen
  if (height < width) {
    carpet = createGraphics(
      windowHeight * 1.5 - windowHeight / 10,
      windowHeight - windowHeight / 10
    );
    fill("#842632");
    rectMode(CENTER);
    rect(width / 2, height / 2, windowHeight * 1.5, windowHeight);
  } else {
    carpet = createGraphics(
      windowWidth - windowWidth / 10,
      windowWidth * 1.5 - windowWidth / 10
    );
    fill("#842632");
    rectMode(CENTER);
    rect(width / 2, height / 2, windowWidth, windowWidth * 1.5);
  }

  //drawing recursive pattern function to buffer and showing
  let w = max(carpet.height, carpet.width);
  carpet.background("#c43416");
  design(carpet.width / 2, carpet.height / 2, w / 1.6);
  imageMode(CENTER);
  image(carpet, width / 2, height / 2);

  //adding some texture
  push();
  translate(width / 2, height / 2);
  for (let i = 0; i < 10000; i++) {
    stroke(0, 2);
    strokeWeight(random(0.2, 5));
    let randomY = random(-carpet.height / 1.8, carpet.height / 1.8);
    line(
      random(-carpet.width / 1.8, carpet.width / 1.8),
      randomY,
      random(-carpet.width / 1.8, carpet.width / 1.8),
      randomY
    );

    let randomX = random(-carpet.width / 1.8, carpet.width / 1.8);
    line(
      randomX,
      random(-carpet.height / 1.8, carpet.height / 1.8),
      randomX,
      random(-carpet.height / 1.8, carpet.height / 1.8)
    );
  }
  pop();
}

function design(x, y, size) {
  carpet.noStroke();
  carpet.fill(random(colors));
  carpet.ellipse(x, y, size);
  carpet.fill(random(colors));
  carpet.ellipse(x, y, size * 0.7);
  carpet.fill(random(colors));

  for (let i = 0; i < TAU; i += TAU / 16) {
    carpet.push();
    carpet.translate(x, y);
    carpet.rotate(i);
    carpet.ellipse(0, 0, size * 0.9, size / 4);
    if (size > 10) {
      design(size * 0.8, 0, size / 6);
    }
    carpet.pop();
  }
  carpet.fill(random(colors));
  carpet.ellipse(x, y, size / 3);

  if (size > 5) {
    design(x, y, size * 0.75);
  }
}
