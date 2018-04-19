
//OMDB//

var request = require("request")

var movie = (process.argv[2]);

var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"

request (queryUrl, function(error, response, body){

    if (!error && response.statusCode === 200){
        console.log("You picked " + movie);
        console.log(JSON.parse(body).Plot);
        console.log("This movie was released in " + JSON.parse(body).Year);
        console.log("It is rated " + JSON.parse(body).Rated);
        console.log(movie + " was directed by " + JSON.parse(body).Director);
    }
})

