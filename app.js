const express = require('express');
const session = require('express-session');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use('/', require('./routes/home'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});