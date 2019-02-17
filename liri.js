require('dotenv').config();

//refering to keys.js file
var keys = require("./keys.js");
//read random.txt file
var fs = require("fs");
//require info from axios for OMDB API
var axios = require("axios");
//require info from moment.js
var moment = require("moment");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
//console.log(keys.spotify);



//spotify-this-song, movie-this, do-what-it-says array
var liriArgument = process.argv[2];
var Argument = process.argv[3];


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
    doWhatItSays(Argument);
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
            "\nSong title: " +
            data.tracks.items[0].name +
            "\n" +
            //Output a preview link of song from Spotify.
            "\nPreview song: " +
            data.tracks.items[0].preview_url +
            "\n" +
            //Output the album that  song is from.
            "\nAlbum: " +
            data.tracks.items[0].album.name +
            "\n"
        );
    });

}




function getMovieInfo(name) {

    //if there is no input for movie name then it will take Mr.Nobody as an input
    if(!name){
        name = "Mr.Nobody"
        console.log(
        "\nIf you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/" +
        "\n" +
        "\nIt's on Netflix!");
    };
    console.log("\n---------------------------------------------")
    // Run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy").then(
        function (response) {

            //Printing movies informations into bash
            console.log(
            "\nTitle of movie: " + 
            response.data.Title + 
            "\n" +

            "\nYear the movie came out: " + 
            response.data.Year + 
            "\n" +

            "\nIMDB Rating of the movie: " + 
            response.data.imdbRating +
            "\n" +

            "\nRotten Tomatoes Rating of the movie: " + 
            response.data.Ratings[1].Value +
            "\n" +
            
            "\nCountry where the movie was produced: " + 
            response.data.Country +
            "\n" +

            "\nLanguage of the movie: " + 
            response.data.Language +
            "\n" +

            "\nPlot of the movie: " + 
            response.data.Plot +
            "\n" +

            "\nActors in the movie: " + 
            response.data.Actors +
            "\n"
            );  

        }

    );

}




function getConcertInfo(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
       
        function(response){
            
            //Console logs consert infos
            console.log(
            "\nName of the venue: " +  
            response.data[0].venue.name +
            "\n" +
            //getting concert location
            "\nVenue location: " + 
            response.data[0].venue.city + ", " + response.data[0].venue.region +
            "\n" +
            //getting concert date
            "\nDate of the Event: " + 
            moment(response.data[0].datetime).format("L")  +
            "\n"
            );
           
            
            
        }
    )
}

function doWhatItSays() {

	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			logOutput.error(err);
		} else {

			// Creates array with data.
            var randomArray = data.split(",");
            
            //callback spotify function for do-what-it-says
            getSpotifyInfo(randomArray[1]);

		}
	});
}



