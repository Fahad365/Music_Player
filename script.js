const img = document.querySelector("img");
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");
const music = document.querySelector("audio");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#main");
const nextBtn = document.querySelector("#next");
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const runingTime = document.querySelector("#current-time");
const totalDuration = document.querySelector("#total-duration");

// Music array
const songs = [
  {
    name: "Bad Liar", //using common part as "name": to access song & cover item.
    displayName: "Bad Liar",
    artist: "Imagine dragons",
  },
  {
    name: "Believer",
    displayName: "Believer",
    artist: "Imagine dragons",
  },
  {
    name: "Numb",
    displayName: "Numb",
    artist: "Linking Park",
  },
  {
    name: "Perfect",
    displayName: "Perfect",
    artist: "Ed sheeran",
  },
  {
    name: "Thunder",
    displayName: "Thunder",
    artist: "Imagine dragons",
  },
];

let isPlaying = false;

// play function
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-circle-play", "fa-circle-pause");
  music.play();
}

// Pause function
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-circle-pause", "fa-circle-play");
  music.pause();
}

// Play or Pause event Leastener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Updating DOM

function loadSongs(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `./music/${song.name}.mp3`;
  img.src = `./img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song Functionality
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSongs(songs[songIndex]);
  playSong();
}
// Next Song Functionality
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSongs(songs[songIndex]);
  playSong();
}

loadSongs(songs[songIndex]);

// update Progress Bar functionality
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement; //Distructing from event

    //    Update Progress Bar Width
    const progressPercentWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercentWidth}%`;

    // Calculate duration minute for display
    const durationInMinutes = Math.floor(duration / 60);
    // console.log("min", durationInMinutes);
    let durationInSeconds = Math.floor(duration % 60);
    if (durationInSeconds < 10) {
      durationInSeconds = `0${durationInSeconds}`;
    }
    // console.log("sec", durationInSeconds);

    // Avoid NaN when click next btn
    if (durationInSeconds) {
      totalDuration.textContent = `${durationInMinutes}:${durationInSeconds}`;
    }

    // Calculate current time in minute and seconds for display
    const currentMinutes = Math.floor(currentTime / 60);
    // console.log("min", currentMinutes);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    // console.log("sec", currentSeconds);
    runingTime.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  console.log((clickX / width) * duration); //to find out current duration in sec
  music.currentTime = (clickX / width) * duration;
}

// Event Listener
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
music.addEventListener("ended", nextSong);
