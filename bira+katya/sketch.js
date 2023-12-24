let planes = [];
let target;
let font;
let vehicles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // noise = new OpenSimplexNoise(Date.now());
  let p = new Particle();
  planes.push(p);
  target = new Target();

  let points = font.textToPoints("Bira + Katya", 100, windowHeight / 2, 80, {
    sampleFactor: 0.5,
  });

  for (var i = 0; i < points.length; i++) {
    let pt = points[i];
    let vehicle = new Dot(pt.x, pt.y);
    vehicles.push(vehicle);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }
}

function draw() {
  background(0);

  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    v.behavior();
    v.update();
    v.show();
    // v.edgesBounce();
    // v.wander();
    // let steering = v.arrive(vehicles[i].pos);
    // let steering = v.seek(vehicles[i].pos);
    // v.applyForce(steering);
  }

  // target.pos = createVector(mouseX, mouseY);
  // target.show();
  // target.update();
  // target.edgesBounce();
  // target.edges();

  // for (let plane of planes) {
  // plane.wander();
  // plane.wanderNoise();
  //   plane.show();
  //   plane.update();
  //   plane.edges();
  //   // plane.edgesBounce();

  //   let steering = plane.pursue(target);
  //   // let steering = plane.seek(target.pos);
  //   plane.applyForce(steering);

  //   let d = p5.Vector.dist(plane.pos, target.pos);
  //   if (d < plane.r + target.r) {
  //     target = new Target(random(width), random(height));
  //     // plane.pos.set(width / 2, height / 2);
  //   }
  // }
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
