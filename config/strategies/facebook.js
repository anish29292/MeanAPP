var passport = require('passport');
var fb = require('fbgraph');
var url = require('url');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');
var users = require('../../app/controllers/users.server.controller');
module.exports = function() { 
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID, clientSecret: config.facebook.clientSecret,             callbackURL: config.facebook.callbackURL,
        passReqToCallback: true,
        profileFields:['first_name','last_name','email']
        },
                                      
function(req, accessToken, refreshToken, profile, done) {
        var providerData = profile._json; 
        console.log(profile);
        providerData.accessToken = accessToken; 
        providerData.refreshToken = refreshToken;
        var providerUserProfile = {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            fullName: profile.name.givenName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'facebook',
            providerId: profile.id,
            providerData: providerData
        };
        
users.saveOAuthUserProfile(req, providerUserProfile, done); }));
};