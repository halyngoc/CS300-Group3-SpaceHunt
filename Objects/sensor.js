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