const express = require('express');
const r = express.Router();
const { enroll, getMyEnrollments, checkEnrollment } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');
r.post('/:courseId', protect, enroll);
r.get('/my', protect, getMyEnrollments);
r.get('/check/:courseId', protect, checkEnrollment);
module.exports = r;
