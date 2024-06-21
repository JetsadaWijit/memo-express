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

// Function to hash password
const hashPassword = (password) => bcrypt.hash(password, 10);

// Function to compare password
const comparePassword = (password, hash) => bcrypt.compare(password, hash);

router.get('/register', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.render('about', { title: 'About' });
});

// Register route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const emails = await readUsersEmail(filePath);
        const user = emails.find((user) => user.email === email);

        if (user) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await hashPassword(password);
        const newUser = { email, password: hashedPassword };
        writeUsersEmail(filePath, [...emails, newUser]);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/login', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.render('about', { title: 'About' });
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const emails = await readUsersEmail(filePath);
        const user = emails.find((user) => user.email === email);

        if (user && await comparePassword(password, user.password)) {
            req.session.user = user;
            res.redirect('/about');
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
