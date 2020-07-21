$(document).ready(function () {

    // var cities = [];
    var APIKey = "0c67129f607033bc146fe8eb7f329c4b";

    $("#src-btn").on("click", function (event) {
        event.preventDefault();
        var city = $("#city-input").val().trim();
        // cities.push(city);
        // console.log(cities);
        renderButtons(city);
        searchWeather(city);
        searchForecast(city);
    });

    function renderButtons(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".history").append(li);

    };

    function searchWeather(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "Json"
        })
            .then(function (response) {
                window.localStorage.setItem("history", city);
                $(".city").html("<h3>" + response.name + "</h3>");
                var tempF = (response.main.temp - 273.15) * 1.80 + 32;
                $(".tempF").text("Temperature: " + tempF.toFixed(2) + " °F");
                $(".humidity").text("Humidity: " + response.main.humidity + "%");
                $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
                var latitude = (response.coord.lat);
                var longitude = (response.coord.lon);

                var queryURLUv = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
                $.ajax({
                    url: queryURLUv,
                    method: "GET",
                    dataType: "Json"
                })
                    .then(function (response) {
                        $(".uv-index").text("UV Index: " + response.value);
                    })

            })

    };

    function searchForecast(city) {
        var queryURLFor = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
        $.ajax({
            url: queryURLFor,
            method: "GET",
            dataType: "Json"
        })

            .then(function (response) {
                console.log(response);

                $(".day1").text(response.list[4].dt_txt);
                var tempF1 = (response.list[4].main.temp - 273.15) * 1.80 + 32;
                $(".temp1").text("Temp: " + tempF1.toFixed(2) + " °F");
                $(".humidity1").text("Humidity: " + response.list[4].main.humidity + "%");

                $(".day2").text(response.list[12].dt_txt);
                var tempF1 = (response.list[12].main.temp - 273.15) * 1.80 + 32;
                $(".temp2").text("Temp: " + tempF1.toFixed(2) + " °F");
                $(".humidity2").text("Humidity: " + response.list[12].main.humidity + "%");

                $(".day3").text(response.list[20].dt_txt);
                var tempF1 = (response.list[20].main.temp - 273.15) * 1.80 + 32;
                $(".temp3").text("Temp: " + tempF1.toFixed(2) + " °F");
                $(".humidity3").text("Humidity: " + response.list[20].main.humidity + "%");

                $(".day4").text(response.list[28].dt_txt);
                var tempF1 = (response.list[28].main.temp - 273.15) * 1.80 + 32;
                $(".temp4").text("Temp: " + tempF1.toFixed(2) + " °F");
                $(".humidity4").text("Humidity: " + response.list[28].main.humidity + "%");

                $(".day5").text(response.list[36].dt_txt);
                var tempF1 = (response.list[36].main.temp - 273.15) * 1.80 + 32;
                $(".temp5").text("Temp: " + tempF1.toFixed(2) + " °F");
                $(".humidity5").text("Humidity: " + response.list[36].main.humidity + "%");
            })
    }
});

 // $(".btn-group").empty();
        // for (var i = 0; i < cities.length; i++) {
        //     var addBtn = $("<button>");
        //     // console.log(addBtn);
        //     addBtn.addClass("city").attr("data-name", cities[i]).text(cities[i]);
        //     // var btnList = $("<li>");
        //     $(".btn-group").append(addBtn);
        // }