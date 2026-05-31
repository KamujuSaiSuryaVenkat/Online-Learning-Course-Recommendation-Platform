const express = require('express');
const r = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

r.get('/leaderboard', protect, async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 }).limit(10).select('name totalPoints streak level');
    res.json({ success: true, users });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = r;
