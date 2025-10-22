let osc;
let env;
let notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
let balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  osc = new p5.Oscillator('triangle');
  osc.amp(0);
  osc.start();
  env = new p5.Envelope();
  env.setADSR(0.025, 0.3, 0, 1.2);
  env.setRange(1, 0);
  
   for (let i = 0; i < notes.length; i++) {
    balls[i] = new Ball(random(width), random(height), random(-5, 5), random(-5, 5), i);
  }
}

function draw() {
  background(220);
    for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
    balls[i].checkEdges();
  }
}

class Ball {
  constructor(x, y, xspeed, yspeed, noteIndex) {
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.noteIndex = noteIndex;
    this.size = random(30, 50);
    this.col = color(random(100, 255), random(100, 255), random(100, 255));
  }
  
  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
  
   display() {
    fill(this.col);
    ellipse(this.x, this.y, this.size);
  }
  
  checkEdges() {
    let hit = false;

    if (this.x < this.size / 2 || this.x > width - this.size / 2) {
      this.xspeed *= -1;
      hit = true;
    }
    if (this.y < this.size / 2 || this.y > height - this.size / 2) {
      this.yspeed *= -1;
      hit = true;
    }

    if (hit) {
      let f = notes[this.noteIndex];
      osc.freq(f);
      env.play(osc);
    }
  }
}

