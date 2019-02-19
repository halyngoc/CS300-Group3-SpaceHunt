//Example on how we could have shared definitions of our objects
//This is obviously incomplete, but an idea that may help us get started

if('Config' in localStorage)
{
  var Config = localStorage.getItem('Config');
  localStorage.removeItem('Config');
  
  Config = Config.split('#');
  var PlayStyle = Config[10];

  localStorage.setItem('PlayType', PlayStyle);  //save play style choice for supply and energy checks

  for(var i = 0; i < Config.length; i++)
  {
    Config[i] = parseInt(Config[i], 10);
  }
  //window.alert(Config.join("\n"));

  if(Config[7] == 1) {
    var Rand = true;
  }else {
    var Rand = false;
  }

  var devConfig = true;
}

//values wont update with dev config until at least one move have been made

var spaceship = {

  //use the ternary operator for choosing values since if statements cant be used 
  
  location : [devConfig ? Config[2] : 0, devConfig ? Config[3] : 0],         //1 //will need to split the 2 values for location
  energy : devConfig ? Config[4] : 1000,        
  supplies : devConfig ? Config[5] : 100,       
  credits : devConfig ? Config[6] : 1000,       
  sensor : 0,
  energyPerDistance : 10,
  damaged : false,
  wormholeRandom : devConfig ? Rand : true,   //if dev config has been made this can be set to T or F otherwise it will default to random behavoir 
  maxCoordX : devConfig ? Config[0] : 127,           
  maxCoordY : devConfig ? Config[1] : 127,


  move : function() {	

    directionCheck();
		
    this.supplies -= 2;
    this.energy = this.energy - this.energyPerDistance * intDistance;
    if(checkEnergyAndSupplies(this.energy, this.supplies) == true)
      return;

    wormholeCheck();

    setData();

    return false;
  }

};

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
 //Wormhole check
    if (spaceship.location[0] < 0 || spaceship.location[0] > spaceship.maxCoordX || spaceship.location[1] < 0 || spaceship.location[1] > spaceship.maxCoordY)
    {
      alert("You've entered a wormhole!");
      //Random wormhole behavior is between 1 and 100, //set to either the base set map size or the dev config map size
      if (spaceship.wormholeRandom == true) 
      {
        spaceship.location[0] = Math.floor((Math.random() * spaceship.maxCoordX) + 1);
        spaceship.location[1] = Math.floor((Math.random() * spaceship.maxCoordY) + 1);
      }
      else
      {
        spaceship.location[0] = Config[8];
        spaceship.location[1] = Config[9];
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
var gameSpace = { map : [spaceship.maxCoordX + 1][spaceship.maxCoordY + 1] };

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
