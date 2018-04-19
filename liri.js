var fs = require('fs'); 
var request = require('request');
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

var command = process.argv[2];
var searchValue = "";

for (var i = 3; i < process.argv.length; i++) {
    searchValue += process.argv[i] + " ";
};

function errorFunction(respError) {
    if (respError) {
        return console.log("Error occured: ", respError);
     }
};

//TWITTER//

function getTweets() {

    var client = new Twitter(keys.twitter); 
    var params = {
        screen_name: 'Bootcamp_Tim',
        count: 20
        };

    client.get('statuses/user_timeline', params, function(respError, tweets, response) {

        errorFunction();

        for (i = 0; i < tweets.length; i++) {
            console.log(i + 1 + ". Tweet: ", tweets[i].text);
         };
    });
};

//SPOTIFY//
function searchSong(searchValue) {

    if (searchValue == "") {
        searchValue = "The Sign Ace of Base";
    }

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: searchValue }, function(respError, response) {

        errorFunction();

        var songResp = response.tracks.items;

        for (var i = 0; i < songResp.length; i++) {
            console.log(("Artist: " + songResp[i].artists[0].name));
            console.log(("Song title: " + songResp[i].name));
            console.log(("Album name: " + songResp[i].album.name));

        }
     })
};

//OMDB//
function searchMovie(searchValue) {

    if (searchValue == "") {
        searchValue = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + searchValue.trim() + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(respError, response, body) {

            movieBody = JSON.parse(body);

            console.log("Movie Title: " + movieBody.Title);
            console.log("Year: " + movieBody.Year);
            console.log("IMDB rating: " + movieBody.imdbRating);
            console.log("Plot: " + movieBody.Plot);
            console.log("Actors: " + movieBody.Actors);
           
    });
};



//COMMAND//
switch (command) {
    case "my-tweets":
        getTweets();
        break;
    case "spotify-this-song":
        searchSong(searchValue);
        break;
    case "movie-this":
        searchMovie(searchValue);
        break;
};