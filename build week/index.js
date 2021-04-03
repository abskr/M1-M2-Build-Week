const history = localStorage.getItem("query");
let query = history ? history : "daft punk";
const audio = document.getElementsByTagName("audio")[0];
const setPlayerSong = (song) => {
  audio.src = song.preview;
  audio.play();
};
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
    <span style="--i:1;"><a href="albumpage.html?albumId=${music.album.id}"><img class="img-fluid mx-auto mx-md-0"  src=${music.album.cover_medium}>
    
    </span></a>

    <h6>${music.title_short}</h6>
  </div>
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
