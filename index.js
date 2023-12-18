// index.js
const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Recommended number of salt rounds
// const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/authRoute');
const eventroutes = require('./routes/events');
const userroutes = require('./routes/users');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// // Set up sessions
app.use(session({
  secret: '1!2@3#4$5%6^7&8*9(0)aAbBcCdDeEfF',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
// Serve images from the 'public/images' directory
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Configure Mustache as the view engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));


// Routes
app.use('/', routes);
app.use('/signup', userroutes);
app.use('/event-display', eventroutes);
app.use('/dashboard', routes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;