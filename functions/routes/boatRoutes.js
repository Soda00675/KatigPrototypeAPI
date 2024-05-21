const express = require('express');
const router = express.Router();
const Boat = require('../models/boatModel'); // Ensure the path is correct and matches your directory structure

// Middleware to get boat by ID
async function getBoat(req, res, next) {
  let boat;
  try {
    boat = await Boat.findById(req.params.id);
    if (!boat) {
      return res.status(404).json({ message: 'Boat not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.boat = boat;
  next();
}

// Register a new boat
router.post('/boat', async (req, res) => {
  const { boatType, capacity, owner } = req.body;
  try {
    const boat = new Boat({ boatType, capacity, owner });
    const newBoat = await boat.save();
    res.status(201).json(newBoat);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Get all boats
router.get('/boat', async (req, res) => {
  try {
    const boats = await Boat.find();
    res.json(boats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get a specific boat
router.get('/boat/:id', getBoat, (req, res) => {
  res.json(res.boat);
});

// Update a boat
router.patch('/boat/:id', getBoat, async (req, res) => {
  if (req.body.boatType != null) {
    res.boat.boatType = req.body.boatType;
  }
  if (req.body.capacity != null) {
    res.boat.capacity = req.body.capacity;
  }
  if (req.body.owner != null) {
    res.boat.owner = req.body.owner;
  }
  try {
    const updatedBoat = await res.boat.save();
    res.json(updatedBoat);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Delete a boat
router.delete('/boat/:id', getBoat, async (req, res) => {
  try {
    await res.boat.remove();
    res.json({ message: 'Boat deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
