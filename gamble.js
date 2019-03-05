function handleMoveEvent(x, y) {
  document.getElementById("gambleBtn").classList.add("hidden");
  if (gameSpace[x][y].celestialObjects.includes("space station")) {
    handleSpaceStationEvent();
  }
}

function handleSpaceStationEvent() {
  // There's a random chance that a Casinian is here
  if (Math.random() <= 0.5) {
    console.log("Casinian is here");

    // Display the gamble button
    document.getElementById("gambleBtn").classList.remove("hidden");
  } else {
    // TODO: Charge a docking fee
  }
}

document.getElementById("gambleBtn").onclick = function() {
  var amountTakenByUser = parseInt(window.prompt("There are 300 credits in front of you. You are free to take as much as you like, but so is the Casinian. If you take more credits than the Casinian, he will get angry and steal double the amount you've taken. Else, you keep what you've taken. How much will you take?"));
  var amountTakenByCasinian = Math.ceil(Math.random() * 300); // Get a random number between 1 and 300

  if (amountTakenByCasinian < amountTakenByUser) {
    window.alert("The Casinian only took " + amountTakenByCasinian + " credit(s). He is very angry. You lost " + amountTakenByUser + " credit(s).");
    if (spaceship.credits < amountTakenByUser) {
      spaceship.credits = 0;
    } else {
      spaceship.credits -= amountTakenByUser;
    }
  } else if (amountTakenByUser == 0) {
    window.alert("You refused to take anything and leave.");
  } else {
    window.alert("The Casinian took " + amountTakenByCasinian + " credit(s). You gain " + amountTakenByUser + " credit(s).")
    spaceship.credits += amountTakenByUser;
  }

  setData();

  // Hides self cause I'm assuming you only gamble once
  document.getElementById("gambleBtn").classList.add("hidden");
};
