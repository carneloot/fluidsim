"use strict";
class Mover {

  static get radiusScl() {
    return 2.5;
  }

  constructor(x, y, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();

    this.mass = mass;

    this.radius = this.mass * Mover.radiusScl;
  }

  applyForce(force, massless = false) {
    var newForce = force.copy();
    if (!massless)
      newForce.setMag(newForce.mag() / this.mass);
    this.acc.add(newForce);
  }

  update() {
    // Edges to bounce back
    if (this.pos.y + this.radius >= height) this.vel.y *= -1;
    if (this.pos.x + this.radius >= width) this.vel.x *= -1;
    if (this.pos.x - this.radius <= 0) this.vel.x *= -1;

    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);

    this.vel.mult(.9995);
  }

  show() {
    fill(210);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
  }
}