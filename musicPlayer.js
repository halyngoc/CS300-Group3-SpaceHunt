// Look up table to get the right music, the format is event: [["song name", offset]] where offset is the number of seconds to skip to get to the good parts
var eventToMusic = {
    win: [["rick roll", 0], ["trololo", 111]],
    die: [["windows xp shutdown", 0], ["my heart will go on recorder", 19], ["why are we still here", 0]],
    "bad max": [["star wars", 0]],
    freighter: [["dial up", 6]],
    "meteor storm": [["darude sandstorm", 30]],
    planet: [["russian anthem", 4]],
    casinian: [["running in the 90s", 24]]
};

function playMusic(event) {
    var musicControls = document.getElementById("musicControls");
    var musicSource = document.getElementById("musicSource");

    musicControls.classList.remove("hidden");

    var song = eventToMusic[event][Math.floor(Math.random() * eventToMusic[event].length)];

    musicSource.src = "./music/" + song[0] + ".mp3";

    musicControls.load();
    musicControls.currentTime = parseInt(song[1]);
    musicControls.play();
}
