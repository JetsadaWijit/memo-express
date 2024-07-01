const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

// import function from utils.js
const {
    ensureExists,
    setupRoute
} = require('./utils');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.SESSION_SECURE || false }
}));

const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');

// Ensure the data directory and users.json file exist
ensureExists(dataDir, () => fs.mkdirSync(dataDir));
ensureExists(usersFile, () => fs.writeFileSync(usersFile, JSON.stringify([])));

// Setup routes
setupRoute('/about', './routes/about');
setupRoute('/auth', './routes/auth');
setupRoute('/', './routes/home');

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
