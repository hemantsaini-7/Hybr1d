const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const bcrypt = require('bcrypt');

// Using Express-Validator for extra validation in API
const { check, validationResult } = require('express-validator');
const User = require('../models/UserModel');


// GET /api/auth/register
// Registering a User
// Accepts username, password, userType(either buyer or seller)
router.post('/register', [
  check('username', 'Please enter a valid username').not().isEmpty(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  check('userType', 'Please select a valid user type').isIn(['buyer', 'seller'])
], async (req, res) => {

// Get the errors if any of validations got failed
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

// Parsing username,password and userType from req.body
  const { username, password, userType } = req.body;

  try {
    // Check if User Already Exists i.e one unique username required
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Saving passwords as hashed instead of plain text
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new User with the details
    user = new User({ username, password: hashedPassword, userType });

    // Saving User to our Database
    await user.save();

    // Success message
    res.json({ msg: 'User registered successfully' });

  } catch (err) {
    // Catching Errors if anything went bad
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/auth/login
// Login a previously Registered User
// Accepts username and password

// Basic Validations of input recieved
router.post('/login', [
    check('username', 'Please enter a valid username').not().isEmpty(),
    check('password', 'Please enter a password').exists()
  ], async (req, res) => {
   
    // Get the errors if any of validations got failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    // Parsing username and password from req.body
    const { username, password } = req.body;
  
    try {
      // Check for username is correct or not
      let user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Check for password is correct or not
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Setting our Payload for JWT Token as UserID and UserType
      const payload = {
        user: {
          id: user.id,
          userType: user.userType
        }
      };

      // Signing out JWT Token with our Payload and Secret
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Everything Goes well we return a Token
      res.json({ token });

    } catch (err) {
      // Catching Errors if anything went bad
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// Exporting the User Router
module.exports = router;
