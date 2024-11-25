void setup() {
  size(500, 500);
}

float index = 1.0;
float n = 0;
void draw() {
  background(#222222);
  stroke(0, 0);
  translate(width/2, height/2);

  float angleStepSize = 2 * PI / 14.5;
  float maxAngle = 3.4 * 2 * PI;
  float circles = maxAngle / angleStepSize;

  for (float angle = index * angleStepSize, i = 0.0; angle < maxAngle + index * angleStepSize; angle += angleStepSize, i++) {
    float x = (75 + 2.5 * i) * cos(angle);
    float y = (75 + 2.5 * i) * sin(angle);

    float radius = radius(i, circles, 40); 
    ellipse(x, y, radius, radius);
  }
  
  n++;
  if (n % 4 == 0) {
    index--;
  }
  
  //saveFrame("f####.gif");
  if (index < -4 * PI / angleStepSize + 1.5) {
    exit();
  }
}

float radius(float index, float maxNumberOfCircles, float maxRadius) {
  index /= maxNumberOfCircles / 2;
  index -= 1.0;
  return maxRadius * (2.0 * pow(2.0, -pow(index, 2.0)) - 1.0);
}