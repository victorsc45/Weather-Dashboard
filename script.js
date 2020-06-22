// Initial array of movies
var cities = ["Raleigh"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayCityInfo() {

    var city = $(this).attr("data-name");
    var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=5d6e81d650809ae177d0c068370e46a8";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // Creating a div to hold the movie
        var cityDiv = $("<div class='city'>");

        // Storing the rating data
        var date = response.list.dt;

        // Creating an element to have the rating displayed
        var hTwo = $("<h2>").text("(" + "Date: " + date + ")");

        // Displaying the rating
        cityDiv.append(hTwo);

        // Storing the release year
        var pTemp = response.temp + "&units=imperial";

        // Creating an element to hold the release year
        var pTag1 = $("<p>").text("Temperature: " + pTemp);

        // Displaying the release year
        CityDiv.append(pTag1);

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
    });

}

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
    movies.push(city);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".city-btn", displayCityInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();