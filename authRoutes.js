const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST: Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Check if email is already taken
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'Email already in use' });

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the new user
        user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: 'Account created successfully!' });
    } catch (error) {
        console.error("Register Error:", error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST: Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        // Give them a digital key (Token)
        const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, 'sharebite_secret_key', { expiresIn: '2h' });
        res.json({ token, user: { name: user.name, role: user.role } });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// THIS IS THE CRITICAL LINE:
module.exports = router;