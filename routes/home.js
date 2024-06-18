const express = require('express');
const path = require('path');

const router = express.Router();

// utils
const { serveStaticFiles } = require('./utils');

// Pre-calculate static directory path
const staticPath = path.join(__dirname, '..', 'public');
const filePaths = [
    'css/home/style.css',
    'javascript/home/script.js'
];

// Loop through file paths and define routes dynamically
serveStaticFiles(router, staticPath, filePaths);

router.get('/', (req, res) => {
    res.render('home', { title: 'MEMO'});
});

module.exports = router;
