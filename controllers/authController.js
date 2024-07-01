const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GitLabStrategy = require('passport-gitlab2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config/config');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// GitHub Strategy
passport.use(new GitHubStrategy(config.github, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// GitLab Strategy
passport.use(new GitLabStrategy(config.gitlab, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// Facebook Strategy
passport.use(new FacebookStrategy(config.facebook, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// Google Strategy
passport.use(new GoogleStrategy(config.google, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

module.exports = passport;