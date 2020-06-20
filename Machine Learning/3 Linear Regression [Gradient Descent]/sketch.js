var sample = [];
var slope = 0;
var y_intercept = 0;
var learning_rate = 0.01;

var linear;

function setup() {
  createCanvas(360, 360);
}

function draw() {

  for (var i = 0; i < sample.length; i++) {
    var x_truth = sample[i].x;
    var y_truth = sample[i].y;
    // model representation
    var y_guess = slope * x_truth + y_intercept;
    // cost function
    var error = y_truth - y_guess;

    // gradient descent algorithm
    slope = slope + learning_rate * (error * x_truth);
    y_intercept = y_intercept + learning_rate * error;
  }

  linear = new Linear(slope, y_intercept);

  background(255);
  stroke(0);
  fill(100);

  for (var i = 0; i < sample.length; i++) {
    // reverse map
    var x = map(sample[i].x, 0, 1, 0, width);
    var y = map(sample[i].y, 0, 1, height, 0);
    ellipse(x, y, 10, 10);
  }
  linear.draw();
}

function mousePressed() {
  // map x and y value to avoid largest value of data set
  var x = map(mouseX, 0, width, 0, 1);
  var y = map(mouseY, 0, height, 1, 0);

  sample.push(createVector(x, y));
}

function Linear(slope, y_intercept) {

  this.x1 = 0;
  this.y1 = slope * this.x1 + y_intercept;
  this.x2 = width;
  this.y2 = slope * this.x2 + y_intercept;

  this.draw = function() {
    // reverse map
    var x1 = map(this.x1, 0, 1, 0, width);
    var y1 = map(this.y1, 0, 1, height, 0);
    var x2 = map(this.x2, 0, 1, 0, width);
    var y2 = map(this.y2, 0, 1, height, 0);

    line(x1, y1, x2, y2);
  }

}
