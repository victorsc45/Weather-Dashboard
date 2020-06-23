$(document).ready(function () {

    // Initial array of movies
    var cities = [];
    let apiKey = "7401399c2c0acdc905b25bf3b17e2d14";
    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayCityInfo() {

        var city = $(this).attr("data-name");
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,

            method: "GET"

        }).then(function (response) {

            let lat = (response.city.coord.lat);

            let lon = (response.city.coord.lon);

            let queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: queryURL2,

                method: "GET"

            }).then(function (uvIresponse) {

                console.log("this is UV index", uvIresponse.value);

                // Log the queryURL
                console.log(queryURL);

                // Log the resulting object
                console.log(response);
                // Creating a div to hold the movie
                //  var cityDiv = $("<div class='city'>");
                console.log(response.city.name);
                // Storing the rating data
                //  var date = response.list.dt;

                console.log(response.list[0].dt_txt);
                let Date = response.list[0].dt_txt;
                console.log(moment(Date).format('MMMM Do, YYYY'));

                // Creating an element to have the rating displayed
                //  var hTwo = $("<h2>").text("(" + "Date: " + date + ")");
                console.log(response.list[0].main.temp);
                // Displaying the rating
                // cityDiv.append(hTwo);+ '&deg;F');
                console.log("humidity", response.list[0].main.humidity);
                console.log("wind", response.list[0].wind.speed);

                console.log("lat", lat);
                console.log("lon", lon);
                let color = "green";
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

            })
        })
    }

    // var ajax1 = $.ajax({ 
    //     dataType: "json",
    //     url: queryURL,
    //     async: true,
    //     success: function(response) {}                     
    //   });


    //   var ajax2 = $.ajax({ 
    //     dataType: "json",
    //     url: queryURL2,
    //     async: true,
    //     success: function(response) {}  
    //   });

    //   $.when( ajax1 , ajax2  ).done(function( a1, a2 ) {
    //      // a1 and a2 are arguments resolved for the page1 and page2 ajax requests, respectively.
    //      // Each argument is an array with the following structure: [ data, statusText, jqXHR ]
    //      var data = a1[ 0 ] + a2[ 0 ]; // a1[ 0 ] = "Whip", a2[ 0 ] = " It"
    //      if ( /Whip It/.test( data ) ) {
    //         alert( "We got what we came for!" );
    //      }
    //   });



    //http://api.openweathermap.org/v3/uvi/40.7,-74.2/current.json?appid={your-api-key}
    // Storing the release year    // Transfer content to HTML
    ////$(".city").html("<h1>" + response.name + " Weather Details</h1>");
    //$(".wind").text("Wind Speed: " + response.wind.speed);
    //$(".humidity").text("Humidity: " + response.main.humidity);
    //var pTemp = response.temp + "&units=imperial";

    // Creating an element to hold the release year
    //  var pTag1 = $("<p>").text("Temperature: " + pTemp);

    // Displaying the release year
    //   CityDiv.append(pTag1);

    // Storing the plot
    //  var plot = response.Plot;

    // Creating an element to hold the plot
    //  var pThree = $("<p>").text("Plot: " + plot);

    // Appending the plot
    //  movieDiv.append(pThree);

    // Retrieving the URL for the image
    //   var imgURL = response.Poster;

    // Creating an element to hold the image
    //   var image = $("<img>").attr("src", imgURL);

    // Appending the image
    //   movieDiv.append(image);

    // Putting the entire movie above the previous movies
    //   $("#movies-view").prepend(movieDiv);
    // getUV();



    // function getUV() {



    // Function for displaying movie data
    function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < cities.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass("city-btn");
            // Adding a data-attribute
            a.attr("data-name", cities[i]);
            // Providing the initial button text
            a.text(cities[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where a movie button is clicked
    $("#add-city").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var city = $("#city-input").val().trim();

        // Adding movie from the textbox to our array
        cities.push(city);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".city-btn", displayCityInfo);

    // Calling the renderButtons function to display the initial buttons
    renderButtons();
});