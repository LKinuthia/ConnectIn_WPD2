const userModel = require('../models/userModel');

const bcrypt = require('bcrypt');
const saltRounds = 10;


// Controller function to handle event creation
function insertUsers(req, res) {
  const name = req.body['name'];
  const classYear = req.body['classYear'];
  const email = req.body['email'];
  const password = req.body['password'];
  const confirmPassword = req.body['confirmPassword'];

  const eventsCreated = {};

  
  console.log('Received Event name:', name);
  console.log('Received Event classYear:', classYear);
  console.log('Received Event email:', email);
  console.log('Received Event password:', password);
  console.log('Received Event confirmPassword:', confirmPassword);

  if (name && classYear && email && password && confirmPassword) {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }
    
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({ error: 'Failed to hash the password.'});
      } else {
        const userData = { name: name, classYear: classYear, email: email, password: hash, eventsCreated: eventsCreated};
        console.log('The user data: ', userData);

      userModel.insertUser(userData, (err, newUser) => {
        if (err) {
        console.error('Error inserting event into the database:', err);
        res.status(500).json({ error: 'Failed to insert the user.' });
      } else {
        console.log('User inserted into the database:', newUser);
        res.redirect('/login');
      }
    });
  }
});
  } else {
    res.status(400).json({ error: 'Invalid input data.' });
  }
}



function findUsers(req, res) {
    const nameTocheck = req.body['name'];
    // const email = req.body['email'];

    console.log("The name to validate is:", nameTocheck);

    userModel.findUser(nameTocheck, (err, user) => {
        if(err){
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database query error'});
        } else if (user) {
          req.session.user = user;
          if(user.email === 'admin@example.com'){
            res.redirect('/dashboard');
          } else {
            res.redirect('/event-display');
          }
        } else {
            const alertScript = "<script>alert('Invalid name'); window.location.href = '/signup';</script>";
            res.send(alertScript);
        }
    });
}

// UserController.js
function getDashboard(req, res) {
  userModel.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching users'});
    } else {
      console.log("The user:", users);
      res.render('dashboard', { users });
    }
  });
}



// Controller function to handle event creation
function createUser(req, res) {
  const userName = req.body['name'];
  const userEmail = req.body['email'];
  const userYear = req.body['classYear'];


  if (userName && userEmail && userYear) {
  console.log('Received Event Id:', userName);
    const userForm = { name: userName, email: userEmail, classYear: userYear};
    

    userModel.createUser(userForm, (err, newUsers) => {
      if (err) {
        console.error('Error inserting user into the database:', err);
        res.status(500).json({ error: 'Failed to create the user.' });
      } else {
        console.log('User inserted into the database:', newUsers);
        res.redirect('dashboard');
        // return res.status(200).json({ message: 'Event created successfully.' });
        //res.redirect('/success.html'); // You can customize the response as needed
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid input data.' });
  }
}


  // Update an user by name
 function editUser(req, res) {
    const userName = req.body['name']
    const updatedUser = {
      email: req.body['new-email'],
      classYear: req.body['new-classYear']
    };

    userModel.editUser(userName, updatedUser, (err, numUpdated) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update the user.' });
      }
      if (numUpdated === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.redirect('/dashboard?message=User+updated+successfully');
      // return res.status(200).json({ message: 'Event updated successfully.' });
    });
  }

  function deleteUser(req, res) {
    const usernameToDelete = req.body['username'];

    userModel.deleteUser(usernameToDelete , (err, numRemoved) => {
      if (err) {
        res.status(500).send('Error deleting user');
      } else if (numRemoved === 0) {
        res.status(404).send('User not found');
      } else {
        res.redirect('/dashboard?message=User(s)+deleted+successfully');
        // res.status(200).send('User(s) deleted successfully');
      }
    });
  }


module.exports = {insertUsers, findUsers, getDashboard, createUser, editUser, deleteUser};