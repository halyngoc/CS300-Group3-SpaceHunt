function checkEnergyAndSupplies(currEnergy, currSupplies)
{
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
