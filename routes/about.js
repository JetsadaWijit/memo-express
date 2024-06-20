const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const user = req.session.user;
    if (!req.session.user) {
        res.redirect('/');
    }
    res.render('about', { title: 'MEMO', user });
});

module.exports = router;