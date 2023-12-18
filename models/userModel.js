const Datastore = require('nedb');
const path = require('path');

const dbFilePath = path.join(__dirname, 'data', 'users.db');

const db = new Datastore({ filename: dbFilePath, autoload: true });


// Function to add a new user 
function insertUser(userData, callback) {
  db.insert(userData, callback);
}

function findUser(name, callback) {
  db.findOne({name}, callback);
}

function getAllUsers(callback) {
  // Fetch all users from the database except the admin user
  db.find({ email: { $ne: 'admin@example.com' } }, callback);
}

// Function to create a new event
function createUser(userForm, callback) {
  db.insert(userForm, callback);
}

function editUser(userName, updatedUser, callback) {
    db.update({name: userName }, { $set: updatedUser }, {}, callback);
}

function deleteUser(usernameToDelete, callback) {
  db.remove({name: usernameToDelete }, {}, callback);
}

function updateUserEventCount(userId, eventCount, callback) {
  db.update({ _id: userId }, { $set: { eventsCreated: eventCount } }, {}, (err, numUpdated) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, numUpdated);
    }
  });
}

module.exports = { insertUser, findUser, getAllUsers, editUser, createUser, deleteUser, updateUserEventCount};
