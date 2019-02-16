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
var songArgument = process.argv[3];

//movie-this variable to hold the movie name.
var movieName = "";

//spotify-this-song variable to hold the song name.
var songName = "";

//Show song info if command is spotify-this-song.
if (liriArgument === "spotify-this-song") {
    getSpotifyInfo(songArgument);
}

//Output information about that movie if command is movie-this.
else if (liriArgument === "movie-this") {
    getMovieInfo();
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

        console.log( 
            //Output the artist name
            "Artist: " +
            data.tracks.items[5].artists[0].name +
            "\r\n" +
            //Output the song's name.
            "Song title: " +
            data.tracks.items[5].name +
            "\r\n" +
            //Output the album that  song is from.
            "Album: " +
            data.tracks.items[5].album.name +
            "\r\n"
        );
    });

}




function getMovieInfo() {
    axios.get({ title: 'Saw', year: 2004 }, true, function(err, movie) {
        if(err) {
            return console.error(err);
        }
     
        if(!movie) {
            return console.log('Movie not found!');
        }
        console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
        console.log(movie.plot);
    });
    
}

