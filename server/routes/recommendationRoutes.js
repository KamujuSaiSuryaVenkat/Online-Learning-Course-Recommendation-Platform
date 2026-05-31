const express = require('express');
const r = express.Router();
const { getRecommendations } = require('../controllers/recommendationController');
const { protect } = require('../middleware/authMiddleware');
r.get('/', protect, getRecommendations);
module.exports = r;
