const express = require('express');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcryptjs');

const router = express.Router();

const filePath = path.join(__dirname, '..', 'data', 'users.json');

const { readUsersEmail, writeUsersEmail } = require('./utils');

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
    if (req.session.user) {
        res.redirect('/about');
    }
    res.render('home', { title: 'MEMO'});
});

// post register using bcrypt
router.post('/register', (req, res) => {
    const { email, password } = req.body;
    const emails = readUsersEmail((filePath));
    const user = emails.find((user) => user.email === email);

    if (user) {
        res.send('User already exists');
    } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        writeUsersEmail(path.join(filePath), [...emails, { email, password: hashedPassword }]);
        req.session.user = user;
        res.redirect('/about');
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const emails = readUsersEmail(filePath);
    const user = emails.find((user) => user.email === email);

    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.redirect('/about');
    } else {
        res.send('Invalid email or password');
    }
});

module.exports = router;
