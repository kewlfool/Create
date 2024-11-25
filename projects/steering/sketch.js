let planes = [];
let target;
let n = 20;
let dots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // noise = new OpenSimplexNoise(Date.now());
  let p = new Particle();
  planes.push(p);
  target = new Target();

  for (var i = 0; i < n; i++) {
    let d = new Dot(mouseX, mouseY);
    dots.push(d);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }
}

function draw() {
  background(0);

  // target.pos = createVector(mouseX, mouseY);
  target.show();
  target.update();
  // target.edgesBounce();
  target.edges();

  // for (let i = 0; i < dots.length; i++) {
  //   let d = dots[i];
  //   // d.behavior();
  //   d.update();
  //   d.show(2);
  //   d.edgesBounce();
  //   // d.wander();
  //   // let steering = v.arrive(vehicles[i].pos);
  //   // let steering = v.seek(vehicles[i].pos);
  //   // v.applyForce(steering);
  // }

  for (let plane of planes) {
    // plane.wander();
    // plane.wanderNoise();
    plane.show();
    plane.update();
    plane.edges();
    // plane.edgesBounce();

    let steering = plane.pursue(target);
    // let steering = plane.seek(target.pos);
    plane.applyForce(steering);

    let d = p5.Vector.dist(plane.pos, target.pos);
    if (d < plane.r + target.r) {
      target = new Target(random(width), random(height));
      // plane.pos.set(width / 2, height / 2);
    }
  }
}

function mousePressed() {
  // let r = random(10, 50);
  // let p = new Particle(mouseX, mouseY);
  // planes.push(p);
}

function rotateAll() {
  // rotate everything forever with framecoiunt variable

  translate(windowWidth / 2, windowHeight / 2);
  rotate(frameCount * 0.01);
  translate(-windowWidth / 2, -windowHeight / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  font = loadFont("AvenirNextLTPro-Demi.otf");
}
