var Promise = require('bluebird');
var http = require('http');
var RecipePreference = require('./recipePreferenceModel');
var Recipe = require('../recipe/recipeModel');

var savePreference = function(request){
  console.log("savePreference request: ", request);
  console.log("savePreference request.body: ", request.body);  
  var preference = request.body;
  new RecipePreference({
    'userId': preference.userId,
    'preference': preference.preference,
    'salty': preference.salty,
    'sour': preference.sour,
    'sweet': preference.sweet,
    'bitter': preference.bitter,
    'meaty': preference.meaty,
    'piquant': preference.piquant
  }).save().then(function(recipePreference){
    console.log('Saved recipe Preference to db');
  }).catch(function(err){
    console.error('error saving recipe preference: ', err);
  });
}


module.exports = {

  updatePreferences: function (request, response) {
    // update recipe like/dislike table in db
    savePreference(request);
    response.status(200).send(request.body);
  },
  getUserPreferences: function (userId) {

    return new Promise(function(resolve, reject){

      RecipePreference.where({'userId': userId || 1})
      .fetchAll().then(function(preferences){
        if(preferences){
          resolve(preferences.models);
        }
        else{
          resolve([]);
        }
      });
    });
  }

};
