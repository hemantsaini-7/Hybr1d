const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/UserModel');
const Catalog = require('../models/CatalogModel');
const Order = require('../models/OrderModel');


// GET /api/buyer/list-of-sellers
// Get the List of all the sellers
router.get('/list-of-sellers', async (req, res) => {
  try {
    // Finding all the user having userType as seller
    const sellers = await User.find({ userType: 'seller' });

    // Returning all the sellers
    res.json(sellers);
  } catch (err) {
    // Catching errors if anything went bad
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /api/buyer/seller-catalog/:seller_id
// Get the Catalog of Seller
router.get('/seller-catalog/:seller_id', async (req, res) => {
  try {
    // Find the catalog of the seller using req.params and populate the products from it
    const sellerCatalog = await Catalog.findOne({ seller: req.params.seller_id }).populate('products');

    // If Catalog for the seller is not available
    if (!sellerCatalog) {
      return res.status(404).json({ message: 'Catalog not found' });
    }

    // Return the seller's catalog
    res.json(sellerCatalog);
  } catch (err) {
    // Catching errors if anything went bad
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/buyer/create-order/:seller_id
// Creating a order for a seller
// Accepts a Valid Buyer's token in headers and list of items to order
router.post('/create-order/:seller_id', authMiddleware, async (req, res) => {
    try {

      // Checking if token is of valid buyer or not using token payload
      if (req.user.userType !== 'buyer') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Accesing Buyer's and Seller's ID from token payload and params respectively
      const buyerId = req.user.id;
      const sellerId = req.params.seller_id;
  
    // Checking if the Seller's Catalog exist or not
      const catalog = await Catalog.findOne({ seller: sellerId });
      if (!catalog) {
        return res.status(404).json({ message: 'Seller not found' });
      }

    // Parsing items from req.body
      const {items} = req.body

      // Initialising TotalItems and totalPrice
      let totalItems = 0
      let totalPrice = 0

      // Calculating TotalItems and TotalPrice of Order
      for (const item of items) {
        totalItems += 1
        totalPrice += item.price
      }

      // Creating Order with the details
      const order = new Order({
        buyerId,
        sellerId,
        items,
        totalItems,
        totalPrice
      });
  
      // Saving Order to our Database
      await order.save();

      // Returning the order details 
      res.status(201).json(order);

    } catch (err) {
      // Cating errors if anything went bad
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Exporting Buyer's Router
module.exports = router;
