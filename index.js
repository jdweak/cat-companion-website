var currentWord = "";
var videoState = 0;
var videoIteration = 0;
var moveIteration = 0;
var moveTopPosition = 76;
var timer;
const d = new Date();
let time = d.getTime();
console.log("load: ", time);

var movingText = document.getElementById('movingText');
var idleVideo = document.getElementById('idleVideo');
var eatVideo = document.getElementById('eatVideo');

eatVideo.addEventListener('ended', playVideo, false);
idleVideo.addEventListener('ended', playVideo, false);
document.getElementById("button1").onclick = updateWordState;
idleVideo.play();

function updateWordState(){
  if(videoState != 1){
    videoState = 1;
    movingText.style.top = 0;
    currentWord = document.getElementById('word').value;
    movingText.innerHTML = currentWord;
    console.log(movingText.style.top);
  }
}

function moveWord(){
  console.log('inside move loop: ' + moveIteration);
  moveIteration = moveIteration + 1;
  if(moveIteration == 2){
    movingText.hidden = false;
  }
  if(moveIteration < 77){
    var current = getComputedStyle(movingText).top;
    movingText.style.top = 'calc(' + current + ' + 1%)';
  }
  if(moveIteration == 700){
    clearInterval(timer);
    moveIteration = 0;
    movingText.hidden = true;
    videoState = 0;
  }
}

function playVideo() {
  eatVideo.hidden = true;
  console.log('video iteration: ', videoIteration);
  videoIteration = videoIteration + 1;
  if (videoState == 0) {
    idleVideo.play();
  } else {
    console.log('other vid');
    eatVideo.hidden = false;
    eatVideo.play();
    timer = setInterval(moveWord, 6);
  }
}

