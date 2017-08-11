"use strict";
var movers = [];
var fluids = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);

	movers.push(new Mover(2 * width / 4, 20, 5));

	fluids.push(new Fluid(0, 0, width, (2 * height) / 3, 0.00005, color(150)));
	fluids.push(new Fluid(0, (2 * height) / 3, width, height, 0.001, color(51)));
}

function draw() {
	background(255);

	var gravity = createVector(0, .3);

	movers.forEach((m) => {
		m.applyForce(gravity, true);

		fluids.forEach((f) => {
			if (f.contain(m)) f.applyDrag(m);
		});

	});

	if (mouseIsPressed) {
		var mouse = createVector(mouseX, mouseY);

		movers.forEach((m) => {
			var force = p5.Vector.sub(mouse, m.pos);

			force.setMag(5);
			if (mouseButton == CENTER) force.mult(-1);
			m.applyForce(force);
		});

	}

	fluids.forEach((f) => {
		f.show();
	});

	movers.forEach((m) => {
		m.update();
		m.show();
	});

}