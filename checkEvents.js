// Check all checkEvents
// return 1 for freighters, 2 for Meteor Storms, 3 for planets

function checkEvents(x, y){

  if(gameSpace[x][y].celestialObjects.includes("freighter")){
    alert("Freighter found! Energy 1000 & Supplies increased by 2%");
    return 1;
  }

  else if(gameSpace[x][y].celestialObjects.includes("Meteor Storm")){
    alert("Meteor Storm. Ship damaged!");
    damage = "true";
    return 2;
  }

  else if(gameSpace[x][y].celestialObjects.includes("Venus")){
    alert("Venus! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  else if(gameSpace[x][y].celestialObjects.includes("Mars")){
    alert("Mars! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  else if(gameSpace[x][y].celestialObjects.includes("Jupiter")){
    alert("Jupiter! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  else if(gameSpace[x][y].celestialObjects.includes("Mercury")){
    alert("Mercury! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  else if(gameSpace[x][y].celestialObjects.includes("Sun")){
    alert("Sun! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  else if(gameSpace[x][y].celestialObjects.includes("Saturn")){
    alert("Saturn! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  else if(gameSpace[x][y].celestialObjects.includes("Uranus")){
    alert("Uranus! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  else if(gameSpace[x][y].celestialObjects.includes("Neptune")){
    alert("Neptune! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  else if(gameSpace[x][y].celestialObjects.includes("Moon")){
    alert("Moon! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  else {
    return 0;
  }
}
