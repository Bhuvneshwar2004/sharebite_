const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    foodItem: { type: String, required: true },
    quantity: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    isClaimed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// THIS LINE IS CRITICAL - It tells Node.js this is a database model
module.exports = mongoose.model('Food', foodSchema);