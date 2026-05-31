const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, getFeatured, createCourse } = require('../controllers/courseController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getCourses);
router.get('/featured', getFeatured);
router.get('/:id', getCourseById);
router.post('/', protect, adminOnly, createCourse);

module.exports = router;
