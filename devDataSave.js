function setStateData()
{
    var RandWrm;
    var FixWrmLocation = ['0.5', '0.5'];
    var PlayStyleMor;
    var RecipeLoc = ['0.5', '0.5'];

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

    if(document.getElementById("RandomRecipe").checked){
      RecipeLoc[0] = Math.floor((Math.random() * MapSize[0] + 1));
      RecipeLoc[1] = Math.floor((Math.random() * MapSize[1] + 1));

    } else if (document.getElementById("FixedRecipe").checked) {
      RecipeLoc = document.getElementById("RecipeLocation").value;
      RecipeLoc = RecipeLoc.split(',');
    }
 
    //bounds checking
    if(Number(MapSize[0]) < 9 || Number(MapSize[0]) > 255 || Number(MapSize[1]) < 9 || Number(MapSize[1]) > 255){
      window.alert("Map dimensions is limited to a range of at least 9 to 255 so that all items may be placed. Setting Map size to default 128,128.");
      MapSize[0] = '128'; 
      MapSize[1] = '128';
    }
    if(Number(StartLocation[0]) > Number(MapSize[0]) || Number(StartLocation[1]) > Number(MapSize[1]) || Number(StartLocation[0]) < 0 || Number(StartLocation[1]) < 0) {
      window.alert("Current location must be within the range of the map. Setting current location to a point within range.");
      StartLocation[0] = Math.floor((Math.random() * MapSize[0] + 1)); 
      StartLocation[1] = Math.floor((Math.random() * MapSize[1] + 1));
    }
    if(Number(MapSize[0]) < Number(FixWrmLocation[0]) || Number(MapSize[1]) < Number(FixWrmLocation[1]) || Number(FixWrmLocation[0]) < 0 || Number(FixWrmLocation[1]) < 0) {
      window.alert("Fixed wormhold location must be within the range of the map. Setting Fixed wormhole location to Current Location values");
      FixWrmLocation[0] = StartLocation[0]; 
      FixWrmLocation[1] = StartLocation[1];
    }
    if(Number(MapSize[0]) < Number(RecipeLoc[0]) || Number(MapSize[1]) < Number(RecipeLoc[1]) || Number(RecipeLoc[0]) < 0 || Number(RecipeLoc[1]) < 0) {
      window.alert("Fixed recipe location must be within the range of the map. Setting Fixed recipe location to the default location 25,25");
      RecipeLoc[0] = '25'; 
      RecipeLoc[1] = '25';
    }

    //localStorage string set up
    var parser = "#";

    var StateConfig = MapSize[0].concat(parser, MapSize[1], parser, StartLocation[0], parser, StartLocation[1], parser, Eng, parser, Supl, parser, Cred, parser, RandWrm, parser, FixWrmLocation[0], parser, FixWrmLocation[1], parser, PlayStyleMor, parser, RecipeLoc[0], parser, RecipeLoc[1]);
    
    setMapData(StateConfig, MapSize, parser);
}



