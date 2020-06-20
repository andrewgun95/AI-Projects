var sample = [];
var sampleSize = 15;

var newSample = [];

var learning1, learning2, learning3;

function setup() {
  createCanvas(360, 360);
  rectMode(CENTER);

  learning1 = new Learning();
  learning2 = new Learning();
  learning3 = new Learning();
}

function findMax(h1, h2, h3) {
  if (h1 > h2) {
    if (h1 > h3)
      return 1;
    else
      return 3;
  } else {
    if (h2 > h3)
      return 2;
    else
      return 3;
  }
}

var calculate = true;

function draw() {

  if (calculate) {
    learning1.calculate(sample, 1);
    learning2.calculate(sample, 2);
    learning3.calculate(sample, 3);
  } else {
    // make prediction
    for (var i = 0; i < newSample.length; i++) {
      var x1 = newSample[i].x;
      var x2 = newSample[i].y;

      var h1 = learning1.predict(x1, x2);
      var h2 = learning2.predict(x1, x2);
      var h3 = learning3.predict(x1, x2);

      if (findMax(h1, h2, h3) == 1) {
        newSample[i].z = 1;
      }
      if (findMax(h1, h2, h3) == 2) {
        newSample[i].z = 2;
      }
      if (findMax(h1, h2, h3) == 3) {
        newSample[i].z = 3;
      }
    }
  }

  background(255);

  colorMode(RGB);
  fill(100);
  stroke(0);

  for (var i = 0; i < sample.length; i++) {
    // reverse map
    var x = map(sample[i].x, 0, 1, 0, width);
    var y = map(sample[i].y, 0, 1, height, 0);

    if (sample[i].z == 1) {
      ellipse(x, y, sampleSize, sampleSize);
    }
    if (sample[i].z == 2) {
      line(x - sampleSize / 2, y - sampleSize / 2, x + sampleSize / 2, y + sampleSize / 2);
      line(x - sampleSize / 2, y + sampleSize / 2, x + sampleSize / 2, y - sampleSize / 2);
    }
    if (sample[i].z == 3) {
      rect(x, y, sampleSize, sampleSize);
    }
  }

  fill(255, 0, 0);
  stroke(255, 0, 0);

  for (var i = 0; i < newSample.length; i++) {
    // reverse map
    var x = map(newSample[i].x, 0, 1, 0, width);
    var y = map(newSample[i].y, 0, 1, height, 0);

    if (newSample[i].z == 1) {
      ellipse(x, y, sampleSize, sampleSize);
    }
    if (newSample[i].z == 2) {
      line(x - sampleSize / 2, y - sampleSize / 2, x + sampleSize / 2, y + sampleSize / 2);
      line(x - sampleSize / 2, y + sampleSize / 2, x + sampleSize / 2, y - sampleSize / 2);
    }
    if (newSample[i].z == 3) {
      rect(x, y, sampleSize, sampleSize);
    }
  }

  colorMode(HSB, 360, 100, 100);

  stroke(0, 90, 90);
  learning1.draw();

  stroke(240, 90, 90);
  learning2.draw();

  stroke(90, 90, 90);
  learning3.draw();
}

function mousePressed() {
  // feature scaling
  var x1 = map(mouseX, 0, width, 0, 1);
  var x2 = map(mouseY, 0, height, 1, 0);

  if (calculate) {
    if (mouseButton == LEFT) {
      sample.push(createVector(x1, x2, 1));
    }
    if (mouseButton == RIGHT) {
      sample.push(createVector(x1, x2, 2));
    }
    if (mouseButton == CENTER) {
      sample.push(createVector(x1, x2, 3))
    }
  } else {
    newSample.push(createVector(x1, x2, -1));
  }
}

function keyPressed() {
  if (keyCode == ENTER) {
    calculate = !calculate;
  }
}
