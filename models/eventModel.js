const Datastore = require('nedb');
const path = require('path');

const userModel = require('./userModel');

const dbFilePath = path.join(__dirname, 'data', 'events.db');

const db = new Datastore({ filename: dbFilePath, autoload: true});

// Function to create a new event
function createEvent(eventData, callback) {
  db.insert(eventData, callback);
}


function updateEvent(eventId, updatedEvent, callback) {
    db.update({id: eventId }, { $set: updatedEvent }, {}, callback);
}


function deleteEvent(eventId, callback) {
      db.remove({ id: eventId }, {}, callback);
    }

function deleteAllEvent(callback) {
  db.remove({}, { multi: true }, function (err, numRemoved) {
    if (err) {
        callback(err);
    } else {
        callback(null, numRemoved);
    }
});
}

// Function to retrieve all events
function getEvents(callback) {
  db.find({}, callback);
}


// Function to count events created by each registered user
function countEventsByUser(callback) {
  // Fetch all events from the database
  db.find({}, (err, events) => {
    if (err) {
      callback(err, null);
    } else {
      // Create an empty object to store user-wise event counts
      const eventsCreated = {};

      // Iterate through each event
      events.forEach(event => {
        const createdBy = event.createdBy;

        // If the user ID already exists in the counts, increment the count
        if (eventsCreated[createdBy]) {
          eventsCreated[createdBy]++;
        } else {
          // If the user ID doesn't exist, initialize the count to 1
          eventsCreated[createdBy] = 1;
        }
      });

      // Prepare the results in an array of objects
      const result = Object.keys(eventsCreated).map(userId => ({
        userId: userId,
        eventCount: eventsCreated[userId]
      }));

       // Update user database with event counts
       result.forEach(userEvent => {
        const { userId, eventCount } = userEvent;

        userModel.updateUserEventCount(userId, { count: eventCount }, (err, numUpdated) => {
          if (err) {
            console.error(`Error updating event count for user ${userId}:`, err);
          } else {
            console.log(`Event count updated for user ${userId}. Updated ${numUpdated} record(s).`);
          }
        });
      });

      callback(null, result);
    }
  });
}

// Usage: Count events by user
countEventsByUser((err, eventsCreated) => {
  if (err) {
    console.error('Error counting events by user:', err);
    // Handle error
  } else {
    console.log('Event counts by user:', eventsCreated);
    // Use userEventCounts as needed (e.g., display to the user, perform further logic, etc.)
  }
});


// Function to retrieve all events by filtering
function searchEvents(query, callback) {
  db.find(query, (err, filteredEvents) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, filteredEvents);
    }
  });
}


module.exports = {createEvent, getEvents, updateEvent, deleteEvent, deleteAllEvent, searchEvents};



// function updateEvent(eventId, newEventName, newEventDate, callback) {
//   db.update(
//     { id: eventId, name: newEventName }, // Assuming eventId is the unique identifier of the event
//     { $set: { date: newEventDate } },
//     {},
//     (err, numUpdated) => {
//       if (err) {
//         callback(err, null);
//       } else {
//         if (numUpdated === 1) {
//           // The update was successful
//           callback(null, { id: eventId, name: newEventName, date: newEventDate });
//         } else {
//           // The event with the provided eventId was not found
//           callback('Event not found', null);
//         }
//       }
//     }
//   );
// }


// const Event = { 
//   insert: function (event, callback) {
//     db.insert(event, callback);
//   },

//   // Get all events from the NEDB
//   getAll: function (callback) {
//     db.find({}, callback);
//   },
// };

// module.exports = Event;



















