const songData = [
    {
        name: "Sad Soul Chasing a Felling",
        artist: "Alex Grohl",
        src: "alex_grohl-sad_soul_chasing_a_feeling"
    },
    {
        name: "Music Better Day",
        artist: "Penguin Music",
        src: "penguin_music-better_day"
    },
    {
        name: "Ethereal Vistas",
        artist: "Starjam",
        src: "starjam-ethereal_vistas"
    }
]

// data music
const artist = document.querySelector("#song_artist");
const music = document.querySelector("#song_name");
const cover = document.querySelector("#album_cover");
const coverArtist = document.querySelector("#album_cover span:nth-child(1)");
const coverName = document.querySelector("#album_cover span:nth-child(2)");

// buttons
const btnPlayPause = document.querySelector("#play_pause_btn");
const previous = document.querySelector("#previous_btn");
const next = document.querySelector("#next_btn");

// data audio
const audio = document.querySelector("#data_audio");
const time = document.querySelector("#song_time");
const progress = document.querySelector("#song_progress");

let songIndex = 0;

// 
window.addEventListener("load", () => {
    loadSong(songIndex);
})

const loadSong = (index) => {
    coverName.textContent = songData[index].name;
    coverArtist.textContent = songData[index].artist;
    artist.textContent = songData[index].name;
    music.textContent = songData[index].artist;
    audio.src = `music/${songData[index].src}.mp3`;
}