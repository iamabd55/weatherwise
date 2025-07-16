
const apiKey="f10e2fcbd8ba3ea24e865d4e111e3171"
let apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=lahore"

let searchbox=document.querySelector('.searchbar input')
const form = document.querySelector('.searchbar form');

async function updateCards() {
  let cards = document.querySelectorAll('.weather-card');
  for (let card of cards) {
    let city = card.querySelector('h3').innerText.toLowerCase();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
        let status = data.weather[0].main;
        let statusElement=card.querySelectorAll('.status')
        let statArr=Array.from(statusElement)
        statArr.forEach((stat)=>{
          stat.innerText=status
        })
      card.querySelector('.temp').innerText = Math.round(data.main.temp) + "°C";
      img=card.querySelector('.weatherImg')
      changeImg(img,status)
    } catch (error) {
      console.log(`Error getting weather for ${city}`, error);
      card.querySelector('.temp').innerText = "N/A";
    }
  }
}
function changeImg(img,status){
    if(status=="Clouds"){
        img.src="../images/cloud.svg"
    }
    else if(status=="Rain"){
        img.src="../images/rain.png"
    }
    else if(status=="Clear"){
      img.src="../images/clear.png"
    }
}
updateCards()

let clicked = document.querySelectorAll('.weather-card');

clicked.forEach((card) => {
  card.addEventListener('click', () => {
    const city = card.querySelector('h3').innerText;
    window.location.href = `details.html?city=${encodeURIComponent(city)}`;
  });
});
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const city = searchbox.value.trim().toLowerCase();

  if (city) {
    window.location.href = `details.html?city=${encodeURIComponent(city)}`;
  }
})
