require("dotenv").config();
var axios = require("axios");
var spotifyAcc =  require("./key").spotify;
var fs = require("fs");

function getBandConcert(){
    axios.get("https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp").then(
        function(response) {
          // If the axios was successful...
          // Then log the body from the site!
          //console.log(response.data[0]);
          console.log(response.data[0].venue.name);
          console.log(response.data[0].venue.city + ' ,' + response.data[0].venue.region);
          getDate(response.data[0].datetime);

        },
      
        function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        }
    ); 
}

function getSongInfo(songname){
    var Spotify = require('node-spotify-api');
    var spotifyRequest = new Spotify(spotifyAcc);
     
    spotifyRequest.search({ type: 'track', query: songname}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      };
      console.log('Song: ' + data.tracks.items[0].name);
      console.log('Album: ' + data.tracks.items[0].album.name);
      console.log('Artist: ' + data.tracks.items[0].artists[0].name);
      console.log('Preview Link: ' + data.tracks.items[0].preview_url);
    });
};

function getFilmInfo(){
    let movie = movieSet();
    let omdbURL     = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(omdbURL).then(
        function(response) {
          // If the axios was successful...
          // Then log the body from the site!
          //console.log(response.data[0]);
          console.log(response.data.Title);
          console.log(response.data.Year);
          console.log(response.data.Rated);
          console.log(response.data.Released);
          console.log(response.data.Runtime);
          console.log(response.data.Plot);
          console.log(response.data.Language);

        },
      
        function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        }
      ); 
}

function readFromFileAndSpotigyIt(){
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
        let dataArr = data.split(',');
        if(dataArr[0] == 'spotify-this-song'){
            getSongInfo(dataArr[1]);
        }

    });
}


function getDate(apiDate){
    let arrDate = apiDate.split('-');
    arrDate[2] = arrDate[2].split('T')[0];
    console.log(arrDate[1] + ' ' + arrDate[2] + ' ' + arrDate[0])
};

function movieSet(){
    if(process.argv[3] != undefined){
        return process.argv[3];
    } else {
        return 'Mr. Nobody';
    }
}


function run(){
    if(process.argv[2] == 'concert-this'){
        getBandConcert();
    } else if(process.argv[2] == 'spotify-this-song'){
        getSongInfo(process.argv[3]);
    } else if(process.argv[2] == 'movie-this'){
        getFilmInfo();
    } else if(process.argv[2] == 'do-what-it-says'){
        readFromFileAndSpotigyIt();
    };
};

run();