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
  maxCoord : 127,
		
  move : function() {	

    intDistance = parseInt(newTurn.distance.value);

    switch (newTurn.direction.value)
    {
    case "0":
    this.location[0] += intDistance;
    break;
		
    case "90":
    this.location[1] += intDistance;
    break;

    case "180":
    this.location[0] -= intDistance;
    break;

    case "270":
    this.location[1] -= intDistance;
    break;

    default:
    console.log("Invalid direction.");
    break;
    }
		
    this.supplies -= 2;
    this.energy = this.energy - this.energyPerDistance * intDistance;

    //Wormhole check
    if (this.location[0] < 0 || this.location[0] > this.maxCoord || this.location[1] < 0 || this.location[1] > this.maxCoord)
    {
      alert("You've entered a wormhole!");
      //Random wormhole behavior is between 1 and 100
      if (this.wormholeRandom) 
      {
        this.location[0] = Math.floor((Math.random() * 100) + 1);
        this.location[1] = Math.floor((Math.random() * 100) + 1);
      }
      else
      {
        this.location[0] = 75;
        this.location[1] = 75;
      }	
    }

    setData();
		
    return false;
  }

}

function setData() {
  currentStatus.location.value = "(" + spaceship.location[0] + "," + spaceship.location[1] + ")";
  currentStatus.energy.value = spaceship.energy;
  currentStatus.supplies.value = spaceship.supplies + "%";
  currentStatus.credits.value = spaceship.credits;
}

//Map could contain 128x128 celestialPoint() objects
var gameSpace = {
  map : [spaceship.maxCoord + 1][spaceship.maxCoord + 1]
}

function celestialPoint() {

  this.planet = false;
  this.asteroid = false;
	
	//Incomplete object constructor for celestial points
}