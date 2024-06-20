const express = require('express');
const path = require('path');

const router = express.Router();

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
    res.render('home', { title: 'MEMO'});
});

// post register using bcrypt
router.post('/register', (req, res) => {
    const { email, password } = req.body;
    const emails = readUsersEmail(path.join(__dirname, '..', 'data', 'users.json'));
    const exists = emails.some((user) => user.email === email);

    if (exists) {
        res.send('User already exists');
    } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        writeUsersEmail(path.join(__dirname, '..', 'data', 'users.json'), [...emails, { email, password: hashedPassword }]);
        res.redirect('/about', { title: 'MEMO', email });
    }
});

module.exports = router;
