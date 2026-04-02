const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// GET: Fetch all unclaimed food
router.get('/', async (req, res) => {
    try {
        const foods = await Food.find({ isClaimed: false }).sort({ createdAt: -1 });
        res.json(foods);
    } catch (error) {
        // This will print the exact reason to your terminal!
        console.error("DATABASE ERROR ON GET:", error.message); 
        res.status(500).json({ message: 'Error fetching food data', error: error.message });
    }
});

// POST: Add a new food donation
router.post('/', async (req, res) => {
    try {
        const newFood = new Food(req.body);
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    } catch (error) {
        console.error("DATABASE ERROR ON POST:", error.message);
        res.status(400).json({ message: 'Error saving food donation', error: error.message });
    }
});

// PUT: Claim a specific food item
router.put('/:id/claim', async (req, res) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(
            req.params.id, 
            { isClaimed: true }, 
            { new: true }
        );
        res.json(updatedFood);
    } catch (error) {
        console.error("DATABASE ERROR ON PUT:", error.message);
        res.status(400).json({ message: 'Error claiming food', error: error.message });
    }
});

module.exports = router;