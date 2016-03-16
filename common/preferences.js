var User = require('../models/user.js').model;

exports.updatePreference = function (id, genreCode) {

    var user = User.findById(id);

    var genreIsAMovie = genreCode.substr(0, 2) === '44';

    var index;
    if (genreIsAMovie) {
        index = parseInt(genreCode.substr(2)) - 1;
    } else {
        index = parseInt(genreCode.substr(2) + 33);
    }

    user.preference[index] += 1;

    user.save(function(err){
        console.log(err);
    })

};