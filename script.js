$(document).ready(function () {

    // hide DOM until api calls are cast into elements of HTML

    $(".media").hide();
    $(".card-deck").hide();

    //variable api Key

    let apiKey = "7401399c2c0acdc905b25bf3b17e2d14";

    // array to add cities to, to be grabbed from after search

    var cities = JSON.parse(localStorage.getItem("cities")) || [];

    // calls function to loop the cities array and pass to create buttons and display weather information

    grabCity();

    function grabCity() {

        let city = cities[cities.length - 1];

        renderButtons(city);

    }

    // display city weather Info function re-renders the HTML to display the appropriate content

    function searchCityInfo(city) {

        //   query url for the weather api using city name and api key and conversion of temperature units

        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";

        // Creating an AJAX call for specific city's weather

        $.ajax({

            url: queryURL,

            method: "GET",

            // error function to validate user input to textbox

            error: function () {
                alert("city not found enter another city");
                deleteBtn();
            }

        }).then(function (response) {



            // fetch api data and convert to variables
            let cityName = response.city.name;
            let Date = response.list[0].dt_txt;
            let today = moment(Date).format('MMMM Do, YYYY');
            let temperature = response.list[0].main.temp;
            let humidity = response.list[0].main.humidity;
            let windSpeed = response.list[0].wind.speed


            // Transfer content to HTML and append to appropriate DOM element

            let cityH2 = $("<h2 class='cityCl'>").text(cityName);
            let citeDate = $("<p class='datecl'>").text(today);
            let weatherIcon = $("<img src='https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png'>");
            let pOne = $("<p>").text("temperature:  " + temperature + " °F");
            let pTwo = $("<p>").text("Humidity:  " + humidity + " %");
            let pThree = $("<p>").text("Wind Speed:  " + windSpeed + " MPH");

            // show media content that was hidden for a clean looking UI

            $(".media").show();

            //empty media body to replace with new appends

            $(".media-body").empty();
            $(".media-body").append(cityH2, citeDate, weatherIcon, pOne, pTwo, pThree);

            //for loop to load card info
            // loop for the card information forecast 5 days

            for (let i = 1; i < response.list.length; i += 8) {
                let day = response.list[i].dt_txt;
                let newDay = moment(day).format('MMMM Do, YYYY');
                let dayh5 = $("<h5>").text(newDay).css("color", "white");
                dayh5.addClass("card-text");
                let iconWN = $("<img src='https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png'>");
                let p1 = $("<p>").text("Temperature: " + response.list[i].main.temp + "°F").css("color", "white");
                p1.addClass("card-text");
                let p2 = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%").css("color", "white");
                p2.addClass("card-text");

                // show the deck and empty previous deck to append new city forecast

                $(".card-deck").show();
                $(".card" + [i]).empty()
                $(".card" + [i]).append(dayh5, iconWN, p1, p2);
            }

            // variables of latitude and longitude to pass to api query for UV index data

            let lat = (response.city.coord.lat);
            let lon = (response.city.coord.lon);

            // call UV index function and pass args lat and lon

            uvISearch(lat, lon);

        })
    }





    // function to call open weather api and get the uv index info per city

    function uvISearch(lat, lon) {

        // query the api using lat and lon for uv index value

        let queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

        //query the api for UV index value

        $.ajax({

            url: queryURL2,

            method: "GET"


        }).then(function (uvIresponse) {

            //fetch the uv index value from api and if condition statements to determine the severity of uv index by color

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

            // clear the button for new city appending

            $(".btn-uv").empty();

            // append new disabled button with uv index data inside it

            $(".media-body").append(pFour, buttonUV);


        })
    }

    // Function to delete bad input for city name errors

    function deleteBtn() {

        cities.splice(cities.length - 1);
    }

    // Function for displaying city button 

    function renderButtons(city) {

        // this is necessary otherwise you will have repeat buttons

        $(".buttons-view").empty();


        // Looping through the array of cities

        for (var i = 0; i < cities.length; i++) {

            // Then dynamicaly generating buttons for each city

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

        // This line consumes the input from the textbox value

        let city = $("#city-input").val().trim();

        //push new city into the array

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


        // calling renderButtons and search to display DOM elements with city weather information
        renderButtons(city);
        searchCityInfo(city);

    });

    // click event listener to all elements with a class of "city-btn"

    $(document).on("click", ".city-btn", function () {

        //pull the data attribute of the city button that was clicked and send it to the query functions to display weather info

        let city = $(this).attr("data-name");
        searchCityInfo(city);
    })
});