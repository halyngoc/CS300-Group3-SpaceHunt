//Example on how we could have shared definitions of our objects
//This is obviously incomplete, but an idea that may help us get started

var spaceship = {

	location : [0,0],
	energy : 1000,
	supplies : 100,
	credits : 1000,
	sensor : 0,
	energyPerDistance : 10,
	damaged : false,
	wormholeRandom : false,
	
	move : function(direction,distance) {	
		console.log("move was executed");
	
	    switch (direction)
	    {
	    case 0:
		this.location[0] += distance;
		break;
		
		case 90:
		this.location[1] += distance;
		break;
		
		case 180:
		this.location[0] -= distance;
		break;
		
		case 270:
		this.location[1] -= distance;
		break;
		
		default:
		console.log("Invalid direction.");
		break;
		}
		
		this.supplies -= 2;
		this.energy = this.energy - this.energyPerDistance * distance;
		
		//Wormhole check
		if (this.location[0] < 0 || this.location[0] > 127 || this.location[1] < 0 || this.location[1] > 127)
		{
			warmholeWarp();
		}
		
		setData();
	},
	
	
	wormholeWarp : function() {
	//TODO write actual random math
		if (this.wormholeRandom) 
		{
			this.location[0] = 75;
			this.location[1] = 75;
		}
		else
		{
			this.location[0] = 75;
			this.location[0] = 75;
		}	
	}
		
}

function setData() {
	//document.getElementById("location").innerHTML = "(" + spaceship.location[0].toString() + "," + spaceship.location[1].toString() + ")";
	//document.getElementById("energy").innerHTML = spaceship.energy;
	//document.getElementById("supplies").innerHTML = spaceship.supplies;
	//document.getELementById("credits").innerHTML = spaceship.credits;
}

//Map could contain 128x128 celestialPoint() objects
var gameSpace = {

	map : [128][128]
	
}

function celestialPoint() {

	this.planet = false;
	this.asteroid = false;
	
	//etc
}