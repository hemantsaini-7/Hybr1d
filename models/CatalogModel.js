// Catalog Model

const mongoose = require('mongoose');

// Catlog Schema PROPS: Catalog Owner i.e Seller and Products in catalog
const catalogSchema = new mongoose.Schema({

  //Storing Catalog Owner i.e Seller's ID
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Seller', 
    required: true 
  },
  // Storing products as an array of objects {name : price}
  products: [
    { 
      name: {
        type: String,
        required: true
      }, 
      price: {
        type: Number,
        required: true
      } 
  }
]
});

//Creating Catalog Model using Schema 
const Catalog = mongoose.model('Catalog', catalogSchema);

// Exporting Catalog Model
module.exports = Catalog;

