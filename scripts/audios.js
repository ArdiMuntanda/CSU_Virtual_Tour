var music = new Audio('./audios/music.mp3');
music.loop = true;
music.volume = 0.1;

var guide = new Audio("./audios/guide audio 1.mp4");
guide.loop = false; 
guide.volume = 0.6; 

export const playMusic = () => {
    music.play();
}

export const stopMusic = () => {
    music.pause();
}

export const playGuide = (src) => {
    guide.pause(); 
    guide.src = src; 

    guide.load(); 
    setTimeout(() => {
        guide.play(); 
    }, 1500); 
}

export const stopGuide = () => {
    guide.pause(); 
    guide.currentTime = 0; 
}