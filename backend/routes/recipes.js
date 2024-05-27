// routes/recipes.js

const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// POST route to save a new recipe
router.post('/', async (req, res) => {
    try {
        // Create a new recipe instance with data from the request body
        const newRecipe = new Recipe(req.body);
        // Save the new recipe to the database
        const savedRecipe = await newRecipe.save();
        // Respond with the saved recipe object
        res.status(201).json(savedRecipe);
    } catch (err) {
        // Handle any errors
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
