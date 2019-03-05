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



  move : function(direction) {
    directionCheck(direction);

    //var retCol = Collisions(this.location[0], this.location[1]);

    supplyDecrease();

    //if(this.damaged === true){
      //alert("Your ship is damaged. Energy consumed at 5 times. Repair ASAP.");
      //this.energy = this.energy - this.energyPerDistance * intDistance * 5;
    //}
    //else{
    this.energy = this.energy - this.energyPerDistance * intDistance;
    //}
    if(checkEnergyAndSupplies(this.energy, this.supplies) == true)
      return;
    //if(retCol === 1){
      //this.damaged = true;
    //}
    //if(retCol === 2){
      //this.energy = 1000;
      //this.supplies += 2;
    //}

    wormholeCheck();
    
    if(checkFreighter(this.location[0], this.location[1]) === true){
      this.energy = 1000;
      this.supplies += this.supplies * 0.02;
    }
    
    setData();

    handleMoveEvent(this.location[0], this.location[1]);

    this.displayCurrentCP();

    return false;
  },

  displayCurrentCP : function() {
    document.getElementById("currentCPcontent").innerHTML = gameSpace[this.location[0]][this.location[1]].toHTML();
  }
};


function directionCheck(direction) {

  intDistance = parseInt(document.getElementById("distance").value);

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

function supplyDecrease() {
  spaceship.supplies = Math.floor(spaceship.supplies * 0.98);
}

function setData() {
  document.getElementById("location").innerHTML = "Current Location: (" + spaceship.location[0] + ", " + spaceship.location[1] + ")";
  document.getElementById("energy").innerHTML = "Energy: " + spaceship.energy;
  document.getElementById("supplies").innerHTML = "Supplies: " + spaceship.supplies;
  document.getElementById("credits").innerHTML = "Credits: " + spaceship.credits;
}

var celestialMap = {
  celestialPoints : new Set(),

  // Returns formatted HTML of CM
  toHTML : function() {
    var html = "";
    this.celestialPoints.forEach(function(cp) {
      html += cp.toHTML();
    });
    return html;
  },

  // Display on html page
  display : function() {
    document.getElementById("celestialMapContent").innerHTML = this.toHTML();
  },

  // Import/Export CM @TODO
  loadFromString : function() {},
  toString : function() {}
};

//Map could contain 128x128 celestialPoint() objects
var gameSpace = [];
window.onload = function() {
  // Initialize gameSpace
  for (var i = 0; i <= spaceship.maxCoordX; i++) {
    var CPRow = [];
    for (var j = 0; j <= spaceship.maxCoordY; j++) {
      CPRow.push(new celestialPoint([i, j]));
    }
    gameSpace.push(CPRow);
  }

  // Display starting CP
  spaceship.displayCurrentCP();

  // Set locations of the 3 planets
  // For now the locations are hardcoded
  gameSpace[2][0].celestialObjects.push("Planet Celeron");
  gameSpace[5][1].celestialObjects.push("Planet Xeon");
  gameSpace[6][5].celestialObjects.push("Planet Ryzen");

  // Add the 3 planets to CM
  celestialMap.celestialPoints.add(gameSpace[2][0]);
  celestialMap.celestialPoints.add(gameSpace[5][1]);
  celestialMap.celestialPoints.add(gameSpace[6][5]);

  // Set locations of the 4 freighters
  // For now the locations are hardcoded
  gameSpace[24][39].celestialObjects.push("freighter");
  gameSpace[62][11].celestialObjects.push("freighter");
  gameSpace[33][2].celestialObjects.push("freighter");
  gameSpace[5][9].celestialObjects.push("freighter");

  // Add the 3 planets to CM
  celestialMap.celestialPoints.add(gameSpace[24][39]);
  celestialMap.celestialPoints.add(gameSpace[62][11]);
  celestialMap.celestialPoints.add(gameSpace[33][2]);
  celestialMap.celestialPoints.add(gameSpace[5][9]);

  // For debugging purposses, here are some celestial objects
  gameSpace[6][5].celestialObjects.push("asteroid");
  gameSpace[0][1].celestialObjects.push("asteroid");
  gameSpace[3][2].celestialObjects.push("asteroid");

  // Display starting CM with the 3 planets on it
  celestialMap.display();

  //Correctly displays data on dev menu exit
  setData();
};

function celestialPoint(location) {
  this.location = location;
  this.celestialObjects = [];

  this.toHTML = function() {
    var html = "<h2>Location: (" + this.location[0] + ", " + this.location[1] + ")</h2>";

    if (this.celestialObjects.length === 0) {
      html += "<p>Empty space...</p>";
    } else {
      this.celestialObjects.forEach(function(co) {
        html += "<p>" + co + "</p>";
      });
    }

    return html;
  };

	//Incomplete object constructor for celestial points
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
    // Header
    document.getElementById("nearbyCPs").innerHTML = "<h1><em>Nearby Celestial Points</em></h1>";

    // All nearby CPs
    getNearbyCPCoords(range).forEach(function(CPCoords) {
      document.getElementById("nearbyCPs").innerHTML += gameSpace[CPCoords[0]][CPCoords[1]].toHTML();
    });
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
