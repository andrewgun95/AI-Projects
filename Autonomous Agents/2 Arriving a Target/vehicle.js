function Vehicle(x, y, r) {
  this.loc = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();
  this.frc = createVector();

  this.r = r;

  this.max_speed = 2;
  this.max_force = 2;
  this.stop_range = 200;

  // const mass based of density (0.1) * volume
  const mass = 0.1 * (4 * r * r);

  this.seek = function(target) {
    // ACTION SELECTION
    // calculate desired velocity
    var desired = p5.Vector.sub(target, this.loc);
    var dist = desired.mag();
    desired.normalize();
    // arriving behavior with 100 pixel radius range
    if (dist < this.stop_range) {
      // speed will be related to distance, map between 0 and max_speed to minimaze speed
      var speed = map(dist, 0, this.stop_range, 0, this.max_speed);
      desired.mult(speed);
    }else{
      desired.mult(this.max_speed);
    }
    // STEERING
    // steering = desired velocity - current velocity
    var steering = p5.Vector.sub(desired, this.vel);
    // control max force depend on your creating behavior
    steering.limit(this.max_force);

    // LOCOMOTION
    // applying force to physics engine or physics simulation
    this.applyForce(steering);
  }

  this.applyForce = function(force) {
    this.frc.add(force);
  }

  this.update = function() {
    // location change by velocity
    this.loc.add(this.vel);

    // velocity change by acceleration
    this.vel.add(this.acc);
    this.vel.limit(10);
    // acceleration = force / mass
    this.acc.set(this.frc.div(mass));

    // restore force
    this.frc.mult(0);
  }

  this.draw = function() {

    var angle = this.vel.heading();

    stroke(0);
    fill(127);

    // save current state
    push();
    translate(this.loc.x, this.loc.y);
    rotate(angle + PI / 2);

    // draw vehicle
    beginShape();
    vertex(-this.r, this.r);
    vertex(0, -this.r);
    vertex(this.r, this.r);
    endShape(CLOSE);

    // restore previous state
    pop();
  }

}
