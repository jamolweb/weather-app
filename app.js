document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const cityInput = document.getElementById("cityInput");
  const darkModeToggle = document.getElementById("darkModeToggle");

  searchBtn.addEventListener("click", searchWeather);
  cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchWeather();
    }
  });

  darkModeToggle.addEventListener("change", toggleDarkMode);

  // Load initial weather data
  getWeather();
});

function searchWeather() {
  const cityInput = document.getElementById("cityInput");
  const cityName = cityInput.value.trim();

  if (cityName !== "") {
    getWeather(cityName);
  } else {
    alert("Please enter a city name.");
  }
}

function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=98740f4ebc0d63bc0f8ba70090e5a091`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayWeather(data, city))
    .catch((error) => console.error("Error fetching weather data:", error));
}

function displayWeather(data, city) {
    const cityElement = document.getElementById('city');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const windElement = document.getElementById('wind');
    const cloudsElement = document.getElementById('clouds');
    const iconElement = document.getElementById('icon');

    if (data.cod === '404') {
        // City not found
        cityElement.textContent = `City not found: ${city}`;
        temperatureElement.textContent = '';
        descriptionElement.textContent = '';
        windElement.textContent = '';
        cloudsElement.textContent = '';
        iconElement.innerHTML = `<img src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x998-yjzeuy4v.png" alt="Not Found Icon">`;
    } else {
        // City found, display weather information
        cityElement.textContent = `Weather in ${city}`;
        temperatureElement.textContent = `${data.main.temp}°C`;
        descriptionElement.textContent = data.weather[0].description;
        windElement.textContent = `Wind: ${data.wind.speed} m/s`;
        cloudsElement.textContent = `Clouds: ${data.clouds.all}%`;

        const iconUrl = data.weather[0].icon
            ? `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTruIUuHqZP9pIkCgeQSz0yCakJkqkS5V_8NnGJni4DBhskQNWa-Ur2hb6Lab4CWrVHlJM&usqp=CAU";

        iconElement.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
    }
}

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
}