function setMapData(StateConfig, MapSize, parser) {

    var i;
    var PlanetCeleron = ['0.5', '0.5']; PlanetXeon = ['0.5', '0.5']; PlanetRyzen = ['0.5', '0.5'];
    var Planets = [ PlanetCeleron[0], PlanetCeleron[1], PlanetXeon[0], PlanetXeon[1], PlanetRyzen[0], PlanetRyzen[1] ];

    var NumberofStations = document.getElementById("StationNum").value;
    var SpaceStations = ['0.5', '0.5', '0.5', '0.5', '0.5', '0.5'];

    var NumberofFreighters = document.getElementById("FreighterNum").value;
    var AbandonedFreighter = ['0.5', '0.5', '0.5', '0.5', '0.5', '0.5'];

    var NumberofMeteors = document.getElementById("MeteorNum").value;
    var MeteorStorms = ['0.5', '0.5', '0.5', '0.5', '0.5', '0.5'];

    var NumberofAsteroids = document.getElementById("AsteroidsNum").value;
    var Asteroids = ['0.5', '0.5', '0.5', '0.5', '0.5', '0.5'];


    if(document.getElementById("RandomPlanet").checked){
      for(i = 0; i < Planets.length; i+=2) {
        Planets[i] = Math.floor((Math.random() * MapSize[0] + 1));
        Planets[i+1] = Math.floor((Math.random() * MapSize[1] + 1));
      }

    } else if (document.getElementById("FixedPlanet").checked) {
      PlanetCeleron = document.getElementById("planetCeleron").value;
      PlanetXeon = document.getElementById("planetXeon").value;
      PlanetRyzen = document.getElementById("planetRyzen").value;
      PlanetCeleron = PlanetCeleron.split(',');
      PlanetXeon = PlanetXeon.split(',');
      PlanetRyzen = PlanetRyzen.split(',');
      
      Planets = [ PlanetCeleron[0], PlanetCeleron[1], PlanetXeon[0], PlanetXeon[1], PlanetRyzen[0], PlanetRyzen[1] ];
    }
    
    
    //Space stations
    if(NumberofStations != 0) {
      if(document.getElementById("RandomStation").checked) {
        for(i = 0; i < NumberofStations * 2; i+=2) {
          SpaceStations[i] = Math.floor((Math.random() * MapSize[0] + 1));
          SpaceStations[i+1] = Math.floor((Math.random() * MapSize[1] + 1));
        }
      } else if (document.getElementById("FixedStation").checked) {
        SpaceStations = document.getElementById("SpaceStationLocations").value;
        SpaceStations = SpaceStations.replace(/ /g, "");
        SpaceStations = SpaceStations.replace(/#/g, ",");
        SpaceStations = SpaceStations.split(',');
        if(NumberofStations == 1) { SpaceStations[2] = '0.5'; SpaceStations[3] = '0.5'; SpaceStations[4] = '0.5'; SpaceStations[5] = '0.5';}
        else if(NumberofStations == 2) { SpaceStations[4] = '0.5'; SpaceStations[5] = '0.5'; }

      }      
    }
   

    //Abandoned Freighters 
    if(NumberofFreighters != 0) {
      if(document.getElementById("RandomFreighter").checked) {
        for(i = 0; i < NumberofFreighters * 2; i+=2) {
          AbandonedFreighter[i] = Math.floor((Math.random() * MapSize[0] + 1));
          AbandonedFreighter[i+1] = Math.floor((Math.random() * MapSize[1] + 1));
        }
      } else if (document.getElementById("FixedFreighter").checked) {
        AbandonedFreighter = document.getElementById("FreighterLocations").value;
        AbandonedFreighter = AbandonedFreighter.replace(/ /g, "");
        AbandonedFreighter = AbandonedFreighter.replace(/#/g, ",");
        AbandonedFreighter = AbandonedFreighter.split(',');
        if(NumberofFreighters == 1) { AbandonedFreighter[2] = '0.5'; AbandonedFreighter[3] = '0.5'; AbandonedFreighter[4] = '0.5'; AbandonedFreighter[5] = '0.5';}
        else if(NumberofFreighters == 2) { AbandonedFreighter[4] = '0.5'; AbandonedFreighter[5] = '0.5'; }

      }      
    }
    

    //Meteor Storms
    if(NumberofMeteors != 0) {
      if(document.getElementById("RandomMeteor").checked) {
        for(i = 0; i < NumberofMeteors * 2; i+=2) {
          MeteorStorms[i] = Math.floor((Math.random() * MapSize[0] + 1));
          MeteorStorms[i+1] = Math.floor((Math.random() * MapSize[1] + 1));
        }
      } else if (document.getElementById("FixedMeteor").checked) {
        MeteorStorms = document.getElementById("MeteorLocations").value;
        MeteorStorms = MeteorStorms.replace(/ /g, "");
        MeteorStorms = MeteorStorms.replace(/#/g, ",");
        MeteorStorms = MeteorStorms.split(',');
        if(NumberofMeteors == 1) { MeteorStorms[2] = '0.5'; MeteorStorms[3] = '0.5'; MeteorStorms[4] = '0.5'; MeteorStorms[5] = '0.5';}
        else if(NumberofMeteors == 2) { MeteorStorms[4] = '0.5'; MeteorStorms[5] = '0.5'; }

      }      
    }
   

    //Asteroids
    if(NumberofAsteroids != 0) {
      if(document.getElementById("RandomAsteroids").checked) {
        for(i = 0; i < NumberofAsteroids * 2; i+=2) {
          Asteroids[i] = Math.floor((Math.random() * MapSize[0] + 1));
          Asteroids[i+1] = Math.floor((Math.random() * MapSize[1] + 1));
        }
      } else if (document.getElementById("FixedAsteroids").checked) {
        Asteroids = document.getElementById("AsteroidsLocations").value;
        Asteroids = Asteroids.replace(/ /g, "");
        Asteroids = Asteroids.replace(/#/g, ",");
        Asteroids = Asteroids.split(',');
        if(NumberofAsteroids == 1) { Asteroids[2] = '0.5'; Asteroids[3] = '0.5'; Asteroids[4] = '0.5'; Asteroids[5] = '0.5';}
        else if(NumberofAsteroids == 2) { Asteroids[4] = '0.5'; Asteroids[5] = '0.5'; }

      }      
    }
    

    //all 30 Map Items loaded (Planets, Space Stations, Abandoned Freighter, Meteor Storms, or Asteroids)
    var MapItems = [Planets[0], Planets[1], Planets[2], Planets[3], Planets[4], Planets[5], SpaceStations[0], SpaceStations[1], SpaceStations[2], SpaceStations[3], SpaceStations[4], SpaceStations[5], AbandonedFreighter[0], AbandonedFreighter[1], AbandonedFreighter[2], AbandonedFreighter[3], AbandonedFreighter[4], AbandonedFreighter[5], MeteorStorms[0], MeteorStorms[1], MeteorStorms[2], MeteorStorms[3], MeteorStorms[4], MeteorStorms[5], Asteroids[0], Asteroids[1], Asteroids[2], Asteroids[3], Asteroids[4], Asteroids[5] ];
    //window.alert(MapItems.join("\n"));

    BoundsChecking(StateConfig, MapItems, MapSize, parser);
}



function BoundsChecking(StateConfig, MapItems, MapSize, parser) {

  var i;
  var ErrorFound = false;


  for(i = 0; i < MapItems.length; i+=2) {

      if(Number(MapItems[i]) > Number(MapSize[0]) || Number(MapItems[i]) < 0) {
        MapItems[i] = Math.floor((Math.random() * MapSize[0] + 1));
        ErrorFound = true;
      }
      
      if(Number(MapItems[i+1]) > Number(MapSize[1]) || Number(MapItems[i+1]) < 0) {
        MapItems[i+1] = Math.floor((Math.random() * MapSize[1] + 1));
        ErrorFound = true;
      }
  }

  if(ErrorFound == true) {
    window.alert("An out of bounds error was found in your specified Map items (Planets, Space Stations, Abandoned Freighter, Meteor Storms, or Asteroids). The values have been corrected to be wintin the bounds of the Map.");
  }
  

  //Planets added to overall string
  StateConfig = StateConfig.concat(parser, MapItems[0], parser, MapItems[1], parser, MapItems[2], parser, MapItems[3], parser, MapItems[4], parser, MapItems[5]);
  
  //Space stations added
  StateConfig = StateConfig.concat(parser, MapItems[6], parser, MapItems[7], parser, MapItems[8], parser, MapItems[9], parser, MapItems[10], parser, MapItems[11]);
  
  //Abandoned Freighters added
  StateConfig = StateConfig.concat(parser, MapItems[12], parser, MapItems[13], parser, MapItems[14], parser, MapItems[15], parser, MapItems[16], parser, MapItems[17]);
  
  //Meteors Storms added
  StateConfig = StateConfig.concat(parser, MapItems[18], parser, MapItems[19], parser, MapItems[20], parser, MapItems[21], parser, MapItems[22], parser, MapItems[23]);
  
  //Asteroids added
  StateConfig = StateConfig.concat(parser, MapItems[24], parser, MapItems[25], parser, MapItems[26], parser, MapItems[27], parser, MapItems[28], parser, MapItems[29]);
  

  //window.alert(StateConfig);
  localStorage.setItem('Config', StateConfig);
}