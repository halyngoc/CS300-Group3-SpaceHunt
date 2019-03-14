//Example on how we could have shared definitions of our objects
//This is obviously incomplete, but an idea that may help us get started
var devConfig = false;
var Rand;

if('Config' in localStorage)
{
  devConfig = true;

  var Config = localStorage.getItem('Config');
  //localStorage.removeItem('Config');
  Config = Config.split('#');

  var PlayStyle = Config[10];
  localStorage.setItem('PlayType', PlayStyle);  //save play style choice for supply and energy checks

  for(var i = 0; i < Config.length; i++) {
    Config[i] = parseFloat(Config[i]);
  }

  //wormhole behavoir
  Rand = (Config[7] == 1) ? true : false; //determine if wormhole is set to random or fixed

 } else {
 	devConfig = false;
 }


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


  move : function(direction) {

    // Hide gamble button, necessary here because otherwise the button would only gets hidden when clicked
    // This needs to happen before checkEvents()
    document.getElementById("gambleBtn").classList.add("hidden");

    intDistance = parseInt(document.getElementById("distance").value);
    
    var collision = checkCollision(intDistance, direction);
    
    directionCheck(direction, intDistance);
    WinningRecipeCheck();

    supplyDecrease();

    wormholeCheck();

    var retCheck = checkEvents(this.location[0], this.location[1]);

    energyDecrease(retCheck, collision, intDistance);
    
    if(checkEnergyAndSupplies(this.energy, this.supplies) == true)
      return;

    if(retCheck === 2){
      this.damaged = true;
    }
    if(retCheck === 1){
      this.energy = 1000;
      this.supplies += Math.floor(this.supplies * 0.02);
    }

    if(collision) {
      AsteroidCollision();
    }

    setData();

    this.displayCurrentCP();
    

    return false;
  },

  displayCurrentCP : function() {
    document.getElementById("currentCPcontent").innerHTML = gameSpace[this.location[0]][this.location[1]].toHTML();
    
    if (gameSpace[this.location[0]][this.location[1]].celestialObjects.length !== 0) {
      celestialMap.celestialPoints.add(gameSpace[this.location[0]][this.location[1]]);
    }
      
    celestialMap.display();
  }
};

function directionCheck(direction, intDistance) {

  switch (direction)
  {
    case "right":
    spaceship.location[0] += intDistance;
    break;

    case "up":
    spaceship.location[1] += intDistance;
    break;

    case "left":
    spaceship.location[0] -= intDistance;
    break;

    case "down":
    spaceship.location[1] -= intDistance; 
    break;

    default:
    console.log("Invalid direction.");
    break;
  }
}

function energyDecrease(retCheck, collision, intDistance) {

  if(collision === 0 || spaceship.damaged === true) {   //ship has not collided with anything
    
    if(spaceship.damaged === true && retCheck !== 3){
      spaceship.energy = spaceship.energy - spaceship.energyPerDistance * intDistance * 5;
    
    } else {
      spaceship.energy = spaceship.energy - spaceship.energyPerDistance * intDistance;
    }
  
  } else {  //ship has collided with something
    var damagedDistance = intDistance - collision; //cp's to deplete a damaged ship energy, collision is the marker of the asteroid so that will be the undamage value
    
    //undamaged
    spaceship.energy = spaceship.energy - spaceship.energyPerDistance * collision; //collision is the amount of cp's where the ship is undamaged    
    //damaged
    spaceship.energy = spaceship.energy - spaceship.energyPerDistance * damagedDistance * 5;
  }
}
//simple win function 
function WinningRecipeCheck() {
	
	if(Config != null) {
		if(spaceship.location[0] == Config[11] && spaceship.location[1] == Config[12]) {
			window.alert("YOU FOUND THE SECRET KOCA-KOLA RECIPE!!! YOU WIN!!!");
			window.location.reload();
		}
	}

	if(Config == null && spaceship.location[0] == 25 && spaceship.location[1] == 25) {
		window.alert("YOU FOUND THE SECRET KOCA-KOLA RECIPE!!! YOU WIN!!!");
		window.location.reload();
	}
}

