const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('about', { title: 'MEMO', email: req.session.email});
});

module.exports = router;