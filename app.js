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
    saveUninitialized: false,
    cookie: { secure: process.env.SESSION_SECURE || false }
}));

const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');

// Function to ensure a directory or file exists
const ensureExists = (path, callback) => {
    if (!fs.existsSync(path)) {
        try {
            callback();
        } catch (err) {
            console.error(`Error creating ${path}:`, err);
        }
    }
};

// Ensure the data directory and users.json file exist
ensureExists(dataDir, () => fs.mkdirSync(dataDir));
ensureExists(usersFile, () => fs.writeFileSync(usersFile, JSON.stringify([])));

// Function to setup routes with error handling
const setupRoute = (routePath, routeFile) => {
    try {
        app.use(routePath, require(routeFile));
    } catch (err) {
        console.error(`Error loading ${routePath} route:`, err);
    }
};

// Setup routes
setupRoute('/about', './routes/about');
setupRoute('/', './routes/home');

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
