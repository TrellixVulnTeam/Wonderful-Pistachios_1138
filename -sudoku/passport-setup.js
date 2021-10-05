const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: '184800543822-0lln9e9db8eap5k2kf9dol8otm0oq7hr.apps.googleusercontent.com',
    clientSecret: 'XugKwVhQNSbf7Yx70QlIzs9P',
    callbackURL: "http://localhost:3000/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));