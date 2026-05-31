const Course = require('../models/Course');

// GET /api/courses
exports.getCourses = async (req, res) => {
  try {
    const { category, level, search, sort, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (category && category !== 'all') filter.category = category;
    if (level && level !== 'all') filter.level = level;
    if (search) filter.$or = [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }, { tags: { $in: [new RegExp(search, 'i')] } }];
    const sortMap = { popular: { enrolledCount: -1 }, rating: { rating: -1 }, newest: { createdAt: -1 }, price: { price: 1 } };
    const sortBy = sortMap[sort] || { enrolledCount: -1 };
    const skip = (page - 1) * limit;
    const [courses, total] = await Promise.all([Course.find(filter).sort(sortBy).skip(skip).limit(Number(limit)), Course.countDocuments(filter)]);
    res.json({ success: true, courses, total, pages: Math.ceil(total / limit), currentPage: Number(page) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/courses/:id
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/courses/featured
exports.getFeatured = async (req, res) => {
  try {
    const courses = await Course.find({ featured: true }).limit(6);
    res.json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/courses (admin)
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
