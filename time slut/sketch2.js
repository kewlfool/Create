// random walker that follows mouse pointer
// in a random path, obiously

var bgcolor;
var button;

var rM1, rM2, rH, rS;
var cM, cH, cS;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  // let canvas = createCanvas(500, 500);
  canvas.id("sketch-container");

  cH = hour();
  cM = minute();
  cS = second();
  // rM1 = floor(random(30));
  // rM2 = floor(random(30, 60));
  setrandom();
  rS = 0;
  // rH = floor(random(24));

  bgcolor = color(random(255), random(255), random(255));
  button = createButton("Change BG color");
  button.mousePressed(changeBG);

  // walker = new Particle();
}

function draw() {
  background(200);
  frameRate(1);
  // background(bgcolor);

  // let currentTime = new Date();
  // text("Current time: " + currentTime.toLocaleTimeString(), 20, 20);

  // let hourValue = currentTime.getHours();
  // let minuteValue = currentTime.getMinutes();

  // // Display the current hour and minute values
  // text("Current time: " + hourValue + ":" + minuteValue, 20, 40);

  // Current Time
  cH = hour();
  cM = minute();
  cS = second();
  text("Current Time:\n" + cH + " : " + cM + " : " + cS, 5, 100);

  text("First Random Minute:\n" + rM1, 5, 150);
  text("Second Random Minute:\n" + rM2, 5, 200);

  if ((cM == rM1 || cM == rM2) && cS == rS) {
    print(cM);
    text("Random Time Announcement:\n" + cH + " : " + cM + " : " + cS, 5, 250);
    announceTime(cH, cM, cS);
  }

  if (cM == 0 && cS == 0) {
    setrandom();
  }
}

function announceTime(hours, minutes, seconds) {
  if (hours > 12) {
    hours -= 12;

    let msg = new SpeechSynthesisUtterance(`It's ${hours} ${minutes}.`);

    // Select the default system voice (you can customize this if needed)
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[0];

    // Speak the message
    window.speechSynthesis.speak(msg);
  } else {
    let msg = new SpeechSynthesisUtterance(`It's ${hours} ${minutes}.`);

    // Select the default system voice (you can customize this if needed)
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[0];

    // Speak the message
    window.speechSynthesis.speak(msg);
  }
}

function setrandom() {
  rM1 = cM + 1;
  rM2 = rM1 + 1;
  // rM1 = floor(random(1, 30));
  // rM2 = floor(random(30, 60));

  // if (rM2 - rM1 <= 25 || rM2 - rM1 >= 40) {
  //   setrandom();
  // }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function changeBG() {
  bgcolor = color(random(255), random(255), random(255));
}
