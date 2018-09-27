var axios = require('axios');
var keys = require('./keys');
var _baseURL = 'https://api.themoviedb.org/3/';
var _APIKEY = keys.apiKey;

function prepRouteParams (queryStringData) {
    return Object.keys(queryStringData)
      .map(function (key) {
        return key + '=' + encodeURIComponent(queryStringData[key]);
      }).join('&')
  }
  
function prepUrl (type, queryStringData) {
    return _baseURL + type + '?' + prepRouteParams(queryStringData);
}

function getReleases() {

    var queryStringData = {
        api_key: _APIKEY,
        language: 'en-US',
        sort_by: 'popularity.desc',
        include_adult: false,
        include_video: false,
        page: 1
    }

    var url = prepUrl('discover/movie', queryStringData);

    return axios.get(url)
        .then(function (response) {
            // handle success
            return response.data.results;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

function getDetails(id) {

    var queryStringData = {
        api_key: _APIKEY,
        language: 'en-US',
        append_to_response: 'credits'
    }

    var url = prepUrl(('movie/' + id), queryStringData);

    return axios.get(url)
        .then(function (response) {
            // handle success
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

function getMovieByQuery(query) {
    var queryStringData = {
        api_key: _APIKEY,
        language: 'en-US',
        query: query,
        page: 1,
        include_adult: false,
    }

    var url = prepUrl(('search/movie/'), queryStringData);
    return axios.get(url)
    .then(function (response) {
        // handle success
        return response.data.results;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
}

function getPosterUrl() {
    return 'https://image.tmdb.org/t/p/w300/';
}

module.exports = {
    getReleases: getReleases,
    getPosterUrl: getPosterUrl,
    getDetails: getDetails,
    getMovieByQuery: getMovieByQuery
}