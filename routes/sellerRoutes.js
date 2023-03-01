const express = require('express');
const router = express.Router();
const Catalog = require('../models/CatalogModel');
const Order = require('../models/OrderModel');
const authMiddleware = require('../middleware/auth');


// POST /api/seller/create-catalog
// Creating a Catalog for Seller
// Protected: Accepts valid seller token to create catalog and list of products
router.post('/create-catalog', authMiddleware, async (req, res) => {
  try {

    // Checking if Token is of Seller or not using token payload userType
    if (req.user.userType !== 'seller') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Access Seller ID from token payload
    const sellerId = req.user.id;

    // Access products from req.body
    const { products } = req.body;

    // Create catalog with the details
    const catalog = new Catalog({
      seller: sellerId,
      products,
    });

    // Save Catalog to out Database
    const savedCatalog = await catalog.save();

    // Return the created Catalog
    res.status(201).json({ catalog: savedCatalog });
  } catch (err) {
    // Catching errors if anything went bad
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/seller/orders
// To Get All the Orders recieved for a Seller
// Protected: Accepts valid seller token to access it's orders
router.get('/orders', authMiddleware, async (req, res) => {
    try {

      // Checking if Token is of Seller or not using token payload userType
      if (req.user.userType !== 'seller') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      // Get the orders using sellerID we have in token payload
      const orders = await Order.find({ sellerId: req.user.id });

      // Return all the orders
      res.json(orders);
      
    } catch (err) {
      // Catching errors if anything went bad
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

// Exporting the Seller Router
module.exports = router;
