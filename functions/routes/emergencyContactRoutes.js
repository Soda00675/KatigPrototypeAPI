const express = require('express');
const router = express.Router();
const EmergencyContact = require('../models/emergencyContactModel'); // Ensure this path is correct
// Middleware to get emergency contact by ID
async function getEmergencyContact(req, res, next) {
  let contact;
  try {
    contact = await EmergencyContact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Emergency contact not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.contact = contact;
  next();
}

// Register a new emergency contact
router.post('/contact', async (req, res) => {
  const { name, contact, available } = req.body;
  try {
    const newContact = new EmergencyContact({ name, contact, available });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Get all emergency contacts
router.get('/contact', async (req, res) => {
  try {
    const contacts = await EmergencyContact.find();
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get a specific emergency contact
router.get('/contact/:id', getEmergencyContact, (req, res) => {
  res.json(res.contact);
});

// Update an emergency contact
router.patch('/contact/:id', getEmergencyContact, async (req, res) => {
  const { name, contact, available } = req.body;
  if (name != null) {
    res.contact.name = name;
  }
  if (contact != null) {
    res.contact.contact = contact;
  }
  if (available != null) {
    res.contact.available = available;
  }
  try {
    const updatedContact = await res.contact.save();
    res.json(updatedContact);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Delete an emergency contact
router.delete('/contact/:id', getEmergencyContact, async (req, res) => {
  try {
    await res.contact.remove();
    res.json({ message: 'Emergency contact deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
