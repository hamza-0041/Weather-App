
const apiKey = '7a2254af94defb95f66faf72bce7368b';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const errorMessage = document.getElementById('error-message');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city!');
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        
        if (data.cod === '404') {
            errorMessage.classList.remove('hidden');
            cityName.textContent = '';
            temperature.textContent = '';
            description.textContent = '';
        } else {
            errorMessage.classList.add('hidden');
            cityName.textContent = `${data.name}, ${data.sys.country}`;
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            description.textContent = data.weather[0].description;
        }
    } catch (error) {
        errorMessage.classList.remove('hidden');
        cityName.textContent = '';
        temperature.textContent = '';
        description.textContent = '';
        console.error('Error fetching data:', error);
    }
}
