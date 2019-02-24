function checkFreighter(x, y){

  if(gameSpace[x][y].celestialObjects == "freighter"){
    alert("Freighter found! Energy 1000 & Supplies increased by 2%");
    return true;
  }
  else {
    return false;
  }
}
