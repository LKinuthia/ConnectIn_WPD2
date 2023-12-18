const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventsController');


// Get all events
router.post('/createEvent', eventController.createEvent);
  

// Get all events
router.get('/get-all-events', eventController.getAllEvents);

module.exports = router;




// // routes/events.js
// const express = require('express');
// const router = express.Router();
// // const eventsController = require('../controllers/eventsController');
// const db = require('../database');


// // Create a new event
// router.post('/create', (req, res) => {
//     const { title, date } = req.body;

//     db.insert({ title, date }, (err, newEvent) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to create the event.' });
//         }
//         return res.status(201).json(newEvent);
//     });
// });

// // Get all events
// router.get('/all', (req, res) => {
//     db.find({}, (err, events) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to retrieve events.' });
//         }
//         return res.status(200).json(events);
//     });
// });

// module.exports = router;

// // Create a new event
// router.post('/create', eventsController.createEvent);

// // Edit an event
// router.put('/edit/:eventId', eventsController.updateEvent);

// // Delete an event
// router.delete('/delete/:eventId', eventsController.deleteEvent);


