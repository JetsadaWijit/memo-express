const express = require('express');
const session = require('express-session');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session.email);
    res.render('about', { title: 'MEMO', user: req.session.email});
});

module.exports = router;