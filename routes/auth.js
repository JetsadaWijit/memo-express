const express = require('express');
const passport = require('../controllers/authController');

const router = express.Router();

// GitHub routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});

// GitLab routes
router.get('/gitlab', passport.authenticate('gitlab', { scope: ['api'] }));
router.get('/gitlab/callback', passport.authenticate('gitlab', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});

// Facebook routes
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});

// Google routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});

module.exports = router;