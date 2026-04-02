require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const foodRoutes = require('./routes/foodRoutes');
const authRoutes = require('./routes/authRoutes'); // <-- NEW

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/api/food', foodRoutes);
app.use('/api/auth', authRoutes); // <-- NEW

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser to view the app.`);
});