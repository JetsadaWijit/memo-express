const express = require('express');
const session = require('express-session');

const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.email) {
        res.redirect('/');
    }
    res.render('about', { title: 'MEMO', user: req.session.email});
});

module.exports = router;