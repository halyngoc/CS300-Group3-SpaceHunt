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

function checkEnergyAndSupplies(currEnergy, currSupplies)
{
  if(Mortal == true) {
    if((currEnergy <= 0) && (currSupplies <= 0))
    {
      if(death("ENERGYANDSUPPLIES") == true)
        return true;
    }
    else if(currEnergy <= 0)
    {
      if(death("ENERGY") == true)
        return true;
    }
    else if(currSupplies <= 0)
    {
      if(death("SUPPLIES") == true)
        return true;
    }
    return false;
  }
}
