const API = "https://weather-proxy.freecodecamp.rocks/api/city/"
const displayWeather = document.querySelector('.weather-body');
const selectedCity = document.querySelector('#weather-city_container');
const loadBtn = document.querySelector('#get-weather-btn');


loadBtn.addEventListener('click', () => {
    const city = selectedCity.value;
    if (city === '') return;
    showWeather();
})

let getWeather = async (city) => {
    try {
        const weather = await fetch(`${API}${selectedCity.value.toUpperCase()}`);
        if (!weather.ok) throw new Error("Something went wrong, please try again later");
        return await weather.json();
    } catch (error) {
        alert(error);
    }
}

let showWeather = async () => {
    const weatherResult = await getWeather(selectedCity.value);
    const name = weatherResult?.name ?? "N/A";
    const main = weatherResult?.weather[0]?.main ?? "N/A";
    const weatherIcon = weatherResult?.weather[0]?.icon ?? "N/A";
    const temp = weatherResult?.main?.temp ?? "N/A";
    const feels_like = weatherResult?.main?.feels_like ?? "N/A";
    const humidity = weatherResult?.main?.humidity ?? "N/A";
    const speed = weatherResult?.wind?.speed ?? "N/A";
    const windGust = weatherResult?.wind?.gust ?? "N/A";
    const description = weatherResult?.weather[0]?.description ?? "N/A";
    const lat = weatherResult?.coord?.lat ?? "N/A";
    const lon = weatherResult?.coord?.lon ?? "N/A";
    displayWeather.innerHTML = `
           <div id="weather-container">
                <div id="weather-titles-holder">
                        <p>City: ${name}</p>
                        <p>Weather-Type: <em> ${main}</em> <img id ="weather-icon" src="${weatherIcon}" alt="weather icon" /> </p>
                </div>
                <div id="weather-info-container">
                        <div id ="weather-info-wind-temp">
                            <p id ="main-temperature">Temp: ${temp}</p>
                            <p id ="feels-like">Feels like: ${feels_like}</p>
                            <p>Wind Speed: ${speed}</p>
                            <p id="wind-gust">Wind Gust: ${windGust}</p>
                        </div>
                        <div id="weather-info-humidity">
                            <p id="humidity">Humidity: ${humidity}</p>
                            <p id="location">Located at: Lon.: ${lon},  Lat.:${lat}</p>
                        </div>
                </div>
                <div id="weather-info-description">
                        <p id="description"><span>${description}</span></p>
                </div>
           </div>`
}

window.addEventListener("DOMContentLoaded", {
    if(displayWeather) {
        displayWeather.innerHTML = '';
    }
})