function checkCollision(intDistance, direction) {

  var xCoor = spaceship.location[0]; 
  var yCoor = spaceship.location[1];

  for(var i = 0; i < intDistance; i++) {
    if(direction == "right") {
      xCoor += 1;
    } else if (direction == "up") {
      yCoor += 1;
    } else if (direction == "left") {
      xCoor -= 1;
    } else if (direction == "down") {
      yCoor -= 1;
    }

    if(Config != null) {
    	if(xCoor == Config[37] && yCoor == Config[38] || xCoor == Config[39] && yCoor == Config[40] || xCoor == Config[41] && yCoor == Config[42]) {
        return i+1;
    	}
    }
    if(Config == null && (xCoor == 6 && yCoor == 5 || xCoor == 0 && yCoor == 1 || xCoor == 3 && yCoor == 2) ) {
      return i+1;
    }
  }

  return 0;
}


function AsteroidCollision() {
	var chance = Math.random() * 100;
	
	if (chance < 90) { // 0-90% chance to be damaged and not die
    	window.alert("You collided with a ASTEROID!!! Luckily you survied with just some damages to your ship, tread carfully from here on! Due to the damage the ship now consumes energy at 5 times the usual rate.");
      spaceship.damaged = true;
  } else {
  		death("ASTEROID");
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
    
    } else
    {
      spaceship.location[0] = Config[8];
      spaceship.location[1] = Config[9];
    }
  }
}

function supplyDecrease() {
  spaceship.supplies = Math.floor(spaceship.supplies * 0.98);
}

function setData() {
  document.getElementById("energy").innerHTML = spaceship.energy;
  document.getElementById("supplies").innerHTML = spaceship.supplies;
  document.getElementById("credits").innerHTML = spaceship.credits;
}

var celestialMap = {
  celestialPoints : new Set(),

  // Returns formatted HTML of CM
  toHTML : function() {
    var html = "<tr><th>Celestial object</th><th>Location</th></tr>";
    this.celestialPoints.forEach(function(cp) {
      cp.celestialObjects.forEach(function(co) {
        html += "<tr><td>" + co + "</td><td>" + cp.location.toString() + "</td></tr>";
      });
    });
    return html;
  },

  // Display on html page
  display : function() {
    document.getElementById("gazetteer").innerHTML = this.toHTML();
  },

  // Import/Export CM @TODO
  loadFromString : function() {},
  toString : function() {}
};


//Map could contain 128x128 celestialPoint() objects
var gameSpace = [];
window.onload = function() {
	var i = 0, j = 0;
	var devConfig;
	
	if('Config' in localStorage) { devConfig = true; } else { devConfig = false;}
	localStorage.removeItem('Config');

  // Initialize gameSpace
  for (i = 0; i <= spaceship.maxCoordX; i++) {
    var CPRow = [];
    for (j = 0; j <= spaceship.maxCoordY; j++) {
      CPRow.push(new celestialPoint([i, j]));
    }
    gameSpace.push(CPRow);
  }

  // Display starting CP
  spaceship.displayCurrentCP();
  
  //Default Map items
  Default = [25, 25, 2, 0, 5, 1, 6, 5, 30, 48, 83, 14, 19, 65, 24, 39, 62, 11, 33, 2, 6, 12, 24, 35, 78, 26, 90, 5, 0, 1, 3, 2, 5, 20, 14, 8, 32, 0, 2, 25, 0, 30 ,71, 25, 55, 76, 102, 82, 20, 37, 7, 7];
  MapItemNames = ["Winning Recipe", "Planet Celeron", "Planet Xeon", "Planet Ryzen", "Space Station", "Space Station", "Space Station", "Freighter", "Freighter", "Freighter", "Meteor Storm", "Meteor Storm","Meteor Storm", "Asteroid", "Asteroid", "Asteroid", "Venus", "Mars", "Jupiter", "Mercury", "Sun", "Saturn", "Uranus", "Neptune", "Moon", "Bad Max"];

  //Map population

  if(devConfig) {	//dev Config items
    j = 0;
  	for(i = 11; i < Config.length; i += 2) {     
      if(Config[i] != 0.5 && Config[i+1] != 0.5) {
        gameSpace[Config[i]][Config[i+1]].celestialObjects.push(MapItemNames[j]);	
  		} 
  		//console.log("ConfigX: ", Config[i], " ConfigY: ", Config[i+1], "Name: ", MapItemNames[j] );
  		j += 1;	
  	}
  	
  	j = 16;
  	for(i = 32; i < Default.length; i += 2) {
  		gameSpace[Default[i]][Default[i+1]].celestialObjects.push(MapItemNames[j]);	
  		//console.log("DefaultX: ", Default[i], " DefaultY: ", Default[i+1], "Name: ", MapItemNames[j] );
  		j += 1;	
  	}
  
  } else {		//default Config items

    j = 0;
  	for(i = 0; i < Default.length; i += 2) {
  		gameSpace[Default[i]][Default[i+1]].celestialObjects.push(MapItemNames[j]);	
  		//console.log("DefaultX: ", Default[i], " DefaultY: ", Default[i+1], "Name: ", MapItemNames[j] );
  		j += 1;
  	}
  }
  
  	
	// Add the 3 planets to CM
	celestialMap.celestialPoints.add(gameSpace[devConfig ? Config[13] : 2][devConfig ? Config[14] : 0]);
	celestialMap.celestialPoints.add(gameSpace[devConfig ? Config[15] : 5][devConfig ? Config[16] : 1]);
	celestialMap.celestialPoints.add(gameSpace[devConfig ? Config[17] : 6][devConfig ? Config[18] : 5]);
  
  // Display starting CM with the 3 planets on it
  celestialMap.display();

  //Correctly displays data on dev menu exit
  setData();
};

