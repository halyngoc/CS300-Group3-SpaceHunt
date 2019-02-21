

// US-5 Collisions
// location: [0, 0], using array of 2 elements, location[0]—x, location[1]—y

// x for x axis, location[0]
// y for y axis, location[1]


function Collisions(x, y) {

  // Meteor Storm
  if((x == 6 && y == 12) || (x == 24 && y == 35) ||(x == 78 && y == 26)){
    alert("Meteor Storm! Your ship is damaged.\n");
    return 1;
  }


  // Asteroid
  else if((x == 28 && y == 94) || (x == 48 && y == 97) || (x == 59 && y == 10) || (x == 68 && y == 9) || (x == 15 && y == 12) || (x == 3 && y == 4) || (x == 2 && y == 11) || (x == 8 && y == 44) || (x == 77 && y == 1)){
    alert("Asteroid! Your ship is damaged.\n");
    return 1;
  }

  else if((x == 2 && y == 94) || (x == 56 && y == 49)){
    alert("Asteroid! Your ship is damaged and the crew dies. Game Over\n");
    damage = "true";
    window.location.reload();
    return 0;
  }

  // Celestial body
  else if(x == 5 && y == 20){
    alert("Venus! Celestial body Collision! Your ship is damaged and the crew dies. Game Over\n");
    damage = "true";
    window.location.reload();
    return 0;
  }

  else if(x == 14 && y == 8){
    alert("Mars! Celestial body Collision! Your ship is damaged and the crew dies. Game Over\n");
    damage = "true";
    window.location.reload();
    return 0;
  }

  else if(x == 32 && y == 0){
    alert("Jupiter! Celestial bodyCollision! Your ship is damaged and the crew dies. Game Over\n");
    damage = "true";
    window.location.reload();
    return 0;
  }

  else if(x == 2 && y == 25){
    alert("Mercury! Celestial body Collision! Your ship is damaged and the crew dies. Game Over\n");
    damage = "true";
    window.location.reload();
    return 0;
  }

  else if(x == 0 && y == 30){
    alert("Sun! Celestial body Collision! Your ship is damaged and the crew dies. Game Over\n");
    damage = "true";
    window.location.reload();
    return 0;
  }

  else if(x == 71 && y == 25){
    alert("Saturn! Celestial body Collision! Your ship is damaged and the crew dies. Game Over\n");
    damage = "true";
    window.location.reload();
    return 0;
  }

  else if(x == 55 && y == 76){
    alert("Uranus! Celestial body Collision! Your ship is damaged and the crew dies. Game Over\n");
    damage = "true";
    window.location.reload();
    return 0;
  }

  else if(x == 102 && y == 82){
    alert("Neptune! Celestial body Collision! Your ship is damaged and the crew dies. Game Over\n");
    damage = "true";
    window.location.reload();
    return 0;
  }

  else if(x == 1 && y == 1){
    alert("Moon! Celestial body Collision! Your ship is damaged and the crew dies. Game Over\n");
    damage = "true";
    window.location.reload();
    return 0;
  }


  // spacecraft
  else if(x == 3 && y == 26){
    alert("Spacecraft! Celestial artifact Collision! Your ship is damaged and the crew dies. Game Over\n");
    damage = "true";
    window.location.reload();
    return 0;
  }

  else if(x == 15 && y == 9){
    alert("Spacecraft! Celestial artifact Collision! Your ship is damaged and the crew dies. Game Over\n");
    damage = "true";
    window.location.reload();
    return 0;
  }


  // Freighter
  else if((x == 24 && y == 39) || (x == 62 && y == 11) || (x == 33 && y == 2) || (x == 55 && y == 9)){
    alert("Freighter found! Energy 100%! Supplies +2%!\n");
    return 2;
  }  



  // …
}

