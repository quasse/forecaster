var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");

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
};

var displayForecast = function (data) {};

userFormEl.addEventListener("submit", formSubmitHandler);
