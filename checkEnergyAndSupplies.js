function checkEnergy(currentEnergy)
{
  if(currentEnergy <= 0)
  {
    if(!alert("You Ran out of Energy\n" + "GAME OVER")){window.location.reload();}
  }
}

function checkSupplies(currentSupplies)
{
  if(currentSupplies <= 0)
  {
    if(!alert("You Ran out of Supplies\n" + "GAME OVER")){window.location.reload();}
  }
}
