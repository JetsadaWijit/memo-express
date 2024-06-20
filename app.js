const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(__dirname, 'data', 'users.json');

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Ensure the users.json file exists
if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([]));
}

app.use('/about', require('./routes/about'));
app.use('/', require('./routes/home'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});