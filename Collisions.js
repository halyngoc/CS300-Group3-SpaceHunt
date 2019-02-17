

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
  if((x == 28 && y == 94) || (x == 48 && y == 97) || (x == 59 && y == 10) || (x == 68 && y == 9) || (x == 15 && y == 12) || (x == 3 && y == 4) || (x == 2 && y == 11) || (x == 8 && y == 44) || (x == 77 && y == 1)){
    alert("Asteroid! Your ship is damaged.\n");
    return 1;
  }

  else if(x == 2 && y == 94){
    alert("Asteroid! Your ship is damaged and the crew dies. Game Over\n");
    damage = "true";
    window.location.reload();
    return 0;
  }


  // Freighter
  if((x == 24 && y == 39) || (x == 62 && y == 11) || (x == 33 && y == 2) || (x == 55 && y == 9)){
    alert("Freighter found! Energy 100%! Supplies +2!\n");
    return 2;
  }  



  // …
}

