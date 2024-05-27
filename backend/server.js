// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/Recipe');

dotenv.config();



const app = express();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 5000;
app.use(express.static('public'));
// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.post('/api/recipes', async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const recipe = new Recipe({ title, ingredients, instructions });
    await recipe.save();
    res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
