

let pos;


let walks = [];


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {

  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.id('sketch-container');


  background(255);


}

function draw() {

  for (let walk of walks) {
    walk.step();
    walk.display();
  }


}



function mousePressed() {
  // let r = random(10, 50);
  let w = new Walker(mouseX, mouseY);
  walks.push(w);
}
























