// Check all checkEvents
// return 1 for freighters, 2 for Meteor Storms, 3 for planets

function checkEvents(x, y){

  if(gameSpace[x][y].celestialObjects.includes("freighter")){
    alert("Freighter found! Energy 1000 & Supplies increased by 2%");
    return 1;
  }

  if(gameSpace[x][y].celestialObjects.includes("Meteor Storm")){
    alert("Meteor Storm. Ship damaged!");
    spaceship.damaged = true;
    return 2;
  }

  if(gameSpace[x][y].celestialObjects.includes("Venus")){
    death("VENUS");
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Mars")){
    death("MARS");
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Jupiter")){
    death("JUPITER");
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Mercury")){
    death("MERCURY");
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Sun")){
    death("SUN");
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Saturn")){
    death("SATURN");
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Uranus")){
    death("URANUS");
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Neptune")){
    death("NEPTUNE");
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Moon")){
    death("MOON");
    return 3;
  }

  else {
    return 0;
  }
}
