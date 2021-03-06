// Check all checkEvents
// return 1 for freighters, 2 for Meteor Storms, 3 for planets

function checkEvents(x, y){


  if(gameSpace[x][y].celestialObjects.includes("Freighter")){
    playMusic("freighter");
    setTimeout(function() {
      alert("Freighter found! Energy 1000 & Supplies increased by 2%");
    });
    
    return 1;
  }

  if(gameSpace[x][y].celestialObjects.includes("Meteor Storm")){
    playMusic("meteor storm");
    setTimeout(function() {
      alert("Meteor Storm. Ship damaged! Energy will now deplete at 5 time the usual.");
    }, 1000);
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
  
    //Bad Max is hard coded to [7][7] for now
  if(gameSpace[x][y].celestialObjects.includes("Bad Max")){
    playMusic("bad max");
    setTimeout(function() {
      randomNum = Math.floor(Math.random() * 100);
      console.log("randomNum is " + randomNum);
      
      //We fight off Bad Max and live
      if (randomNum < 33){
        alert("You've encountered Bad Max... Fortunately, your crew was able to heroically fight them off successfully!");
      }
      //Bad Max boards the ship and steals all credits and half of supplies
      else if (randomNum > 66){
        alert("Bad Max has boarded your ship! His crew of goons stole all your credits and half of your supplies!");
        spaceship.credits = 0;
        spaceship.supplies = Math.floor(spaceship.supplies / 2); 
      }
      //Bad Max blows up your ship, everyone dies, game over
      else{
        death("BADMAX");
      }
    }, 1000);
    
    return 0;
  }

  if (gameSpace[x][y].celestialObjects.includes("Space Station")) {
    handleSpaceStationEvent();
  }

  return 0;
}
