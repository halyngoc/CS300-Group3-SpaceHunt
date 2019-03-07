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
    if(death("VENUS") == true)
      return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Mars")){
    if(death("MARS") == true)
      return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Jupiter")){
    if(death("JUPITER") == true)
      return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Mercury")){
    if(death("MERCURY") == true)
      return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Sun")){
    if(death("SUN") == true)
      return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Saturn")){
    if(death("SATURN") == true)
      return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Uranus")){
    if(death("URANUS") == true)
      return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Neptune")){
    if(death("NEPTUNE") == true)
      return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Moon")){
    if(death("MOON") == true)
      return 3;
  }

  else {
    return 0;
  }
}
