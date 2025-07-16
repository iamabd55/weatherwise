// Step 1: Get city from URL
const params = new URLSearchParams(window.location.search);
const city = params.get('city');

if (city) {
    document.title = `${city} - Weather Details`;
    let cityName=city.charAt(0).toUpperCase()+city.slice(1).toLowerCase()
    document.getElementById('city-name').innerText = `${cityName}`;
} else {
    document.getElementById('city-name').innerText = "City not found!";
}


const apiKey = "f10e2fcbd8ba3ea24e865d4e111e3171"
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=lahore"


async function updateCard() {
    let card = document.getElementById("weather-info");
    let city = document.getElementById("city-name").innerText.toLowerCase();


    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        let status = data.weather[0].main;
        document.querySelector(".feels-like").innerText = Math.round(data.main.feels_like) + "°C";
        document.querySelector(".humidity").innerText = Math.round(data.main.humidity) + "%";
        document.querySelector(".pressure").innerText = Math.round(data.main.pressure) + " mb";
        document.querySelector(".wind").innerText = Math.ceil(data.wind.speed * 3.6) + " km/hr";

       // After API fetch...
const sunsetTimestamp = data.sys.sunset;

function formatUnixTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Karachi' // force PST
  });
}

const sunsetTime = formatUnixTime(sunsetTimestamp);
document.querySelector('.sunset').textContent = sunsetTime;


        // If updating HTML:
        document.querySelector('.sunset').textContent = sunsetTime;

        let statusElement = card.querySelector('.status')
        statusElement.innerText = status
        document.querySelector('#celcius').innerText = Math.round(data.main.temp) + "°C";
        img = document.querySelector('.weatherImg')
        changeImg(img, status)
    } catch (error) {
        console.log(`Error getting weather for ${city}`, error);
        card.querySelector('.temp').innerText = "N/A";
    }
}

function changeImg(img, status) {
    if (status == "Clouds") {
        img.src = "../images/cloud.svg"
    }
    else if (status == "Rain") {
        img.src = "../images/rain.png"
    }
    else if (status == "Clear") {
        img.src = "../images/clear.png"
    }
}
updateCard()

let clicked = document.querySelectorAll('.weather-card');

clicked.forEach((card) => {
    card.addEventListener('click', () => {
        const city = card.querySelector('h3').innerText;
        // Redirect with city name in the URL
        window.location.href = `details.html?city=${encodeURIComponent(city)}`;
    });
});

