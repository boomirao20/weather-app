const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const cityNameDisplay = document.getElementById('cityName');
const temperatureDisplay = document.getElementById('temperature');
const conditionDisplay = document.getElementById('condition');
const conditionIconDisplay = document.getElementById('conditionIcon');
const humidityDisplay = document.getElementById('humidity');
const windSpeedDisplay = document.getElementById('windSpeed');
const errorMessageDisplay = document.getElementById('error-message');

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    const apiKey = 'f22ea02109cb4e63991102333252203';
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`; // API URL

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            updateWeatherUI(data);
            errorMessageDisplay.textContent = "";

        } else {
            errorMessageDisplay.textContent = data.error.message;
            clearWeatherUI();
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        errorMessageDisplay.textContent = 'Failed to fetch weather data.';
        clearWeatherUI();
    }
}

function updateWeatherUI(data) {
    cityNameDisplay.textContent = `City: ${data.location.name}, ${data.location.country}`;
    temperatureDisplay.textContent = `Temperature: ${data.current.temp_c}°C`;
    conditionDisplay.textContent = `Condition: ${data.current.condition.text}`;
    conditionIconDisplay.src = data.current.condition.icon;
    humidityDisplay.textContent = `Humidity: ${data.current.humidity}%`;
    windSpeedDisplay.textContent = `Wind Speed: ${data.current.wind_kph} kph`;
}

function clearWeatherUI(){
    cityNameDisplay.textContent = "";
    temperatureDisplay.textContent = "";
    conditionDisplay.textContent = "";
    conditionIconDisplay.src = "";
    humidityDisplay.textContent = "";
    windSpeedDisplay.textContent = "";
}