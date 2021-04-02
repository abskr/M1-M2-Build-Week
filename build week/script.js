const history = localStorage.getItem("query");
let query = history ? history : "daft punk";

const handleSearchQuery = (e) => {
  // console.log(e.target.value);
  query = e.target.value;
  localStorage.setItem("query", e.target.value);
  // console.log(query);
};

const search = async (q) => {
  // console.log(q);
  // console.log(
  //   "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + q
  // );
  let response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + q
  );
  let body = await response.json();
  let data = body.data;
  console.log(data);
  getDatas(data);
};

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => search(query));

const getDatas = (musics) => {
  console.log(musics);
  const row = document.getElementById("card");
  row.innerHTML = "";
  musics.forEach((music) => {
    row.innerHTML += getCardInfo(music);
  });
};
const getCardInfo = (music) => {
  return `
  <div class="box d-flex flex-column col-sm-12 col-md-4 col-lg-2">
    <span style="--i:1;"><a href="albumpage.html?albumId=${music.album.id}"><img class="img-fluid mx-auto mx-md-0" src=${music.album.cover_medium}>
    </span>
    <h6>${music.title_short}</h6>
  </div></a>
  `;
};

window.onload = () => {
  search(query);
  const handleInput = document.getElementById("SearchField");
  handleInput.addEventListener("keyup", handleSearchQuery);
};
const searchbtn = () => {
  const searched = document.getElementById("searched");
  const ex = document.getElementById("ex");
  ex.style.display = "block";
  searched.addEventListener("click", searchbtn);
};
let previous = document.querySelector("#prev");
let play = document.querySelector("#playBtn");
let pause = document.querySelector("#pauseBtn");
let next = document.querySelector("#next");
let songImage = document.querySelector("#song-image");
let songTitle = document.querySelector("#song-title");
let artistName = document.querySelector("#artist-name");
let currentDuration = document.querySelector("#currentDuration");
let durationSlider = document.querySelector("#durationSlider");
let maxDuration = document.querySelector("#maxDuration");
let volumeIcon = document.querySelector("#volumeIcon");
let volumeMuteIcon = document.querySelector("#volumeMuteIcon");
let volumeSlider = document.querySelector("#volumeSlider");

let timer;

let songId = 0;
let songPlaying = false;
let track = document.createElement("audio");

let songs = [
  {
    name: "First Song",
    path: "songs/song1.mp3",
    img: "./navImages/image11.jpeg",
    singer: "First Singer",
  },
  {
    name: "Second Song",
    path: "songs/song2.mp3",
    img: "./navImages/image12.jpeg",
    singer: "Second Singer",
  },
  {
    name: "Third Song",
    path: "songs/song3.mp3",
    img: "./navImages/image13.jpeg",
    singer: "Third Singer",
  },
  {
    name: "Fourth Soong",
    path: "songs/song4.mp3",
    img: "./navImages/image14.jpeg",
    singer: "Fourth Singer",
  },
  {
    name: "Fifth Song",
    path: "songs/song5.mp3",
    img: "./navImages/image15.jpeg",
    singer: "Fifth Singer",
  },
];

function loadTrack(songId) {
  resetValues();
  setInterval(range_slider, 1000);
  track.src = songs[songId].path;
  songTitle.innerHTML = songs[songId].name;
  artistName.innerHTML = songs[songId].singer;
  songImage.src = songs[songId].img;

  track.load();

  if (songPlaying) {
    playSong();
  }
}
loadTrack(songId);

function muteVolume() {
  if (track.volume === 0) {
    track.volume = volumeSlider.value / 100;
    volumeMuteIcon.style.display = "none";
    volumeIcon.style.display = "inline";
  } else {
    track.volume = 0;
    volumeIcon.style.display = "none";
    volumeMuteIcon.style.display = "inline";
  }
}

function playSong() {
  maxDuration.textContent = "00:00";
  play.style.display = "none";
  pause.style.display = "inline";
  songPlaying = true;

  track.play();
  maxDuration.textContent = formatTime(track.duration);
}

function pauseSong() {
  play.style.display = "inline";
  pause.style.display = "none";
  if (songPlaying) {
    track.pause();
    songPlaying = false;
  }
}

function nextSong() {
  if (songId < songs.length - 1) {
    songId++;
  } else {
    songId = 0;
  }

  loadTrack(songId);
}

function previousSong() {
  if (songId > 0) {
    songId--;
  } else {
    songId = songs.length - 1;
  }
  loadTrack(songId);
}

function changeVolume() {
  track.volume = volumeSlider.value / 100;
}

function changeDuration() {
  track.currentTime = track.duration * (durationSlider.value / 100);
  currentDuration.innerHTML = formatTime(track.currentTime);
}
function range_slider() {
  let position = 0;

  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    durationSlider.value = position;
    currentDuration.textContent = formatTime(track.currentTime);
  }

  if (track.ended) {
    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";
  }
}

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

function resetValues() {
  currentDuration.textContent = "00:00";
  maxDuration.textContent = "00:00";
  durationSlider.value = 0;
}
