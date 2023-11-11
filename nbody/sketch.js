// Mutual Attract// The Nature of Code

let movers = [];
let sun;

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < 5; i++) {
    let pos = p5.Vector.random2D();
    let vel = pos.copy();
    // let vel = p5.Vector.random2D();
    vel.setMag(5);
    // vel.setMag(random(10, 15));
    // pos.setMag(random(200, 350));
    // vel.rotate(PI / 2);
    let m = 10;
    // let m = random(10, 15);
    movers[i] = new Mover(pos.x, pos.y, vel.x, vel.y, m);
  }
  sun = new Mover(0, 0, 0, 0, 500);
  // movers[0] = new Mover(300, 200, 0, 5, 10);
  // movers[1] = new Mover(100, 200, 0, -5, 10);
  // movers[2] = new Mover(200, 300, -5, 0, 10);
  // movers[3] = new Mover(200, 100, 5, 0, 10);
  // movers[3] = new Mover(200, 100, 5, 0, 10);
  background(0);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  // movers[0].attract(movers[1]);
  // movers[0].attract(movers[2]);

  // movers[1].attract(movers[0]);
  // movers[1].attract(movers[2]);

  // movers[2].attract(movers[1]);
  // movers[2].attract(movers[0]);
  // stroke(255);
  // line(movers[0].pos.x, movers[0].pos.y, movers[1].pos.x, movers[1].pos.y);

  for (let mover of movers) {
    sun.attract(mover);
    for (let other of movers) {
      if (mover !== other) {
        mover.attract(other);
        // stroke(255);
        // line(mover.pos.x, mover.pos.y, other.pos.x, other.pos.y);
      }
    }
  }

  for (let mover of movers) {
    mover.update();
    mover.show();
  }
  // sun.show();
}
