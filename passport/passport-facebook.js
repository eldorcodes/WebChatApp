const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const keys = require('../config/keys');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new FacebookStrategy({
        clientID: keys.FacebookAppID,
        clientSecret: keys.FacebookAppSecret,
        profileFields: ['email','displayName','photos'],
        callbackURL: "https://arcane-beach-16647.herokuapp.com/auth/facebook/callback",
        proxy:true
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({facebook:profile.id},(err,user) => {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null,user);
            }else{
                const newUser = {
                    facebook:profile.id,
                    fullname: profile.displayName,
                    image: `https://graph.facebook.com/${profile.id}/picture?type=large`,
                    email: profile.emails[0].value
                }
                new User(newUser).save((err,user) => {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null,user)
                    }
                })
            }
        })
    }
));