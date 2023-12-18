// routes/authRoute.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const eventController = require('../controllers/eventsController');
const { check, validationResult } = require('express-validator');


// Home page (login)
router.get('/login', (req, res) => {
    res.render('login');
});

// Home page (signup)
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/dashboard', isAdmin, (req, res) => {
    console.log("Reached /dashboard route handler.");
    const loggedInUser = req.session.user; // Retrieve user details from the session
    console.log("The admin is:", loggedInUser);
    
    if (loggedInUser && loggedInUser.email === 'admin@example.com') {
        const adminUser = {
            name: loggedInUser.name
        };
        res.render('dashboard', adminUser); // Pass user details to the view
        console.log("The sanitized admin", adminUser);    
    } else {
        // Handle cases where the user is not an admin or not logged in
        res.redirect('/login'); // Redirect to the login page or handle as needed
    }
});

function isAdmin(req, res, next) {
    const loggedInUser = req.session.user; // Retrieve user details from the session

    // Check if the user is logged in and has admin privileges
    if (loggedInUser && loggedInUser.email === 'admin@example.com') {
        // User is an admin, allow access to the route
        next();
    } else {
        // User is not an admin or not logged in, redirect to login page
        res.redirect('/login');
    }
}

// Events page (Account)
router.get('/event-display', (req, res) => {
    const loggedInUser = req.session.user; // Retrieve user details from the session
    console.log("The logged in user:", loggedInUser);
    if (loggedInUser) {
        const sanitizedUser = {
            name: loggedInUser.name,
            classYear: loggedInUser.classYear
        };
        res.render('event-display', sanitizedUser); // Pass user details to the view
        console.log("The sanitized user", sanitizedUser);    
    } else {
        // Handle cases where the user is not logged in
        res.redirect('/login'); // Redirect to the login page or handle as needed
    }
});

// call to require('express')
const signupValidation = [
    check('name').exists().isLength({ min: 5 }).trim().escape().withMessage('Name must have more than 5 characters'),
    check('classYear', 'Class Year should be a number').not().isEmpty().isInt(),
    check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
    check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({ min: 5 }),
    check('confirmPassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password)),
];


router.post('/createEvent', eventController.createEvent);
router.post('/updateEvent', eventController.editEvent);
router.post('/deleteEvent', eventController.deleteEvent);
router.post('/listEvents', eventController.getAllEvents);

router.get('/listEvents', eventController.getAllEvents);  

router.get('/filterEvents', eventController.searchForEvents);

router.post('/filterEvents', eventController.searchForEvents);

router.post('/signup', signupValidation, userController.insertUsers);

// router.post('/logged', userController.getUsers);

router.post('/login', userController.findUsers);

router.post('/displayUsers', userController.getDashboard);


router.post('/createUser', userController.createUser);
router.post('/editUser', userController.editUser);
router.post('/deleteUser', userController.deleteUser);

router.post('/deleteAllEvents', eventController.deleteAllEvents);


// Assuming you've initialized Express and NeDB
router.post('/saveRsvp', (req, res) => {
    const { eventId, userId } = req.body;
  
    // Save RSVP data to your database (NeDB or any other database)
    // For example, using NeDB
    db.insert({ eventId: eventId, userId: userId }, (err, newDoc) => {
      if (err) {
        res.status(500).send('Error saving RSVP');
      } else {
        res.status(200).send('RSVP saved successfully');
      }
    });
  });
  
  // API endpoint to retrieve RSVP events for a specific user
  router.get('/event-display/rsvpevents/:userId', (req, res) => {
    console.log('Route accessed: /event-display/rsvpevents/:userId');
    const userId = req.params.userId;
  
    // Retrieve RSVP events associated with the userId from the database
    db.find({ userId: userId }, (err, rsvpEvents) => {
      if (err) {
        res.status(500).send('Error retrieving RSVP events');
      } else {
        res.status(200).json({ rsvpEvents });
      }
    });
  });
  


module.exports = router;

