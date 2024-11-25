//"Hommage à Dürer" Vera Molnar #WCCChallenge
//2023-11-04 @senbaku

let cols = 2;
let rows = 2;
let mrg = 0.75;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#eff1f3");
  tile();

  // pg = createGraphics(width, height);
  // pg.noStroke();
  // for (let i = 0; i < 300000; i++) {
  //   let x = random(width);
  //   let y = random(height);
  //   let n = noise(x * 0.01, y * 0.01) * width * 0.003;
  //   pg.fill(255, 30);
  //   pg.rect(x, y, n, n);
  // }
  // image(pg, 0, 0);
}
function tile() {
  let count = 5;
  let w = width / count;
  let h = height / count;

  for (var i = 0; i < count; i++) {
    for (var j = 0; j < count; j++) {
      let x = i * w;
      let y = j * h;
      lines(x, y, w * mrg, h * mrg);
    }
  }
}

function lines(x, y, w, h) {
  push();
  blendMode(MULTIPLY);
  translate(x, y);
  let lw = abs(w / cols);
  let lh = abs(h / rows);
  strokeWeight(1);
  let col = color("#fc913a");
  stroke(col);
  let points = [];
  for (let i = 0; i < cols + 1; i++) {
    for (let j = 0; j < rows + 1; j++) {
      let nx = i * lw;
      let ny = j * lh;
      points.push(createVector(nx, ny));
    }
  }

  points.forEach((point, index) => {
    let otherIndex = index;
    while (otherIndex === index) {
      otherIndex = int(random(points.length));
    }

    let otherPoint = points[otherIndex];
    line(point.x, point.y, otherPoint.x, otherPoint.y);
  });

  pop();
}
