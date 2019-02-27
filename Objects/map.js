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

}