$(document).ready(function () {

    // Initial array of cities

    let apiKey = "7401399c2c0acdc905b25bf3b17e2d14";
    // array to add cities to, to be grabbed from after search
    var cities = JSON.parse(localStorage.getItem("cities")) || [];
    grabCity();
    function grabCity() {


        let city = cities[cities.length - 1];
        renderButtons(city);
        searchCityInfo(city);
    }
    // display city weather Info function re-renders the HTML to display the appropriate content
    function searchCityInfo(city) {


        // let city = $(this).attr("data-name");

        let queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";


        // Creating an AJAX call for specific city's weather
        $.ajax({
            url: queryURL,

            method: "GET"

        }).then(function (response) {
            let cityName = response.city.name;
            let Date = response.list[0].dt_txt;
            let today = moment(Date).format('MMMM Do, YYYY');
            let temperature = response.list[0].main.temp;
            let humidity = response.list[0].main.humidity;
            let windSpeed = response.list[0].wind.speed

            // console.log("this is UV index", uvIresponse.value);
            // console.log(queryURL);
            // console.log(response);
            // console.log(response.city.name);
            // console.log(moment(Date).format('MMMM Do, YYYY'));
            // console.log(response.list[0].dt_txt);
            // console.log(response.list[0].main.temp);
            // console.log("humidity", response.list[0].main.humidity);
            // console.log("wind", response.list[0].wind.speed);
            // console.log("lat", lat);
            // console.log("lon", lon);
            // console.log("icon #", response.list[0].weather[0].icon);

            // Transfer content to HTML

            let cityH2 = $("<h2 class='cityCl'>").text(cityName);
            let citeDate = $("<p class='datecl'>").text(today);
            let weatherIcon = $("<img src='http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png'>");
            let pOne = $("<p>").text("temperature:  " + temperature + " °F");
            let pTwo = $("<p>").text("Humidity:  " + humidity + " %");
            let pThree = $("<p>").text("Wind Speed:  " + windSpeed + " MPH");
            $(".media-body").empty();
            $(".media-body").append(cityH2, citeDate, weatherIcon, pOne, pTwo, pThree);

            //for loop to load card info
            // loop for the card information forecast 5 days
            for (let i = 1; i < response.list.length; i += 8) {
                let day = response.list[i].dt_txt;
                let newDay = moment(day).format('MMMM Do, YYYY');
                let dayh5 = $("<h5>").text(newDay).css("color", "white");
                dayh5.addClass("card-text");
                let iconWN = $("<img src='http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png'>");
                let p1 = $("<p>").text("Temperature: " + response.list[i].main.temp + "°F").css("color", "white");
                p1.addClass("card-text");
                let p2 = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%").css("color", "white");
                p2.addClass("card-text");
                $(".card" + [i]).empty()
                $(".card" + [i]).append(dayh5, iconWN, p1, p2);
            }
            let lat = (response.city.coord.lat);
            let lon = (response.city.coord.lon);
            uvISearch(lat, lon);
        })
    }
    function uvISearch(lat, lon) {
        let queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;


        //query the api for UV index value
        $.ajax({
            url: queryURL2,

            method: "GET"

        }).then(function (uvIresponse) {


            let UVindex = uvIresponse.value;
            if (UVindex > 7) {
                color = "red";
            }
            else if (UVindex > 5) {
                color = "orange";
            } else if (UVindex > 2) {
                color = "yellow"
            } else {
                color = "green"
            }
            let pFour = $("<p>").text("UV Index: ");
            let buttonUV = $("<button>");
            buttonUV.addClass("btn btn-uv").css("background-color", color).text(UVindex);

            $(".btn-uv").empty();

            $(".media-body").append(pFour, buttonUV);


        })
    }



    // Function for displaying city button 
    function renderButtons(city) {

        // this is necessary otherwise you will have repeat buttons
        $(".buttons-view").empty();


        // Looping through the array of cities
        for (var i = 0; i < cities.length; i++) {

            // Then dynamicaly generating buttons for each city
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of city-btn to our button
            a.addClass("city-btn btn btn-default").css("display", "block");
            // Adding a data-attribute
            a.attr("data-name", cities[i]);
            // Providing the initial button text
            a.text(cities[i]);
            // Adding the button to the buttons-view div
            $(".buttons-view").append(a);
        }
    }

    // This function handles events where a city button is clicked
    $("#add-city").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        let city = $("#city-input").val().trim();
        //push new city into the Array
        var containsCity = false;
        if (cities != null) {
            $(cities).each(function (w) {
                if (cities[w] === city) {
                    containsCity = true;
                }
            });
        }

        if (containsCity === false) {
            cities.push(city);
        }

        // add to local storage
        localStorage.setItem("cities", JSON.stringify(cities));


        // Calling renderButtons which handles the processing of our cities array
        renderButtons(city);
        searchCityInfo(city);

    });

    // Adding a click event listener to all elements with a class of "city-btn"
    $(document).on("click", ".city-btn", function () {
        let city = $(this).attr("data-name");


        // let city = $(this).attr("data-name");

        // Calling the renderButtons function to display the initial buttons
        //  renderButtons();

        searchCityInfo(city);
    })
});