let particles = [];
let noise;

let movers = [];
let attractor;

function mousePressed() {
  // let r = random(10, 50);
  let w = new Mover(mouseX, mouseY, random(50, 150));
  movers.push(w);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noise = new OpenSimplexNoise(Date.now());
  attractor = new Attractor(windowWidth / 2, windowHeight / 2, 40);
}

function draw() {
  background(0);

  // let n = noise.noise3D(xoff, yoff, zoff);

  for (let mover of movers) {
    mover.update();
    mover.show();
    // mover.edges();
    attractor.attract(mover);
  }

  // particles.push(new Particle(200, 20));
  // // particles.push(new Particle(200, 20));
  // for (let particle of particles) {
  //   let gravity = createVector(0, 0.2);
  //   particle.applyForce(gravity);
  //   particle.update();
  //   particle.show();
  // }

  // for (let i = particles.length - 1; i >= 0; i--) {
  //   if (particles[i].finished()) {
  //     particles.splice(i, 1);
  //   }
  // }
}
