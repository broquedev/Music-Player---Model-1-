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

const controls = document.querySelector("#controls_btn")
const background = document.querySelector("#background");

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
const random = document.querySelector("#random_btn");
const repeat = document.querySelector("#repeat_btn");
const slider = document.querySelector("#volume input");

// data audio
const audio = document.querySelector("#data_audio");
const time = document.querySelector("#song_time");
const musicTime = document.querySelector("#music_time");
const progress = document.querySelector("#song_progress");

let trackIndex = 0;
let isRandom = false;
 
window.addEventListener("load", () => {
    loadSong(trackIndex);
    randomBackgroundColor();
    setVolume();
})

const loadSong = (index) => {
    coverName.textContent = songData[index].name;
    coverArtist.textContent = songData[index].artist;
    artist.textContent = songData[index].name;
    music.textContent = songData[index].artist;
    audio.src = `music/${songData[index].src}.mp3`;
}

// Funções de play e pause
const playSong = () => {
    controls.classList.add("pause");
    btnPlayPause.firstElementChild.className = "fa-solid fa-pause";
    audio.play();
}

const pauseSong = () => {
    controls.classList.remove("pause");
    btnPlayPause.firstElementChild.className = "fa-solid fa-play";
    audio.pause();
}

btnPlayPause.addEventListener("click", () => {
    if(controls.classList.contains("pause")) {
        pauseSong()
    } else {
        playSong()
    }
})

// Funções dos botões para troca de faixa
const previousSong = () => {    
    trackIndex--;
    if(trackIndex < 0) {
        trackIndex = songData.length - 1;
    }
    loadSong(trackIndex);
    playSong();
    randomBackgroundColor();
}

const nextSong = () => {       
    if(trackIndex < songData.length - 1 && isRandom === false) {
        trackIndex += 1;
    } else if (trackIndex < songData.length - 1 && isRandom === true) {
        let randomTrack = Math.floor(Math.random() * songData.length);
        trackIndex = randomTrack;
    } else {
        trackIndex = 0;
    }

    loadSong(trackIndex);
    playSong();
    randomBackgroundColor();
}

const randomTrack = () => {
    isRandom ? pauseRandom() : playRandom();  
}

const playRandom = () => {
    isRandom = true;
    random.classList.add("active")
}

const pauseRandom = () => {
    isRandom = false;
    random.classList.remove("active");
}

const randomBackgroundColor = () => {
    let hsl = `hsl(${Math.floor(Math.random() * 360)}, 65%, 65%)`;  
    let bg = `linear-gradient(45deg, hsl(0, 0%, 19%) 40%, ${hsl} 140%)`;        
    background.style.background = bg;    
}

const repeatTrack = () => {
    let currentTrack = trackIndex;
}

previous.addEventListener("click", previousSong)
next.addEventListener("click", nextSong);
random.addEventListener("click", randomTrack);

// Barra de progresso
// Tempo da música em minutos 
audio.addEventListener("timeupdate", (e) => {
    const duration = e.target.duration;
    let currentTime = e.target.currentTime;
    
    let currentTimeOfTheSong = musicTime.children[0]; 
    let songDuration = musicTime.children[1];
    
    let timeDuration = (currentTime / duration) * 100; 
    progress.style.width = `${timeDuration}%`;
        
    audio.addEventListener("loadeddata", () => { 
        let audioDuration = audio.duration;

        let totalMinutes = Math.floor(audioDuration / 60);
        let totalSeconds = Math.floor(audioDuration % 60);
        
        if(totalSeconds < 10) {
            totalSeconds = `0${totalSeconds}`
        }      

        songDuration.textContent = `${totalMinutes}:${totalSeconds}`;        
    })

    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
        
    if(currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`
    }      

    currentTimeOfTheSong.textContent = `${currentMinutes}:${currentSeconds}`;
  
})

time.addEventListener("click", (e) => {
    let progressWidth = time.clientWidth;
    let clickOffsetX = e.offsetX;
    let songDuration = audio.duration;
    audio.currentTime = (clickOffsetX / progressWidth) * songDuration;
    playSong();
})

audio.addEventListener("ended", nextSong);
