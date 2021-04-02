const album = async () => {
  let albumId = new URLSearchParams(document.location.search).get("albumId");

  let response = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId
  );
  let data = await response.json();
  console.log(data);
  getAlbumDatas(data);
};
const getAlbumDatas = (albumInfo) => {
  const trackList = document.getElementById("tracklist");

  albumInfo.tracks.data.forEach((track) => {
    trackList.innerHTML += song(track);
  });
  const ImgContainer = document.getElementById("AlbumInfo");
  ImgContainer.innerHTML = albumArt(albumInfo);
};
const albumArt = (album) => {
  return `
<div class="album-container text-center">
            <img class="album-cover" src=${album.cover_medium} alt = "cover image of ${album.label}"/>
            <h1 class="album-title mb-0">
              ${album.title}
            </h1>
            <p class="artist-name" style="color: #777777">${album.artist.name}</p>
            <button
              type="button"
              class="btn btn-success rounded-pill px-5 py-1"
            >
              PLAY
            </button>
            <div class="album-info mb-5" style="color: #777777">
              <small class="release-year" style="color: #777777">${album.release_date}</small>
              <small>●</small>
              <small class="number-of-tracks">${album.nb_tracks}Songs</small>
            </div>
            <div class="misc-icons">
              <a class="heart-icon mx-1" href="#"
                ><i class="far fa-heart"></i
              ></a>
              <a class="ellipsis-icon mx-1" href="#"
                ><i class="fas fa-ellipsis-h"></i
              ></a>
            </div>
          </div>
`;
};
const song = (song) => {
  return `
  <table class="table table-borderless">
  <tbody>
    <tr class="tacklist-item">
      <th scope="row"><i class="fas fa-music"></i></th>
      <td>
        <div class="d-inline-block">
          <span class="track-title"
            >${song.title}</span
          >
          <br />
          
        </div>
      </td>
      <td class="text-right">${song.duration}</td>
    </tr>
    </tbody>
    </table>
        `;
};
window.onload = () => {
  album();
};
