// controllers/authController.js
const authController = {};  

authController.login = (req, res) => {
  // Implement login logic, e.g., validate user credentials
  res.redirect('/dashboard-manager');
};

function signup (req, res) {
  // Implement user registration logic, e.g., create a new user
  res.redirect('/events');
};

module.exports = {signup};
