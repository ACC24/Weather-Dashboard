$(document).ready(function () {

    var APIKey = "0c67129f607033bc146fe8eb7f329c4b";

    $(".card").hide();

    // Search button function //

    $("#src-btn").on("click", function (event) {
        event.preventDefault();
        $(".card").show();
        var city = $("#city-input").val().trim();
        renderButtons(city);
        searchWeather(city);
        searchForecast(city);
    });

    // Render buttons function with on click function to ajax requests for current weather, 5-days forecast, and UV Index //

    function renderButtons(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action");
        li.text(text);
        li.on("click", function () {

            var city = $(this).text();
            var history = $(this).text();

            if (city === history) {
                searchWeather(city);
                searchForecast(city);
            }
        });
       
        $(".history").append(li);
    };

    // Function using ajax request for current weather and UV Index by city//

    function searchWeather(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "Json"
        })
            .then(function (response) {
                var history = JSON.parse(window.localStorage.getItem("history")) || [];
                history.push(city);
                window.localStorage.setItem("history", JSON.stringify(history));
                $(".city").text(response.name + "  " + "(" + moment().format("L") + ")");
                $(".icon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");

                var tempF = (response.main.temp - 273.15) * 1.80 + 32;
                $(".tempF").text("Temperature: " + tempF.toFixed(2) + " °F");
                $(".humidity").text("Humidity: " + response.main.humidity + "%");
                $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
                var latitude = (response.coord.lat);
                var longitude = (response.coord.lon);

                //ajax request for UV Index //

                var queryURLUv = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
                $.ajax({
                    url: queryURLUv,
                    method: "GET",
                    dataType: "Json"
                })
                    .then(function (response) {
                        console.log(response);
                        
                        var uvIndex = $(".uv-index").text("UV Index: " + response.value);
                      
                        if (parseFloat(response.value) < 3) {
                            uvIndex.addClass("low").removeClass("moderate high");
                        } else if (parseFloat(response.value) < 6) {
                            uvIndex.addClass("moderate").removeClass("high low");
                        }
                        else {
                            uvIndex.addClass("high").removeClass("moderate low")
                        };
                    })
            })
    };

    // Function using ajax request for 5-day forecast by city//
    
    function searchForecast(city) {
        var queryURLFor = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
        $.ajax({
            url: queryURLFor,
            method: "GET",
            dataType: "Json"
        })
            .then(function (response) {

                $(".day1").text(moment().add(1, "day").format("L"));
                $(".icon1").attr("src", "http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + "@2x.png");
                var tempF1 = (response.list[4].main.temp - 273.15) * 1.80 + 32;
                $(".temp1").text("Temp: " + tempF1.toFixed(2) + " °F");
                $(".humidity1").text("Humidity: " + response.list[4].main.humidity + "%");

                $(".day2").text(moment().add(2, "day").format("L"));
                $(".icon2").attr("src", "http://openweathermap.org/img/wn/" + response.list[12].weather[0].icon + "@2x.png");
                var tempF1 = (response.list[12].main.temp - 273.15) * 1.80 + 32;
                $(".temp2").text("Temp: " + tempF1.toFixed(2) + " °F");
                $(".humidity2").text("Humidity: " + response.list[12].main.humidity + "%");

                $(".day3").text(moment().add(3, "day").format("L"));
                $(".icon3").attr("src", "http://openweathermap.org/img/wn/" + response.list[20].weather[0].icon + "@2x.png");
                var tempF1 = (response.list[20].main.temp - 273.15) * 1.80 + 32;
                $(".temp3").text("Temp: " + tempF1.toFixed(2) + " °F");
                $(".humidity3").text("Humidity: " + response.list[20].main.humidity + "%");

                $(".day4").text(moment().add(4, "day").format("L"));
                $(".icon4").attr("src", "http://openweathermap.org/img/wn/" + response.list[28].weather[0].icon + "@2x.png");
                var tempF1 = (response.list[28].main.temp - 273.15) * 1.80 + 32;
                $(".temp4").text("Temp: " + tempF1.toFixed(2) + " °F");
                $(".humidity4").text("Humidity: " + response.list[28].main.humidity + "%");

                $(".day5").text(moment().add(5, "day").format("L"));
                $(".icon5").attr("src", "http://openweathermap.org/img/wn/" + response.list[36].weather[0].icon + "@2x.png");
                var tempF1 = (response.list[36].main.temp - 273.15) * 1.80 + 32;
                $(".temp5").text("Temp: " + tempF1.toFixed(2) + " °F");
                $(".humidity5").text("Humidity: " + response.list[36].main.humidity + "%");
            })
    }
});
