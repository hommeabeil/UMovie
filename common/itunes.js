var request = require('request');
var qs = require('querystring');
var preferences = require('../common/preferences');

var searchEndPoint = 'http://itunes.apple.com/search?';
var lookupEndPoint = 'http://itunes.apple.com/lookup?';

exports.search = function (parameters, res) {
    queryItunesApi(searchEndPoint + qs.stringify(parameters), res);
};

exports.lookup = function (parameters, res, amount, user) {
    queryItunesApi(lookupEndPoint + qs.stringify(parameters), res, amount, user);
};

function queryItunesApi(url, res, amount, user) {
    request({
            uri: url,
            method: 'GET'
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                successCallback(res, JSON.parse(body), amount, user);
            } else {
                errorCallback(res, error, response, body);
            }
        }
    );
}


function successCallback(res, body, amount, user) {

    if (amount == 'many') {
        body.results.splice(0, 1);
        body.resultCount--;
        res.status(200).send(body);
    }
    else {
        preferences.updatePreference(user._id, body.results);
        res.status(200).send(body);
    }
}

function errorCallback(res, error, response, body) {
    console.error(error, body);
    res.status(response.statusCode).send(body);
}
