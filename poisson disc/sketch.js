// By Roni Kaufman
// https://ronikaufman.github.io/

// Poisson disk sampling adapted from Daniel Shiffman: https://youtu.be/flQgnCUxHlw

// color palette from Color Pals (https://ronikaufman.github.io/color_pals/)
let colors = ["#2c2060", "#4bd3e5", "#ffd919", "#ff4f19"];

let r;
let k = 30;
let grid = [];
let w;
let active = [];
let nCols, nRows;

function setup() {
  createCanvas(500, 500);
  background("#fff1dd");
  r = random(3, 10);
  strokeWeight(r * 0.4);
  strokeCap(ROUND);
  w = r / sqrt(2);

  nCols = floor(width / w);
  nRows = floor(height / w);
  for (let i = 0; i < nRows; i++) {
    let newRow = [];
    for (let j = 0; j < nCols; j++) {
      newRow.push(undefined);
    }
    grid.push(newRow);
  }

  //let startingPoints = [createVector(width/2-margin, height/2-margin)];
  let nColors = colors.length;
  for (let n = 0; n < nColors; n++) {
    let p = createVector(random(width), random(height));
    let j = floor(p.x / w);
    let i = floor(p.y / w);
    let pos = createVector(p.x, p.y);
    grid[i][j] = pos;
    active.push({
      pos: pos,
      color: colors[n],
    });
  }

  //point(x, y);
  //frameRate(1);
}

function draw() {
  for (var total = 0; total < 25; total++) {
    if (active.length > 0) {
      let randIndex = floor(random(active.length));
      let pos = active[randIndex].pos;
      let color = active[randIndex].color;
      let found = false;
      for (var n = 0; n < k; n++) {
        let sample = p5.Vector.random2D();
        let m = random(r, 2 * r);
        sample.setMag(m);
        sample.add(pos);

        let col = floor(sample.x / w);
        let row = floor(sample.y / w);

        if (
          col > -1 &&
          row > -1 &&
          col < nCols &&
          row < nRows &&
          !grid[col + row * nCols]
        ) {
          var ok = true;
          for (var i = max(row - 1, 0); i <= min(row + 1, nRows - 1); i++) {
            for (var j = max(col - 1, 0); j <= min(col + 1, nRows - 1); j++) {
              let neighbor = grid[i][j];
              if (neighbor) {
                let d = p5.Vector.dist(sample, neighbor);
                if (d < r) {
                  ok = false;
                }
              }
            }
          }
          if (ok) {
            found = true;
            grid[row][col] = sample;
            active.push({
              pos: sample,
              color: color,
            });
            //point(sample.x+margin, sample.y+margin);
            stroke(color);
            line(sample.x, sample.y, pos.x, pos.y);
            break;
          }
        }
      }

      if (!found) {
        active.splice(randIndex, 1);
      }
    }
  }
}
