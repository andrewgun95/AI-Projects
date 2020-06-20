var sample_x = [];
var sample_y = [];
var sample_n = 0;

var slope = 1;
var y_intercept = 0;

var linear;

function setup() {
  createCanvas(360, 360);
}

function draw() {
  var x_average = average(sample_x);
  var y_average = average(sample_y);

  // calculate slope
  var a = 0;
  var b = 0;
  for (var i = 0; i < sample_n; i++) {
    a += (sample_x[i] - x_average) * (sample_y[i] - y_average);
    b += (sample_x[i] - x_average) * (sample_x[i] - x_average);
  }
  slope = a / b;

  // calculate y-intercept
  y_intercept = y_average - slope * x_average;

  linear = new Linear(slope, y_intercept);

  background(255);
  stroke(0);
  fill(100);

  for (var i = 0; i < sample_n; i++) {
    ellipse(sample_x[i], height - sample_y[i], 10, 10);
  }

  linear.draw();
}

function mousePressed() {
  sample_x.push(mouseX);
  sample_y.push(height - mouseY);
  sample_n++;
}

function average(data) {
  var total = 0;
  for (var i = 0; i < data.length; i++) {
    total += data[i];
  }
  return total / data.length;
}

function Linear(slope, y_intercept) {

  const length = 1000;

  this.x1 = 0;
  this.y1 = slope * this.x1 + y_intercept;
  this.x2 = width;
  this.y2 = slope * this.x2 + y_intercept;

  this.draw = function() {
    line(this.x1, height - this.y1, this.x2, height - this.y2);
  }

}
