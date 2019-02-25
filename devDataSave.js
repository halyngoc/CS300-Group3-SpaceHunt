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
    
    setMapData(StateConfig, MapSize, parser);
}

function setMapData(StateConfig, MapSize, parser) {

    var i;
    var PlanetCeleron = ['0', '0']; PlanetXeon = ['0', '0']; PlanetRyzen = ['0', '0'];
    var Planets = [ PlanetCeleron[0], PlanetCeleron[1], PlanetXeon[0], PlanetXeon[1], PlanetRyzen[0], PlanetRyzen[1] ];

    var NumberofStations = document.getElementById("StationNum").value;
    var SpaceStations = ['-1', '-1', '-1', '-1', '-1', '-1'];

    var NumberofFreighters = document.getElementById("FreighterNum").value;
    var AbandonedFreighter = ['-1', '-1', '-1', '-1', '-1', '-1'];

    var NumberofMeteors = document.getElementById("MeteorNum").value;
    var MeteorStorms = ['-1', '-1', '-1', '-1', '-1', '-1'];

    var NumberofAsteroids = document.getElementById("AsteroidsNum").value;
    var Asteroids = ['-1', '-1', '-1', '-1', '-1', '-1'];


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
    }
    
    //Planets added to overall string
    StateConfig = StateConfig.concat(parser, Planets[0], parser, Planets[1], parser, Planets[2], parser, Planets[3], parser, Planets[4], parser, Planets[5]);
    
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
        if(NumberofStations == 1) { SpaceStations[2] = '-1'; SpaceStations[3] = '-1'; SpaceStations[4] = '-1'; SpaceStations[5] = '-1';}
        else if(NumberofStations == 2) { SpaceStations[4] = '-1'; SpaceStations[5] = '-1'; }

      }      
    }
    //Space stations added
    StateConfig = StateConfig.concat(parser, SpaceStations[0], parser, SpaceStations[1], parser, SpaceStations[2], parser, SpaceStations[3], parser, SpaceStations[4], parser, SpaceStations[5]);


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
        if(NumberofFreighters == 1) { AbandonedFreighter[2] = '-1'; AbandonedFreighter[3] = '-1'; AbandonedFreighter[4] = '-1'; AbandonedFreighter[5] = '-1';}
        else if(NumberofFreighters == 2) { AbandonedFreighter[4] = '-1'; AbandonedFreighter[5] = '-1'; }

      }      
    }
    //Abandoned Freighters added
    StateConfig = StateConfig.concat(parser, AbandonedFreighter[0], parser, AbandonedFreighter[1], parser, AbandonedFreighter[2], parser, AbandonedFreighter[3], parser, AbandonedFreighter[4], parser, AbandonedFreighter[5]);


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
        if(NumberofMeteors == 1) { MeteorStorms[2] = '-1'; MeteorStorms[3] = '-1'; MeteorStorms[4] = '-1'; MeteorStorms[5] = '-1';}
        else if(NumberofMeteors == 2) { MeteorStorms[4] = '-1'; MeteorStorms[5] = '-1'; }

      }      
    }
    //Meteors Storms added
    StateConfig = StateConfig.concat(parser, MeteorStorms[0], parser, MeteorStorms[1], parser, MeteorStorms[2], parser, MeteorStorms[3], parser, MeteorStorms[4], parser, MeteorStorms[5]);


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
        if(NumberofAsteroids == 1) { Asteroids[2] = '-1'; Asteroids[3] = '-1'; Asteroids[4] = '-1'; Asteroids[5] = '-1';}
        else if(NumberofAsteroids == 2) { Asteroids[4] = '-1'; Asteroids[5] = '-1'; }

      }      
    }
    //Asteroids added
    StateConfig = StateConfig.concat(parser, Asteroids[0], parser, Asteroids[1], parser, Asteroids[2], parser, Asteroids[3], parser, Asteroids[4], parser, Asteroids[5]);

    //window.alert(StateConfig);

    localStorage.setItem('Config', StateConfig);

}