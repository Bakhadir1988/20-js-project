const video = document.getElementById('video');
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const time = document.getElementById("timestamp");
const fullTime = document.getElementById("fulltime");

// Play & pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

// update play/stop icon 
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// updaye progree & time 
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  // get minuts
  let minut = Math.floor(video.currentTime / 60);
  if (minut < 10) {
    minut = '0' + String(minut);
  }

  // get second
  let second = Math.floor(video.currentTime % 60);
  if (second < 10) {
    second = "0" + String(second);
  }

  time.innerHTML = `${minut}:${second}`;
}

// set video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

let videoFulltime = video.duration;
fulltime.innerHTML = Math.floor(videoFulltime);

// Event listenes
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);


play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);


