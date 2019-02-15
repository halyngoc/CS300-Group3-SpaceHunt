//Example on how we could have shared definitions of our objects
//This is obviously incomplete, but an idea that may help us get started


//check local, make bool, to check which to use

if('Config' in localStorage)
{
  var Config = localStorage.getItem('Config');

  Config = Config.split(',');

  for(var i = 0; i < Config.length; i++)
  {
    Config[i] = parseInt(Config[i], 10);
  }
  window.alert(Config.join("\n"));

  localStorage.clear();
  var devConfig = true;
}

//at the end of this delete local storage contents


var spaceship = {

//do parsing in here, add var for immortal, and modify nikolais file to check
  
  //use the ternary operator for choosing values since if statements cant be used 
  
  location : [0,0],         //1 //will need to split the 2 values for location
  energy : 1000,            //2
  supplies : 100,           //3
  credits : 1000,           //4
  sensor : 0,
  energyPerDistance : 10,
  damaged : false,
  wormholeRandom : false,   //if false puts you at 75 75 always
  maxCoord : 127,           //map size ask simon if this means 127 x127
  

  move : function() {	

    directionCheck();
		
    this.supplies -= 2;
    this.energy = this.energy - this.energyPerDistance * intDistance;

    wormholeCheck();

    setData();

    return false;
  }

}

function directionCheck() {
  intDistance = parseInt(document.getElementById("distance").value);

  switch (document.getElementById("direction").value) 
  {
  case "0":
  spaceship.location[0] += intDistance;
  break;
		
  case "90":
  spaceship.location[1] += intDistance;
  break;

  case "180":
  spaceship.location[0] -= intDistance;
  break;

  case "270":
  spaceship.location[1] -= intDistance;
  break;

  default:
  console.log("Invalid direction.");
  break;
  }
}

function wormholeCheck() {
  if (spaceship.location[0] < 0 || spaceship.location[0] > spaceship.maxCoord || spaceship.location[1] < 0 || spaceship.location[1] > spaceship.maxCoord)
  {
    alert("You've entered a wormhole!");
    //Random wormhole behavior is between 1 and 100
    if (this.wormholeRandom) 
    {       //random factor will need to be hanged by game size
      spaceship.location[0] = Math.floor((Math.random() * 100) + 1);
      spaceship.location[1] = Math.floor((Math.random() * 100) + 1);
    }
    else
    {
      spaceship.location[0] = 75;     //where the fixed worm hole dest is
      spaceship.location[1] = 75;
    }
  }
}

function setData() {
  document.getElementById("location").innerHTML = "Current Location: (" + spaceship.location[0] + ", " + spaceship.location[1] + ")";
  document.getElementById("energy").innerHTML = "Energy: " + spaceship.energy;
  document.getElementById("supplies").innerHTML = "Supplies: " + spaceship.supplies + "%";
  document.getElementById("credits").innerHTML = "Credits: " + spaceship.credits;
}

//Map could contain 128x128 celestialPoint() objects
var gameSpace = {
  map : [spaceship.maxCoord + 1][spaceship.maxCoord + 1]
};

function celestialPoint() {

  this.planet = false;
  this.asteroid = false;
	
	//Incomplete object constructor for celestial points
}

//Listener for 'Proceed' button
document.getElementById("proceed").onclick = function()
{
  spaceship.move();
}