function celestialPoint(location) {
  this.location = location;
  this.celestialObjects = [];

  this.toHTML = function() {
    var html = "<h2>Location (" + this.location.toString() + ")</h2>";

    if (this.celestialObjects.length === 0) {
      html += "<p>Empty space...</p>";
    } else {
      this.celestialObjects.forEach(function(co) {
        html += "<p>" + co + "</p>";
      });
    }

    return html;
  };

  this.toHTMLTableRow = function() {
    return "<tr><td>" + this.location.toString() + "</td><td>" + this.celestialObjects.toString() + "</td>";
  };
}

document.getElementById("sensorsBtn").onclick = function() {
  function isInGameSpace(coords) {
    var x = coords[0];
    var y = coords[1];
    return x >= 0 && x <= spaceship.maxCoordX && y >= 0 && y <= spaceship.maxCoordY;
  }

  function getNearbyCPCoords(range) {
    var currentX = spaceship.location[0];
    var currentY = spaceship.location[1];
    var nearbyCPCoords = [];

    // Could be more optimized but I don't really care for now
    for (var i = - range; i <= range; i++) {
      for (var j = - range; j <= range; j++) {
        var coords = [currentX + i, currentY + j];

        if (isInGameSpace(coords) && JSON.stringify(coords) != JSON.stringify([currentX, currentY])) {
          nearbyCPCoords.push(coords);
        }
      }
    }

    return nearbyCPCoords;
  }

  function displayNearbyCPs(range) {
    var html = "<tr><th>location</th><th>objects</th></tr>";

    getNearbyCPCoords(range).forEach(function(CPCoords) {
      html += gameSpace[CPCoords[0]][CPCoords[1]].toHTMLTableRow();
    });

    document.getElementById("nearbyCPsTemp").innerHTML = html;
  }

  // Range can be improved to 5, for now it's hardcoded to be 2
  var range = 2;

  displayNearbyCPs(range);

  // Handle supplies lost
  supplyDecrease();
  setData();

  // Update CM
  getNearbyCPCoords(range).forEach(function(coords) {
    var cp = gameSpace[coords[0]][coords[1]];
    if (cp.celestialObjects.length !== 0) {
      celestialMap.celestialPoints.add(cp);
    }
  });
  celestialMap.display();
};



//Listeners for movement buttons
document.getElementById("up").onclick = function() {
  spaceship.move("up");
};

document.getElementById("left").onclick = function() {
  spaceship.move("left");
};

document.getElementById("right").onclick = function() {
  spaceship.move("right");
};

document.getElementById("down").onclick = function() {
  spaceship.move("down");
};
