<script>

// US-5 Collisions
// location: [0, 0], using array of 2 elements, location[0]—x, location[1]—y

// x for x axis, location[0]
// y for y axis, location[1]
function Collisions(int x, int y) {

  // Meteor Storm
  if((x == 6 && y == 12)){
    alert(“Meteor Storm! Your ship is damaged.\n”);
  }
  else if(x == 24 && y == 35)){
    alert(“Meteor Storm! Your ship is damaged.\n”);
  }
  else if(x == 78 && y == 26)){
    alert(“Meteor Storm! Your ship is damaged.\n”);
  }

  // Asteroid
  else if(x == 28 && y == 94)){
    alert("Asteroid! Your ship is damaged.\n");
  }
  else if(x == 48 && y == 97)){
    alert("Asteroid! Your ship is damaged.\n");
  }
  else if(x == 92 && y == 94)){
    alert("Asteroid! Your ship is damaged and the crew dies. Game Over\n");
  }
  else if(x == 59 && y == 10)){
    alert("Asteroid! Your ship is damaged.\n");
  }
  else if(x == 68 && y == 9)){
    alert("Asteroid! Your ship is damaged.\n");
  }
  else if(x == 15 && y == 12)){
    alert("Asteroid! Your ship is damaged.\n");
  }
  else if(x == 3 && y == 4)){
    alert("Asteroid! Your ship is damaged.\n");
  }
  else if(x == 2 && y == 11)){
    alert("Asteroid! Your ship is damaged.\n");
  }
  else if(x == 8 && y == 44)){
    alert("Asteroid! Your ship is damaged.\n");
  }
  else if(x == 77 && y == 1)){
    alert("Asteroid! Your ship is damaged.\n");
  }

  // Freighter
  else if(x == 34 && y == 92)){
    alert("Freighter! Energy 100%.\n");
  }  
  else if(x == 62 && y == 11)){
    alert("Freighter! Energy 100%.\n");
  }  
  else if(x == 33 && y == 2)){
    alert("Freighter! Energy 100%.\n");
  }  
  else if(x == 55 && y == 9)){
    alert("Freighter! Energy 100%.\n");
  }  

  // …
}

</script>