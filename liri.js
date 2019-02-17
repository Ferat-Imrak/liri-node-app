require('dotenv').config();

var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
//console.log(keys.spotify);



//spotify-this-song, movie-this, do-what-it-says array
var liriArgument = process.argv[2];
var Argument = process.argv[3];

//movie-this variable to hold the movie name.
var movieName = "";

//spotify-this-song variable to hold the song name.
var songName = "";

//Show song info if command is spotify-this-song.
if (liriArgument === "spotify-this-song") {
    getSpotifyInfo(Argument);
}

//Output information about that movie if command is movie-this.
else if (liriArgument === "movie-this") {
    getMovieInfo(Argument);
}

else if(liriArgument === "consert-this") {
    getConcertInfo(Argument);
}

//If do-what-it-says, text inside of random.txt is used to run spotify-this-song for "I want it that way."
else if (liriArgument === "do-what-it-says") {
    doWhatItSays();
}

else {
    console.log("Input is not available!!")
}


//create this function to load song info inside the bash
function getSpotifyInfo(name) {
    //console.log("hey form spotify");
    spotify.search({ type: 'track', query: name }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log("Test Console: ", data.tracks.items[0].preview_url)
        console.log(
            //Output the artist name
            "\nArtist: " +
            data.tracks.items[0].artists[0].name +
            "\n" +
            //Output the song's name.
            "Song title: " +
            data.tracks.items[0].name +
            "\n" +
            //Output a preview link of song from Spotify.
            "Preview song: " +
            data.tracks.items[0].preview_url +
            "\n" +
            //Output the album that  song is from.
            "Album: " +
            data.tracks.items[0].album.name +
            "\n"
        );
    });

}




function getMovieInfo(name) {
    // Run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy").then(
        function (response) {

            var rottenTomatoes = response.data.Ratings[1].Source + ": " + response.data.Ratings[1].Value
            var plot = response.data.Plot;
            console.log(plot);
            // console.log("Title of movie: " + response.data.Title);
            // console.log("Year the movie came out: " + response.data.Year);
            // console.log(rottenTomatoes);
            // console.log(response.data.Actors);  
        }
    );

}

function getConcertInfo(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
       
        function(response){
            
            //console.log(response.data[0].venue.name);
            //console.log(response.data[0].venue.city + ", " + response.data[0].venue.region)
            console.log(moment(response.data[0].datetime).format("L"));
            
            
        }
    )
}



