function setStateData()
{
    var RandWrm;
    var FixWrmLocation = ['0', '0'];
    var PlayStyleMor;

    //textbox value pulls
    var MapSize = document.getElementById("Dimensions").value;
    var StartLocation = document.getElementById("Location").value;
    MapSize = MapSize.split(',');
    StartLocation = StartLocation.split(',');
    
    var Eng = document.getElementById("Energy").value;
    var Supl = document.getElementById("Supplies").value;
    var Cred = document.getElementById("Credits").value;
                  
    //radio button checks
    if(document.getElementById("Random").checked){
      RandWrm = '1';
    } else if (document.getElementById("Fixed").checked) {
      RandWrm = '0';
      FixWrmLocation = document.getElementById("FixedWormhole").value;
      FixWrmLocation = FixWrmLocation.split(',');
    }
    
    if(document.getElementById("Mortal").checked){
      PlayStyleMor = '1';
    } else if (document.getElementById("Immortal").checked) {
      PlayStyleMor = '0';
    }
    
    //bounds checking
    if(Number(MapSize[0]) < 9 || Number(MapSize[0]) > 255 || Number(MapSize[1]) < 9 || Number(MapSize[1]) > 255){
      window.alert("Map dimensions is limited to a range of at least 9 to 255 so that all items may be placed. Setting Map size to default 128,128.");
      MapSize[0] = '128'; 
      MapSize[1] = '128';
    }
    if(Number(StartLocation[0]) > Number(MapSize[0]) || Number(StartLocation[1]) > Number(MapSize[1]) || Number(StartLocation[0]) < 0 || Number(StartLocation[1]) < 0) {
      window.alert("Current location must be within the range of the map. Setting current location to a point within range.");
      StartLocation[0] = Number(MapSize[0]) - 1; 
      StartLocation[1] = Number(MapSize[1]) - 1;
    }
    if(Number(MapSize[0]) < Number(FixWrmLocation[0]) || Number(MapSize[1]) < Number(FixWrmLocation[1]) || Number(FixWrmLocation[0]) < 0 || Number(FixWrmLocation[1]) < 0) {
      window.alert("Fixed wormhold location must be within the range of the map. Setting Fixed wormhole location to Current Location values");
      FixWrmLocation[0] = StartLocation[0]; 
      FixWrmLocation[1] = StartLocation[1];
    }

    //localStorage string set up
    var parser = "#";
    var StateConfig = MapSize[0].concat(parser, MapSize[1], parser, StartLocation[0], parser, StartLocation[1], parser, Eng, parser, Supl, parser, Cred, parser, RandWrm, parser, FixWrmLocation[0], parser, FixWrmLocation[1], parser, PlayStyleMor);
    
    //window.alert(StateConfig);

    localStorage.setItem('Config', StateConfig);
}