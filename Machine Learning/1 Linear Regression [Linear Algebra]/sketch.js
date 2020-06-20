var sample;
var slope, y_intercept;
var linear;

function setup() {
  createCanvas(360, 360);

  sample = {
    // data a
    a: createVector(0, 0),
    // data b
    b: createVector(100, 62.137),
    size: 10
  };
}

function f(x) {
  return slope * x + y_intercept;
}

function draw() {
  // calculate slope
  slope = (sample.a.y - sample.b.y) / (sample.a.x - sample.b.x);
  // calculate y intercept
  y_intercept = sample.a.y - slope * sample.a.x;
  // creating a linear function based of calculate slope and y intercept
  linear = new Linear(slope, y_intercept);

  // drag feature
  if (drag) {
    sample.b.x = mouseX;
    sample.b.y = (height - mouseY);
  }

  background(255);
  stroke(0);

  fill(100);
  ellipse(sample.a.x, height - sample.a.y, sample.size, sample.size);
  fill(drag ? 200 : 100);
  ellipse(sample.b.x, height - sample.b.y, sample.size, sample.size);

  linear.draw();
}

var drag = false;

function mousePressed() {
  var a = (mouseX - sample.b.x) * (mouseX - sample.b.x);
  var b = ((height - mouseY) - sample.b.y) * ((height - mouseY) - sample.b.y);

  var dist = sqrt(a + b);

  if (dist < sample.size / 2) {
    drag = true;
  }
}

function mouseClicked() {
  drag = false;
}

function Linear(slope, y_intercept) {

  const length = 1000;

  this.x1 = 0;
  this.y1 = y_intercept;
  this.x2 = length * cos(atan(slope));
  this.y2 = length * sin(atan(slope));

  this.draw = function() {
    line(this.x1, height - this.y1, this.x2, height - this.y2);
  }

}
