function setup() {
  createCanvas(500, 500);
  noLoop();
}

function draw() {
  background(255);

  // Constants
  let gridSize = 5;
  let gridSpacing = width / gridSize;
  let minSquares = 5;
  let maxSquares = 8;

  // Nested loops to create the grid
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Calculate the grid point coordinates
      let gridX = i * gridSpacing + gridSpacing / 2;
      let gridY = j * gridSpacing + gridSpacing / 2;

      // Draw random squares at each grid point
      drawRandomSquares(gridX, gridY, minSquares, maxSquares);
    }
  }
}

function drawRandomSquares(x, y, minSquares, maxSquares) {
  let numSquares = floor(random(minSquares, maxSquares + 1));

  for (let i = 0; i < numSquares; i++) {
    // Generate random square size
    let squareSize = random(10, 40);

    // Generate random stroke color
    let strokeColor = color(random(255), random(255), random(255));

    // Draw the square with no fill
    stroke(strokeColor);
    noFill();
    rectMode(CENTER);
    rect(x, y, squareSize, squareSize);
  }
}
