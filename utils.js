const fs = require('fs');
const express = require('express');
const app = express();

// Function to setup routes with error handling
function setupRoute(routePath, routeFile) {
    try {
        app.use(routePath, require(routeFile));
    } catch (err) {
        console.error(`Error loading ${routePath} route:`, err);
    }
}

// Function to ensure a directory or file exists
function ensureExists(path, callback) {
    if (!fs.existsSync(path)) {
        try {
            callback();
        } catch (err) {
            console.error(`Error creating ${path}:`, err);
        }
    }
}

module.exports = {
    ensureExists,
    setupRoute
};