if('PlayType' in localStorage) {
  var Style = localStorage.getItem('PlayType');

  Style = parseInt(Style, 10);

  if(Style == 1) {
  	var Mortal = true;
  } else {
  	var Mortal = false;
  }
  
  var devConfig = true;
}
else {
  var Mortal = true;
}

function death(causeOfDeath)
{
  if(Mortal == true) {
    document.getElementById("overlay").classList.add("black-overlay-animatable");
    document.getElementById("overlay").classList.remove("hidden");
    playMusic("die");
    setTimeout(function() {
      alertDeath(causeOfDeath);
    }, 2000);

    return true;
  }
}

function alertDeath(causeOfDeath) {
  if(causeOfDeath == "ENERGYANDSUPPLIES")
  {
    if(!alert("YOU RAN OUT OF ENERGY AND SUPPLIES!\nTHE ENTIRE CREW DIES.\n" + "GAME  OVER")){window.location.reload();}
  }
  else if(causeOfDeath == "ENERGY")
  {
    if(!alert("YOU RAN OUT OF ENERGY! THE ENTIRE CREW DIES.\n" + "GAME OVER"))  {window.location.reload();}
  }
  else if(causeOfDeath == "SUPPLIES")
  {
    if(!alert("YOU RAN OUT OF SUPPLIES! THE ENTIRE CREW DIES.\n" + "GAME OVER"))  {window.location.reload();}
  }
  else if(causeOfDeath == "ASTEROID")
  {
    if(!alert("YOU COLLIDE WITH AN ASTEROID! THE SHIP EXPLODES.\n" + "GAME OVER"))  {window.location.reload();}
  }
  else if(causeOfDeath == "BADMAX")
  {
    if(!alert("BAD MAX HAS ATTACKED AND DESTROYED YOUR SHIP!\n" + "EVERYONE HAS DIED.\n" + "GAME  OVER")){window.location.reload();}
  }
  else
  {
    if(!alert(causeOfDeath + "! CELESTIAL BODY COLLISION!\nTHE SHIP EXPLODES.\n" + "GAME OVER") ){window.location.reload();}
  }
}
