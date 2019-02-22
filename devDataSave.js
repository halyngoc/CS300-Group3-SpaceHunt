function setStateData()
{
    var MapSize = document.getElementById("Dimensions").value;
    var StartLocation = document.getElementById("Location").value;
    MapSize = MapSize.split(',');
    StartLocation = StartLocation.split(',');
    //window.alert(MapSize.join("\n"));
    //window.alert(StartLocation.join("\n"));

    /*if(MapSize[0] < StartLocation[0] || MapSize[1] < StartLocation[1]) {
      window.alert("Please fix the Current Location values inputted so they are within the Game Size bounds set.")
      return;
    }
    */
    var Eng = document.getElementById("Energy").value;
    var Supl = document.getElementById("Supplies").value;
    var Cred = document.getElementById("Credits").value;
                    
    var RandWrm;
    var FixWrmLocation;
    if(document.getElementById("Random").checked){
      RandWrm = 1;
      FixWrmLocation = [0, 0];

    } else if (document.getElementById("Fixed").checked) {
      RandWrm =0;
      FixWrmLocation = document.getElementById("FixedWormhole").value;
      FixWrmLocation = FixWrmLocation.split(',');
      
      /*if(MapSize[0] < FixWrmLocation[0] || MapSize[1] < FixWrmLocation[1]){
        window.alert("Please change the Fixed Wormhole location values inputted so they are within the Game Size bounds set.")
        return;
      }
      */
    }

    var PlayStyleMor;
    if(document.getElementById("Mortal").checked){
      PlayStyleMor = 1;

    } else if (document.getElementById("Immortal").checked) {
      PlayStyleMor = 0;
    }
    
    var parser = "#";
  
    var StateConfig = MapSize[0].concat(parser, MapSize[1], parser, StartLocation[0], parser, StartLocation[1], parser, Eng, parser, Supl, parser, Cred, parser, RandWrm, parser, FixWrmLocation[0], parser, FixWrmLocation[1], parser, PlayStyleMor);
    
    //alert(StateConfig);

    localStorage.setItem('Config', StateConfig);
}