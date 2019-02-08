//Example on how we could have shared definitions of our objects
//This is obviously incomplete, but an idea that may help us get started

function spaceship() {

	this.location = [0,0];
	this.energy = 1000;
	this.supplies = 100;
	this.credits = 1000;
	this.sensor = 0;
	this.engine = 0;
	this.damaged = false;
	
	this.move = function(x,y) {
		location[0] += x;
		location[1] += y;
		
		//If out of bounds call Wormhole?
		}
		
}

//Map would contain 128x128 celestialPoint() objects
function gameSpace() {

	this.map = [128][128]
	
}

function celestialPoint() {

	this.planet = false;
	this.asteroid = false;
	
	//etc
}