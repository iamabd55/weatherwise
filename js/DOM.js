let background = document.querySelector('.bg-layer');

function genRandom() {
  let randomNum = Math.floor(Math.random() * 5) + 1;

  // Fade out
  background.style.opacity = 0;

  // After fade out, change image and fade in
  setTimeout(() => {
    background.style.backgroundImage = `url('../images/bck${randomNum}.jpg')`;
    background.style.opacity = 1;
  }, 1000); // Matches transition time (1s)
}

genRandom(); // initial image

setInterval(genRandom, 8000); // every 5 seconds

let time=document.querySelector('.time');

(function getTime(){
  setInterval(()=>{
    let t=new Date();
    time.innerText=t.toLocaleTimeString()
  },1000)
})();

