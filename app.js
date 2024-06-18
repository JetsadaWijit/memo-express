const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/home'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});