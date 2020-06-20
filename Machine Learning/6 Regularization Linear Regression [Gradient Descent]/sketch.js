var number_examples = 0;
var x_examples = [];
var y_examples = [];

var number_features = 100;
var parameters = [];

var learning_rate = 0.8;
var regularization = 0;

var control;

function setup() {
  createCanvas(360, 360);

  createP("regularization parameter : ");
  control = createSlider(0, 0.1, 0, 0.00001);
  control.position(200, 380);

  for (var j = 0; j <= number_features; j++) {
    parameters.push(1);
  }
}

function hypothesis(x) {
  var result = 0;
  for (var j = 0; j <= number_features; j++) {
    result += Math.pow(x, j) * parameters[j];
  }
  return result;
}

function cost_function(j) {
  var result = 0;
  for (var i = 0; i < number_examples; i++) {
    result += (hypothesis(x_examples[i]) - y_examples[i]) * Math.pow(x_examples[i], j);
  }
  return number_examples != 0 ? result / number_examples : 0;
}

function draw() {
  regularization = control.value();
  // gradient descent algorithm
  parameters[0] = parameters[0] - (learning_rate * cost_function(0));
  for (var j = 1; j <= number_features; j++) {
    // regularized gradient descent
    parameters[j] = parameters[j] * (1 - learning_rate * regularization) - (learning_rate * cost_function(j));
  }

  background(255);

  drawFunction(hypothesis);

  stroke(0);
  fill(100);
  ellipseMode(CENTER);
  for (var i = 0; i < number_examples; i++) {
    var x_pixel = map(x_examples[i], 0, 1, 0, width);
    var y_pixel = map(y_examples[i], 0, 1, height, 0);
    ellipse(x_pixel, y_pixel, 10, 10);
  }
}

function mousePressed() {
  x_examples.push(map(mouseX, 0, width, 0, 1));
  y_examples.push(map(mouseY, 0, height, 1, 0));
  number_examples++;
}

function drawFunction(f) {
  stroke(100);
  noFill();
  beginShape();
  for (var x_pixel = 0; x_pixel < width; x_pixel++) {
    var y_pixel = map(f(x_pixel / width), 0, 1, height, 0);
    vertex(x_pixel, y_pixel);
  }
  endShape();
}
