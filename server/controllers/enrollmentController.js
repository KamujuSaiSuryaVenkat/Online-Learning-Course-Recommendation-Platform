const Enrollment = require('../models/Enrollment');
const Progress = require('../models/Progress');
const Course = require('../models/Course');
const User = require('../models/User');

// POST /api/enrollments/:courseId
exports.enroll = async (req, res) => {
  try {
    const { courseId } = req.params;
    const existing = await Enrollment.findOne({ user: req.user._id, course: courseId });
    if (existing) return res.status(400).json({ success: false, message: 'Already enrolled' });
    const [enrollment] = await Promise.all([
      Enrollment.create({ user: req.user._id, course: courseId }),
      Progress.create({ user: req.user._id, course: courseId }),
      Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } }),
      User.findByIdAndUpdate(req.user._id, { $inc: { totalPoints: 10 } })
    ]);
    res.status(201).json({ success: true, enrollment, message: 'Enrolled successfully! +10 points' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/enrollments/my
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id }).populate('course').sort({ enrolledAt: -1 });
    const progressData = await Progress.find({ user: req.user._id });
    const progressMap = {};
    progressData.forEach(p => { progressMap[p.course.toString()] = p.progressPercent; });
    const result = enrollments.map(e => ({ ...e.toObject(), progressPercent: progressMap[e.course._id.toString()] || 0 }));
    res.json({ success: true, enrollments: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/enrollments/check/:courseId
exports.checkEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({ user: req.user._id, course: req.params.courseId });
    res.json({ success: true, enrolled: !!enrollment, enrollment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
