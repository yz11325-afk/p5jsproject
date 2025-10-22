let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  
  if (mouseIsPressed) {
    circles.push(new Circle(mouseX, mouseY));
  }
  
  for (let i = 0; i < circles.length; i++){
    circles[i].move();
    circles[i].border();
    circles[i].spawn();
  }
}

//function mousePressed(){
  //circles.push(new Circle(mouseX, mouseY)); //spawn circles, each one adds to end of array
//}


class Circle{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.r = random(10, 80);
    this.vx = random(-5, 5);
    this.vy = random(-5, 5);
    this.col = color(random(255), random(255), random(255)); 
  }
  
  move(){
    this.x += this.vx;
    this.y += this.vy;
  }
  
  border(){
    if (this.x - this.r < 0 || this.x + this.r > width) {
      this.vx *= -1;
    }
    if (this.y - this.r < 0 || this.y + this.r > height) {
      this.vy *= -1;
    }
  }
  
  spawn(){
    fill(this.col);
    ellipse(this.x, this.y, this.r * 2);
  }
}