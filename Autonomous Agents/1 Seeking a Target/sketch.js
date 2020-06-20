var vehicle;

function setup() {
  createCanvas(800, 480);

  vehicle = new Vehicle(width / 2, height / 2, 10);
}

function draw() {
  // clear screen
  background(255);

  vehicle.seek(createVector(mouseX, mouseY));

  vehicle.update();
  vehicle.draw();
}
