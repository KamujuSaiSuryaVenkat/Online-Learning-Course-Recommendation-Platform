const Progress = require('../models/Progress');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

// PUT /api/progress/:courseId
exports.updateProgress = async (req, res) => {
  try {
    const { lessonIndex, timeSpent } = req.body;
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    let progress = await Progress.findOne({ user: req.user._id, course: courseId });
    if (!progress) return res.status(404).json({ success: false, message: 'No enrollment found' });
    if (!progress.completedLessons.includes(lessonIndex)) {
      progress.completedLessons.push(lessonIndex);
    }
    const totalLessons = course.totalLessons || course.lessons.length || 1;
    progress.progressPercent = Math.round((progress.completedLessons.length / totalLessons) * 100);
    progress.timeSpent += (timeSpent || 0);
    progress.lastAccessedAt = new Date();
    await progress.save();
    // Award points for lesson completion
    await User.findByIdAndUpdate(req.user._id, { $inc: { totalPoints: 5 } });
    // Mark enrollment complete if 100%
    if (progress.progressPercent >= 100) {
      await Enrollment.findOneAndUpdate({ user: req.user._id, course: courseId }, { status: 'completed', completedAt: new Date(), certificate: true });
      await User.findByIdAndUpdate(req.user._id, { $inc: { totalPoints: 100 } }); // bonus
    }
    res.json({ success: true, progress, message: progress.progressPercent >= 100 ? '🎉 Course completed! Certificate unlocked!' : 'Progress updated +5 points' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/progress/:courseId
exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ user: req.user._id, course: req.params.courseId });
    res.json({ success: true, progress: progress || { progressPercent: 0, completedLessons: [], timeSpent: 0 } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/progress/summary
exports.getSummary = async (req, res) => {
  try {
    const progressList = await Progress.find({ user: req.user._id }).populate('course', 'title category thumbnail');
    const totalTime = progressList.reduce((sum, p) => sum + p.timeSpent, 0);
    const completed = progressList.filter(p => p.progressPercent >= 100).length;
    const avgProgress = progressList.length ? Math.round(progressList.reduce((s, p) => s + p.progressPercent, 0) / progressList.length) : 0;
    res.json({ success: true, summary: { totalCourses: progressList.length, completed, inProgress: progressList.length - completed, totalTimeMinutes: totalTime, avgProgress, progressList } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
