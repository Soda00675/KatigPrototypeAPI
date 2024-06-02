const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackModel'); // Adjust the path as necessary
const { authenticateToken } = require('./userRoutes');

// Middleware to get feedback by ID
async function getFeedback(req, res, next) {
  let feedback;
  try {
    feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.feedback = feedback;
  next();
}

// Create new feedback
router.post('/feedback', async (req, res) => {
  const { userId, rating, message } = req.body;
  try {
    const feedback = new Feedback({ userId, rating, message });
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});


// Get all feedback
router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get specific feedback
router.get('/feedback/:id', getFeedback, (req, res) => {
  res.json(res.feedback);
});

// Update feedback
router.patch('/feedback/:id', getFeedback, async (req, res) => {
  if (req.body.rating != null) {
    res.feedback.rating = req.body.rating;
  }
  if (req.body.message != null) {
    res.feedback.message = req.body.message;
  }
  try {
    const updatedFeedback = await res.feedback.save();
    res.json(updatedFeedback);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Delete feedback
router.delete('/feedback/:id', getFeedback, async (req, res) => {
  try {
    await res.feedback.remove();
    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
