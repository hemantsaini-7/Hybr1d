// User Model
const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({

  // Storing Username
  username: {
    type: String,
    required: true
  },

  // Storing Password
  password: {
    type: String,
    required: true
  },

  // Storing UserType can be either buyer or seller
  userType: {
    type: String,
    enum: ['buyer', 'seller'],
    required: true
  }
});

// Creating User Model using Schema
const User = mongoose.model('User', userSchema);

// Exporting User Model
module.exports = User;
