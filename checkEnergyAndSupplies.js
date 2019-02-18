if('PlayType' in localStorage)
{
  var Style = localStorage.getItem('PlayType');

  Style = parseInt(Style, 10);

  if(Style == 1) {
  	var Mortal = true;
  } else {
  	var Mortal = false;
  }
  
  var devConfig = true;
}

function checkEnergyAndSupplies(currEnergy, currSupplies)
{
  if(Mortal == true) {

    if((currEnergy <= 0) && (currSupplies <= 0))
    {
      if(!alert("You ran out of Energy and Supplies\n" + "GAME OVER")){window.location.reload();}
      return true;
    }
    else if(currEnergy <= 0)
    {
      if(!alert("You ran out of Energy\n" + "GAME OVER")){window.location.reload();}
      return true;
    }
    else if(currSupplies <= 0)
    {
      if(!alert("You ran out of Supplies\n" + "GAME OVER")){window.location.reload();}
      return true;
    }
    else
      return false;
  }
}
