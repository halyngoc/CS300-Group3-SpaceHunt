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
                    

    if(document.getElementById("Random").checked){
      var RandWrm = 1;
      var FixWrmLocation = [0, 0];

    } else if (document.getElementById("Fixed").checked) {
      var RandWrm =0;
      var FixWrmLocation = document.getElementById("FixedWormhole").value;
      FixWrmLocation = FixWrmLocation.split(',');
      
      /*if(MapSize[0] < FixWrmLocation[0] || MapSize[1] < FixWrmLocation[1]){
        window.alert("Please change the Fixed Wormhole location values inputted so they are within the Game Size bounds set.")
        return;
      }
      */
    }

    if(document.getElementById("Mortal").checked){
      var PlayStyleMor = 1;

    } else if (document.getElementById("Immortal").checked) {
      var PlayStyleMor = 0;
    }
    
    var parser = "#"
  
    var StateConfig = MapSize[0].concat(parser, MapSize[1], parser, StartLocation[0], parser, StartLocation[1], parser, Eng, parser, Supl, parser, Cred, parser, RandWrm, parser, FixWrmLocation[0], parser, FixWrmLocation[1], parser, PlayStyleMor);
    
    alert(StateConfig);

    localStorage.setItem('Config', StateConfig);
  }