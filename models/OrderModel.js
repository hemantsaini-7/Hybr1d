// Order Model

const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
  
  //Storing Buyer's ID 
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  //Storing Seller's ID 
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Storing Items in Order as array of objects {name : price}
  items: [
    { 
      name: {
        type:String,
        required:true
      },
      price: {
        type:Number,
        required:true 
      }
    }
  ],

  // Storing Total Items in Order
  totalItems: {
    type: Number,
    required: true,
  },
  
  // Storing Total Price of Order
  totalPrice: {
    type: Number,
    required: true,
  },
});

// Creating Order Model using Schema
const Order = mongoose.model('Order', orderSchema);

// Exporting Order Model
module.exports = Order;
