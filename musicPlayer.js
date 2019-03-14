var eventToMusic = {
    win: ["rick roll", "trololo"]
};

function playMusic(event) {
    var musicControls = document.getElementById("musicControls");
    var musicSource = document.getElementById("musicSource");

    musicControls.classList.remove("hidden");

    musicSource.src = "./music/" + eventToMusic[event][Math.floor(Math.random() * eventToMusic[event].length)] + ".mp3";

    musicControls.load();
    musicControls.play();
}
