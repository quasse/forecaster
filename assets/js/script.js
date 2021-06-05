var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var currentWeatherEl = document.querySelector("#city-condition");

var formSubmitHandler = function (event) {
  event.preventDefault();
  var userInput = cityInputEl.value.trim();
  if (userInput) {
    getForecast(userInput);

    //clear content from form input
    cityInputEl.value = "";
    //TODO Add method to add button of city to left side of page
  }
};

var getForecast = function (cityInput) {
  var apiKey = "0f6469e694030cd77754702ac512abfd";
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput +
    "&units=imperial&appid=" +
    apiKey;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayWeather(data);
    });
};

var displayWeather = function (data) {
  console.log(data);
  //Clear HTML
  currentWeatherEl.innerHTML = "";

  //Add Header
  var cityHeaderEl = document.createElement("h3");
  var cityTitle = data.name + " DATE ";

  cityHeaderEl.textContent = cityTitle;

  currentWeatherEl.append(cityHeaderEl);

  //Add icon
  var weatherIconEl = document.createElement("img");
  var iconCode = data.weather[0].icon;
  var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
  weatherIconEl.setAttribute("src", iconUrl);
  currentWeatherEl.append(weatherIconEl);
};

var displayForecast = function (data) {};

userFormEl.addEventListener("submit", formSubmitHandler);
