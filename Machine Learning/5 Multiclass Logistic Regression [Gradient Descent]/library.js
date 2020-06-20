function Learning() {
  var tetha0 = 0,
    tetha1 = 0,
    tetha2 = 0;
  var learning_rate = 0.08;
  var boundary = undefined;

  function sigmoid(z) {
    return 1 / (1 + exp(-z));
  }

  this.calculate = function(sample, y_output) {
    for (var i = 0; i < sample.length; i++) {
      var x1 = sample[i].x;
      var x2 = sample[i].y;
      // one vs all (one vs rest)
      var y = 0;
      if (sample[i].z == y_output) {
        y = 1;
      }

      var h = sigmoid(tetha0 + tetha1 * x1 + tetha2 * x2);
      var error = y - h;

      tetha0 = tetha0 + learning_rate * error;
      tetha1 = tetha1 + learning_rate * (error * x1);
      tetha2 = tetha2 + learning_rate * (error * x2);
    }

    boundary = new DecisionBoundary(tetha0, tetha1, tetha2);
  }

  this.predict = function(x1, x2) {
    return sigmoid(tetha0 + tetha1 * x1 + tetha2 * x2);
  }

  this.draw = function() {
    boundary.draw();
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
