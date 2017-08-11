"use strict";
class Fluid {
  constructor(x1, y1, x2, y2, c, col) {
    this.start = createVector(x1, y1);
    this.end = createVector(x2, y2);
    this.c = c;
    this.col = col;
  }

  show() {
    fill(this.col);
    noStroke();
    rect(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  contain(m) {
    return (m.pos.x > this.start.x && m.pos.x < this.end.x && m.pos.y > this.start.y && m.pos.y < this.end.y)
  }

  applyDrag(m) {
    var dForce = m.vel.copy();
    var speed = dForce.mag();
    var area = PI * pow(m.radius, 2);

    var str = this.c * pow(speed, 2) * area;

    dForce.setMag(str);
    dForce.mult(-1);

    m.applyForce(dForce);
  }
}