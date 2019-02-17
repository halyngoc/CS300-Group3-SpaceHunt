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

    this.displayCurrentCP();

    return false;
  },

  displayCurrentCP : function() {
    document.getElementById("currentCPcontent").innerHTML = gameSpace[this.location[0]][this.location[1]].toHTML();
  }
};

function setData() {
  document.getElementById("location").innerHTML = "Current Location: (" + spaceship.location[0] + ", " + spaceship.location[1] + ")";
  document.getElementById("energy").innerHTML = "Energy: " + spaceship.energy;
  document.getElementById("supplies").innerHTML = "Supplies: " + spaceship.supplies + "%";
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
  for (var i = 0; i <= spaceship.maxCoord; i++) {
    var CPRow = [];
    for (var j = 0; j <= spaceship.maxCoord; j++) {
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

  // Display starting CM with the 3 planets on it
  celestialMap.display();
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
    return x >= 0 && x <= spaceship.maxCoord && y >= 0 && y <= spaceship.maxCoord;
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

  var nearbyCPCoords = getNearbyCPCoords(range);
  displayNearbyCPs(range);

  // Handle supplies lost
  spaceship.supplies -= 2;
  setData();

  // Update CM @TODO Add newly found COs to CM
  celestialMap.display();
};
