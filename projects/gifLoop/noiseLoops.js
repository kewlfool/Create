class NoiseLoop {
  constructor(diameter, min, max) {
    this.diameter = diameter;
    this.min = min;
    this.max = max;
    this.cx = random(1000);
    this.cy = random(1000);
  }

  value(a) {
    // let angle = map(percent, 0, 1, 0, TWO_PI);
    // uoff = radius * map(sin(angle), -1, 1, 0, 1);
    // voff = radius * map(sin(angle), -1, 1, 0, 1);

    let xoff = map(cos(a), -1, 1, this.cx, this.cx + this.diameter);
    let yoff = map(sin(a), -1, 1, this.cy, this.cy + this.diameter);
    let r = noise(xoff, yoff);
    return map(r, 0, 1, this.min, this.max);
  }
}
