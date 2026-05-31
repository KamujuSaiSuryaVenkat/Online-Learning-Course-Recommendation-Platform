const express = require('express');
const r = express.Router();
const { updateProgress, getProgress, getSummary } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');
r.get('/summary', protect, getSummary);
r.get('/:courseId', protect, getProgress);
r.put('/:courseId', protect, updateProgress);
module.exports = r;
