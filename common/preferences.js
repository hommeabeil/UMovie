var User = require('../models/user').model;
var genreToId = require('./genreToId');
require('array.prototype.find');

exports.updatePreference = function (id, result) {

    User.findOne({_id: id}, function (err, user) {
        for (var i = 0; i < result.length; i++) {

            var genreName = result[i].primaryGenreName;

            var genreCode = genreToId.findByGenreName(genreName);

            var genreIndex = -1;

            for (var j = 0; j < user.preference.length; j++) {
                if (user.preference[j].genre === genreCode) {
                    genreIndex = j;
                }
            }

            if (genreIndex !== -1) {
                user.preference[genreIndex].count += 1;
            } else {
                user.preference.push({genre: genreCode, count: 1})
            }
        }
        user.save(function (err) {
            console.log(err);
        })

    });


};