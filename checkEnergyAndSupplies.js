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


function checkEnergy(currentEnergy)
{
  if(Mortal == true) {
	  if(currentEnergy <= 0)
  	{
    	if(!alert("You Ran out of Energy\n" + "GAME OVER")){window.location.reload();}
  	}
  }
}

function checkSupplies(currentSupplies)
{
  if(Mortal == true) {
  	if(currentSupplies <= 0)
  	{
    	if(!alert("You Ran out of Supplies\n" + "GAME OVER")){window.location.reload();}
  	}
  }
}
