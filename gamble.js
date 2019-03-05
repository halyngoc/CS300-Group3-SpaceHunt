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
  if (Math.random() <= 0.5) {
    // TODO: Gamble is successful. Gain credits
  } else {
    // TODO: Gamble is unsuccessful. Lose credits
  }

  // Hides self cause I'm assuming you only gamble once
  document.getElementById("gambleBtn").classList.add("hidden");
};
