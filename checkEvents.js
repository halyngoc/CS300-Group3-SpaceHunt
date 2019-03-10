// Check all checkEvents
// return 1 for freighters, 2 for Meteor Storms, 3 for planets

function checkEvents(x, y){

  if(gameSpace[x][y].celestialObjects.includes("Freighter")){
    alert("Freighter found! Energy 1000 & Supplies increased by 2%");
    return 1;
  }

  if(gameSpace[x][y].celestialObjects.includes("Meteor Storm")){
    alert("Meteor Storm. Ship damaged! Energy will now deplete at 5 time the usual.");
    spaceship.damaged = true;
    return 2;
  }

  if(gameSpace[x][y].celestialObjects.includes("Venus")){
    alert("Venus! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Mars")){
    alert("Mars! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Jupiter")){
    alert("Jupiter! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Mercury")){
    alert("Mercury! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Sun")){
    alert("Sun! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Saturn")){
    alert("Saturn! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Uranus")){
    alert("Uranus! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Neptune")){
    alert("Neptune! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }

  if(gameSpace[x][y].celestialObjects.includes("Moon")){
    alert("Moon! Celestial body Collision! Your ship is damaged and the crew dies. Game Over!\n");
    window.location.reload();
    return 3;
  }
  
  //Bad Max is hard coded to [7][7] for now
  if(gameSpace[x][y].celestialObjects.includes("Bad Max")){
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
      alert("BAD MAX HAS ATTACKED AND DESTROYED YOUR SHIP! EVERYONE HAS DIED. GAME OVER.");
      window.location.reload();
    }
    return 0;
  }

  else {
    return 0;
  }
}
