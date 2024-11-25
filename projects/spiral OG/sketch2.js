"use strict";

var countOG = 20;
var r = 180;

var dotP = [];
var dotC = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < countOG; i++) {
    dotC[i] = new Circle(i);
    dotP[i] = new Particle(i);
  }
}

function draw() {
  background(255);
  let x = 0;
  let u = 0;
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < 106; i++) {
    if (i % 2 == 0) {
      if (x > 0.3 * width) {
        x = random(0.22, 0.28) * width;
      } else {
        x = random(0.32, 0.38) * width;
      }
    } else {
      u = u + random(PI / 64, PI / 16);
    }
    curveVertex(cos(u) * x + width / 2, sin(u) * x + height / 2);
  }
  endShape();

  noLoop();

  rotateAll();
  // Fader value ranges from 0 to 1 to 0 with mouseX
  var fader =
    1 - (Math.abs(mouseX - windowWidth / 2) / (windowWidth / 2)) * 0.5;
  for (var i = 0; i < countOG; i++) {
    dotP[i].update(fader);
    dotP[i].show();
    dotC[i].update(fader);
    dotC[i].show();
  }
}

function rotateAll() {
  // rotate everything forever with framecoiunt variable
  translate(windowWidth / 2, windowHeight / 2);
  rotate(frameCount * 0.01);
  translate(-windowWidth / 2, -windowHeight / 2);
}
