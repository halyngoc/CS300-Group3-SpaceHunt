function handleSpaceStationEvent() {
  // There's a random chance that a Casinian is here
  if (Math.random() <= 0.5) {
    window.alert("Casinian is here and wanting to gamble with you, press the Gamble button below to test your luck.");

    // Display the gamble button
    document.getElementById("gambleBtn").classList.remove("hidden");
  } else {
    window.alert("Docking fee: 10 credits");
    if (spaceship.credits < 10) {
      spaceship.credits = 0;
    } else {
      spaceship.credits -= 10;
    }
  }

  setData();
}

document.getElementById("gambleBtn").onclick = function() {
  var amountTakenByUser = parseInt(window.prompt("There are 300 credits in front of you. You are free to take as much as you like, but so is the Casinian. If you take more credits than the Casinian, he will get angry and steal double the amount you've taken. Else, you keep what you've taken. How much will you take?", 0));
  var amountTakenByCasinian = Math.ceil(Math.random() * 300); // Get a random number between 1 and 300

  if (amountTakenByCasinian < amountTakenByUser) {
    window.alert("The Casinian only took " + amountTakenByCasinian + " credit(s). He is very angry. You lost " + (2*amountTakenByUser) + " credit(s).");
    if (spaceship.credits < amountTakenByUser) {
      spaceship.credits = 0;
    } else {
      spaceship.credits -= (amountTakenByUser * 2);
    }
  } else if (amountTakenByUser == 0 || isNaN(amountTakenByUser)) {
    window.alert("You refused to take anything and leave.");
  } else {
    window.alert("The Casinian took " + amountTakenByCasinian + " credit(s). You gain " + amountTakenByUser + " credit(s).");
    spaceship.credits += amountTakenByUser;
  }

  setData();

  // Hides self cause I'm assuming you only gamble once
  document.getElementById("gambleBtn").classList.add("hidden");
};
