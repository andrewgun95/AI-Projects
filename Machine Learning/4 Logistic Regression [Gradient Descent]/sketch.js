var tetha0 = 0;
var tetha1 = 0;
var tetha2 = 0;
var learning_rate = 0.01;

var sample = [];
var sampleSize = 15;

var boundary;

function setup() {
  createCanvas(360, 360);
}

function sigmoid(z) {
  return 1 / (1 + exp(-z));
}

function draw() {

  background(255);

  for (var i = 0; i < sample.length; i++) {
    var x1 = sample[i].x;
    var x2 = sample[i].y;
    var y = sample[i].z;

    var h = sigmoid(tetha0 + tetha1 * x1 + tetha2 * x2);
    var error = y - h;

    tetha0 = tetha0 + learning_rate * error;
    tetha1 = tetha1 + learning_rate * (error * x1);
    tetha2 = tetha2 + learning_rate * (error * x2);
  }

  boundary = new DecisionBoundary(tetha0, tetha1, tetha2);

  fill(100);
  stroke(0);

  for (var i = 0; i < sample.length; i++) {

    // reverse map
    var x = map(sample[i].x, 0, 1, 0, width);
    var y = map(sample[i].y, 0, 1, height, 0);

    if (sample[i].z == 1) {
      ellipse(x, y, sampleSize, sampleSize);
    }
    if (sample[i].z == 0) {
      line(x - sampleSize / 2, y - sampleSize / 2, x + sampleSize / 2, y + sampleSize / 2);
      line(x + sampleSize / 2, y - sampleSize / 2, x - sampleSize / 2, y + sampleSize / 2);
    }
  }

  boundary.draw();
}

function cost(h, y) {
  return -y * log(h) - (1 - y) * log(1 - h);
}

function mousePressed() {
  // feature scaling
  var x1 = map(mouseX, 0, width, 0, 1);
  var x2 = map(mouseY, 0, height, 1, 0);

  if (mouseButton == LEFT) {
    sample.push(createVector(x1, x2, 1));
  }
  if (mouseButton == RIGHT) {
    sample.push(createVector(x1, x2, 0))
  }
}

function DecisionBoundary(tetha0, tetha1, tetha2) {

  var y_intersect = -(tetha0 / tetha2);
  var slope = -(tetha1 / tetha2);

  this.x1 = 0;
  this.y1 = y_intersect + slope * this.x1;
  this.x2 = width;
  this.y2 = y_intersect + slope * this.x2;

  this.draw = function() {
    // reverse map
    var x1 = map(this.x1, 0, 1, 0, width);
    var y1 = map(this.y1, 0, 1, height, 0);
    var x2 = map(this.x2, 0, 1, 0, width);
    var y2 = map(this.y2, 0, 1, height, 0);

    line(x1, y1, x2, y2);
  }
}
