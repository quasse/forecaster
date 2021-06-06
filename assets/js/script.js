var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var currentWeatherEl = document.querySelector("#city-condition");
var forecastEl = document.querySelector("#city-forecast");

//Handles submission for button
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

//API calls to OpenWeatherMap
var getForecast = function (cityInput) {
  var apiKey = "0f6469e694030cd77754702ac512abfd";
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput +
    "&units=imperial&appid=" +
    apiKey;

  //API call to get initial weather data
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var apiUrl2 =
        "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" +
        data.coord.lat +
        "&lon=" +
        data.coord.lon +
        "&appid=" +
        apiKey;
      //second API call to get UVI index
      fetch(apiUrl2)
        .then(function (response2) {
          return response2.json();
        })
        .then(function (data2) {
          displayWeather(data, data2);
        });
    });
};

//Function to display the weather on right side of the screen
var displayWeather = function (data, data2) {
  //Clear HTML
  currentWeatherEl.innerHTML = "";

  var headerRow = document.createElement("div");
  headerRow.classList = "row";

  //get date
  var date = formatDate(data.dt);

  //Add Header
  var cityHeaderEl = document.createElement("h3");
  cityHeaderEl.classList = "col-12 pt-2";
  var cityTitle = data.name + ", " + date;
  cityHeaderEl.textContent = cityTitle;

  //Add icon
  var weatherIconEl = document.createElement("img");
  var iconCode = data.weather[0].icon;
  var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
  weatherIconEl.setAttribute("src", iconUrl);

  //Put icon in header
  cityHeaderEl.append(weatherIconEl);

  //Put header in row
  headerRow.append(cityHeaderEl);

  //put row in weather container
  currentWeatherEl.append(headerRow);

  //Create row for details
  var infoRow = document.createElement("div");
  infoRow.classList = "row";

  //get temperature
  var temp = data.main.temp;

  //Add temperature to the infobox
  var tempEl = document.createElement("div");
  tempEl.classList = "col-12";
  tempEl.textContent = "Temp: " + data.main.temp + "°F";
  infoRow.append(tempEl);

  //get wind
  var wind = data.wind.speed;

  //Add wind to the infobox
  var windEl = document.createElement("div");
  windEl.classList = "col-12";
  windEl.textContent = "Wind: " + data.wind.speed + "MPH";
  infoRow.append(windEl);

  //get humidity
  var humidity = data.main.humidity;

  //add humidity to the infobox
  var humidityEl = document.createElement("div");
  humidityEl.classList = "col-12";
  humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
  infoRow.append(humidityEl);

  //Get UV index
  var uv = data2.current.uvi;

  //Create div to hold UV index
  var uvEl = document.createElement("div");
  uvEl.classList = "col-12";
  uvEl.textContent = "UV Index: ";

  //Create span to hold UVI number
  var uvSpan = document.createElement("span");
  uvSpan.textContent = uv;

  //Check for color of span
  if (uv < 3) {
    uvSpan.classList = "bg-success";
  } else if (uv > 3 && uv < 8) {
    uvSpan.classList = "bg-warning";
  } else {
    uvSpan.classList = "bg-danger";
  }

  //Add span to DIV and DIV to row
  uvEl.append(uvSpan);
  infoRow.append(uvEl);

  //Add all rows to infobox
  currentWeatherEl.append(infoRow);

  displayForecast(data2);
};

// Method to formate date
var formatDate = function (timeStamp) {
  var date = new Date(timeStamp * 1000);
  var dateString = date.toDateString();
  return dateString;
};

var displayForecast = function (data) {
  console.log(data);

  //Clear HTML in case search has been done before
  forecastEl.innerHTML = "";

  //Create row for content
  var forecastRow = document.createElement("div");
  forecastRow.classList = "row";

  //create col for header
  var headerEl = document.createElement("h4");
  headerEl.classList = "col-12 mt-2";
  headerEl.textContent = "5-Day Forecast:";
  forecastRow.append(headerEl);

  //Add cards for five days of weather
  for (var i = 1; i < 6; i++) {
    var date = formatDate(data.daily[i].dt);

    //create a card for each day
    var forecastCard = document.createElement("div");
    forecastCard.classList = "card col-2 bg-info m-3";

    //create a title for each card
    var forecastTitle = document.createElement("div");
    forecastTitle.classList = "card-title";
    forecastTitle.textContent = date;
    forecastCard.append(forecastTitle);

    //Add icon to card
    var forecastImg = document.createElement("img");
    var forecastIcon = data.daily[i].weather[0].icon;
    var forecastIconUrl =
      "https://openweathermap.org/img/w/" + forecastIcon + ".png";
    forecastImg.setAttribute("src", forecastIconUrl);
    forecastCard.append(forecastImg);

    forecastRow.append(forecastCard);

    //Add info
    var forecastP = document.createElement("p");
    forecastP.classList = "card-text";
    forecastP.textContent =
      "Temp: " +
      data.daily[i].temp.day +
      "°F " +
      "Wind: " +
      Math.round(data.daily[i].wind_speed) +
      " MPH " +
      "Humidity: " +
      data.daily[i].humidity +
      "%";

    forecastCard.append(forecastP);
    forecastRow.append(forecastCard);
  }

  forecastEl.append(forecastRow);
};

userFormEl.addEventListener("submit", formSubmitHandler);
