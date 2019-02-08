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
	this.wormholeRandom = true;
	
	this.move = function(direction,distance) {	
	
	    switch (direction)
	    {
	    case "0":
		this.location[0] += distance;
		break;
		
		case "90":
		this.location[1] += distance;
		break;
		
		case "180":
		this.location[0] -= distance;
		break;
		
		case "270":
		this.location[1] -= distance;
		break;
		
		default:
		console.log("Invalid direction.");
		break;
		}
		
		if (inWormhole())
		{
			warmholeWarp();
		}
	}
	
	this.inWormhole() {
		if (this.location[0] < 0 || this.location[0] > 127 || this.location[1] < 0 || this.location[1] > 127)
			return true;
		return false;
	}
	
	this.wormholeWarp() {
	//TODO WRITE FUNCTION
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