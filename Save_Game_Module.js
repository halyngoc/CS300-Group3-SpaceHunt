
// This module (object) saves, restores, and deletes user profiles and associated game state data.
var Save_Game_Module = {

  // add_user generates a new profile with the username specified
  add_user: function() {
    // add user to the user selection widget according to input
    var select_widget = document.getElementById("user_select");
    var input = document.getElementById("new_user").value;

    // make sure added username is not blank
    if (input != "Select Profile" && input != "" && this.username_taken(input) == false)
    {
      // generate option for user select widget
      var option = document.createElement("option");
      option.text = input;
      select_widget.add(option);

      // update the number of stored users for menu initialization reference
      // If no user data has been saved, add a localStorage item with num_users key
      if (localStorage.getItem("num_users") == null) {
        localStorage.setItem("num_users", 1);
      }
      else {
        // if previous users have been saved, increment num_users count in localStorage
        localStorage.setItem("num_users", parseInt(localStorage.getItem("num_users"))+1);
      }

      // store name of user in local_storage
      localStorage.setItem("user"+localStorage.getItem("num_users"), input);

      select_widget.selectedIndex = parseInt(localStorage.getItem("num_users"));
    }
  },


  // determine if username attempted to be saved is already used in memory
  username_taken: function(name) {
    // determine numebr of users stored in memory to iterate through the associated names
    var x = localStorage.getItem("num_users");
    // iterate through saved usernames only if usernames have been stored previously
    if (x != null) {
      for (var y = 1; y <= (parseInt(x)); ++y) {
        if (localStorage.getItem("user"+y) == name) {
          return true;
        }
      }
    }
    return false;
  },

  // load_users is called when SpaceHunt.html loads, and populates
  // the profile selection widget
  load_users: function() {
    // determine the number of user profiles saved in local memory (value updated with add_user function)
    var x = localStorage.getItem("num_users");

    // onload upload user names if there are saved users detected in memory
    if (x != null && x > 0) {

      // loop through the keys associated with usernames to load as options into the display
      while (x > 0) {
        var option = document.createElement("option");
        option.text = localStorage.getItem("user"+x);
        var select_widget = document.getElementById("user_select");
        select_widget.add(option);

        // decrement user index to loop to next user
        x = x - 1;
      }
    }
  },



  // clear_users removes all saved usernames and the associated game data
  clear_users: function() {
    var x = localStorage.getItem("num_users");
    var select_widget = document.getElementById("user_select");

    // first determine if there are users to delete
    if (x != null && x > 0) {
      while (x > 0) {
        select_widget.selectedIndex = x;
        var username = document.getElementById("user_select").value;
        this.clear_user_data(username);    
        select_widget.remove(x);
        x = x - 1;
      }
    }    
    localStorage.setItem("num_users", 0);
  },



  // clear_user_data removes all localStorage data associated with a username
  clear_user_data: function(user) {
    if (localStorage.getItem("game_saved"+user) == null) {
      return;
    }
    // clear user data corresponding to spaceship variables
    localStorage.removeItem("game_saved"+user);
    localStorage.removeItem("spaceship_energy"+user);
    localStorage.removeItem("location_x"+user);
    localStorage.removeItem("location_y"+user);
    localStorage.removeItem("supplies"+user);
    localStorage.removeItem("credits"+user);
    localStorage.removeItem("energyPerDistance"+user);
    localStorage.removeItem("maxcoordx"+user);
    localStorage.removeItem("maxcoordy"+user);
    localStorage.removeItem("damaged"+user);
    localStorage.removeItem("sensor"+user);
    localStorage.removeItem("Mortal"+user);
    console.log("cleared user data for: " + user);

    // call secondary function to clear map memory associated with this user
    this.clear_user_map(user);
  },


  // clear saved map information associated with a username
  clear_user_map: function(user) {
    console.log("clear map of user " + user);
    // retrieve and parse concatenated string of indices for designated user
    var gamepiece_indices_stored = localStorage.getItem(user+"_indices");
    var index_sets = gamepiece_indices_stored.split("#");
    var num_space_items_stored = index_sets.length;

    // iterate through occupied gameSpace indices (with repeats) as implied by list of indices loaded from localStorage
    for (var z = 1; z < num_space_items_stored; ++z) {
      // select string corresponding to the "celestialObject" location and its relative order within the "celestialPoint" array
      var index_string = index_sets[z];
      // parse index and relative ordering in celestialObject array so that key corresponding to this item can be built and sed
      var index_string_split = index_string.split(",");
      var number_items_in_location = parseInt(index_string_split[2]);
      var x_coord = parseInt(index_string_split[0]);
      var y_coord = parseInt(index_string_split[1]);
      var array_index = parseInt(index_string_split[2]);

      // verify that the item is in memory to be deleted
      var item_loaded = localStorage.getItem(String(x_coord) + "," + String(y_coord) + "," + String(array_index) + "," + user);
      console.log("Item deleted for location: ["+x_coord+"]["+y_coord+"] : " + item_loaded);

      // delete item
      localStorage.removeItem(String(x_coord) + "," + String(y_coord) + "," + String(array_index) + "," + user);

      // verify deletion
      console.log("Verifying memory delete: " + localStorage.getItem(String(x_coord) + "," + String(y_coord) + "," + String(array_index) + "," + user));
      }
  },



  // store_user_data stores game state for the profile selected
  store_user_data: function() {
    var username = document.getElementById("user_select").value;
    if (username == 'Select Profile') {
      return;
    }
    console.log("Saving data for : " + username);

    // store each item corresponding to the spaceship state
    localStorage.setItem("game_saved"+username, 0);
    localStorage.setItem("spaceship_energy"+username, spaceship.energy);
    localStorage.setItem("location_x"+username, spaceship.location[0]);
    localStorage.setItem("location_y"+username, spaceship.location[1]);
    localStorage.setItem("supplies"+username, spaceship.supplies);
    localStorage.setItem("credits"+username, spaceship.credits);
    localStorage.setItem("energyPerDistance"+username, spaceship.energyPerDistance);
    localStorage.setItem("maxcoordx"+username, spaceship.maxCoordX);
    localStorage.setItem("maxcoordy"+username, spaceship.maxCoordY);
    localStorage.setItem("sensor"+username, spaceship.sensor);
    if (Mortal == false) {
      localStorage.setItem("Mortal"+username, "false")
    }
    else {
      localStorage.setItem("Mortal"+username, "true")
    }

    // store damaged variable as 1 or 0 since everything is saved as strings
    if (spaceship.damaged == true) {
      localStorage.setItem("damaged"+username, 1);
    }
    else {
      localStorage.setItem("damaged"+username, 0);
    }

    // call secondary store function store_map to save the map state
    this.store_map(username);
  },



  // load_user_data restores game state for the profile selected
  load_user_data: function() {
    var username = document.getElementById("user_select").value;
    if (username == 'Select Profile') {
      return;
    }
    console.log("Loading saved data for : " + username);

    // load the user's game contents only if there has been a previous save
    if (localStorage.getItem("game_saved"+username) == "0") {
      spaceship.energy = parseInt(localStorage.getItem("spaceship_energy"+username));
      spaceship.location[0] = parseInt(localStorage.getItem("location_x"+username));
      spaceship.location[1] = parseInt(localStorage.getItem("location_y"+username));
      spaceship.supplies = parseInt(localStorage.getItem("supplies"+username));
      spaceship.credits = parseInt(localStorage.getItem("credits"+username));
      spaceship.energyPerDistance = parseInt(localStorage.getItem("energyPerDistance"+username));
      spaceship.maxCoordX = parseInt(localStorage.getItem("maxcoordx"+username));
      spaceship.maxCoordY = parseInt(localStorage.getItem("maxcoordy"+username));
      spaceship.sensor = parseInt(localStorage.getItem("sensor"+username, spaceship.sensor));
      if (localStorage.getItem("Mortal"+username) == "false") {
        Mortal = false
      }
      else {
        Mortal = true
      }

      if (localStorage.getItem("damaged"+username) == 1) {
        spaceship.damaged = true;
      }
      else {
        spaceship.damaged = false;
      }

      // call secondary load function restore_map to load and set the map
      this.restore_map(username);
    }
    else {

      // notify the user that the game has not been saved if necessary
      alert("Game has not been saved with this profile.");
    }
  },



  // stores each and only added map components, individually
  // indices of each component are concatentenated and stored with the username
  // as a reference to identify which components to load
  store_map: function(user) {
    // generate an array that to generate a reference for stored map contents
    var gamespace_locations = [];
    gamespace_locations.push(user);

    // acquire map dimensions
    var x_dimension = parseInt(spaceship.maxCoordX);
    var y_dimension = parseInt(spaceship.maxCoordY);

    // iterate through gameSpace arrays to identify any spaces that contain space items
    for (var i = 0; i <= x_dimension; ++i) {
      for (var j = 0; j <= y_dimension; ++j) {
        // if the gameSpace does contain any celestialObjects
        if (gameSpace[i][j].celestialObjects.length != 0) {
          // iterate through the array of strings to store them according to their index
          for (var q = 0; q < gameSpace[i][j].celestialObjects.length; ++q) {
            // codify the location and relative item ordering, and store along with reference to user in key
            localStorage.setItem(String(i) + "," + String(j) + "," + String(q) + "," + user, gameSpace[i][j].celestialObjects[q]);    
            console.log("Item stored with key: " + String(i) + "," + String(j) + "," + String(q) + "," + user + " : " + localStorage.getItem(String(i) + "," + String(j) + "," + String(q) + "," + user));
            // add to the gamespace_locations array for reference. Uses # and , for subsequent parsing of index set
            gamespace_locations.push("#" + String(i) + "," + String(j) + "," + String(q));      
          }
        }
      }
    }
    // record gamespace_locations array as a reference for subsequent data loading
    localStorage.setItem(user+"_indices", gamespace_locations);
  },



  // retrieves all gameplay items previously in "celestialObjects" array member of "celestialPoint" objects
  // determines which localStorage keys to use to retrieve celestialObject strings via a string of concatenated indices
  // and the number of celestialObjects at that location
  // restores map previously saved by specific user
  restore_map: function(user) {
    // dimensions needed to fill map with correct number of celestialPoints
    var x_dimension = parseInt(spaceship.maxCoordX);
    var y_dimension = parseInt(spaceship.maxCoordY);

    // clear outdated gameSpace grid
    gameSpace = [];
    celestialMap.celestialPoints.clear();

    // fill gameSpace grid with appropriate number of celestialPoints
    for (var i = 0; i <= x_dimension; ++i) {
      var CPRow = [];
      for (var j = 0; j <= y_dimension; ++j) {
        CPRow.push(new celestialPoint([i,j]));
      }
      gameSpace.push(CPRow);
    }

    // retrieve and parse concatenated string of indices for designated user
    var gamepiece_indices_stored = localStorage.getItem(user+"_indices");
    var index_sets = gamepiece_indices_stored.split("#");
    var num_space_items_stored = index_sets.length;

    // iterate through occupied gameSpace indices (with repeats) as implied by list of indices loaded from localStorage
    for (var z = 1; z < num_space_items_stored; ++z) {
      // select string corresponding to the "celestialObject" location and its relative order within the "celestialPoint"
      var index_string = index_sets[z];

      // parse index to determine location of loaded item
      var index_string_split = index_string.split(",");
      var x_coord = parseInt(index_string_split[0]);
      var y_coord = parseInt(index_string_split[1]);

      // parse relative item number in celestialObjects array
      var array_index = parseInt(index_string_split[2]);
      var item_loaded = localStorage.getItem(String(x_coord) + "," + String(y_coord) + "," + String(array_index) + "," + user);
      console.log("Item loaded for location ["+x_coord+"]["+y_coord+"] : " + item_loaded);
      if (item_loaded === "Planet Ryzen" || item_loaded === "Planet Celeron" || item_loaded === "Planet Xeon") {
        celestialMap.celestialPoints.add(gameSpace[x_coord][y_coord]);
      }
      // add string corresponding to celestial object to celestialObject array
      gameSpace[x_coord][y_coord].celestialObjects.push(item_loaded);
    }
  setData();
  spaceship.displayCurrentCP();
  celestialMap.display();
  }
};

