const express = require('express');
const UserModel = require('../models/userModel'); // Ensure this line is correct and there are no duplicates

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single user by ID
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// CREATE a new user
router.post('/', async (req, res) => {
  const { fullName, username, email, password } = req.body;
  const user = new UserModel({ fullName, username, email, password });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a user
router.patch('/:id', getUser, async (req, res) => {
  const { fullName, username, email, password } = req.body;
  if (fullName != null) res.user.fullName = fullName;
  if (username != null) res.user.username = username;
  if (email != null) res.user.email = email;
  if (password != null) res.user.password = password;
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted User' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await UserModel.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
