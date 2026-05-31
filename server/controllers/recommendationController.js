const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');

// GET /api/recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const enrollments = await Enrollment.find({ user: req.user._id });
    const enrolledCourseIds = enrollments.map(e => e.course.toString());

    // Score-based recommendation engine
    const allCourses = await Course.find({ _id: { $nin: enrolledCourseIds } });

    const scored = allCourses.map(course => {
      let score = 0;
      const reasons = [];

      // 1. Interest match (highest weight)
      const interestMatch = user.interests.filter(i => course.category.toLowerCase().includes(i.toLowerCase()) || course.tags.some(t => t.toLowerCase().includes(i.toLowerCase())));
      if (interestMatch.length > 0) { score += interestMatch.length * 30; reasons.push(`Matches your interest in ${interestMatch[0]}`); }

      // 2. Skill match
      const skillMatch = (user.skills || []).filter(s => course.tags.some(t => t.toLowerCase().includes(s.toLowerCase())));
      if (skillMatch.length > 0) { score += skillMatch.length * 20; reasons.push(`Builds on your ${skillMatch[0]} skill`); }

      // 3. Level match
      if (course.level === user.level) { score += 25; reasons.push('Matches your experience level'); }
      if (user.level === 'beginner' && course.level === 'intermediate') score += 10; // stretch goal

      // 4. Popularity boost
      score += Math.min(course.enrolledCount / 100, 10);
      score += course.rating * 2;

      // 5. Featured boost
      if (course.featured) { score += 15; reasons.push('Featured course'); }

      return { course, score, reason: reasons[0] || 'Recommended for you' };
    });

    // Sort by score, take top 8
    scored.sort((a, b) => b.score - a.score);
    const recommendations = scored.slice(0, 8).map(s => ({ ...s.course.toObject(), recommendReason: s.reason, score: Math.round(s.score) }));

    // Trending: most enrolled recently
    const trending = await Course.find({ _id: { $nin: enrolledCourseIds } }).sort({ enrolledCount: -1 }).limit(4);

    // Category-based: same as most enrolled category
    let categoryRecs = [];
    if (enrollments.length > 0) {
      const enrolledCourses = await Course.find({ _id: { $in: enrolledCourseIds } });
      const categoryCount = {};
      enrolledCourses.forEach(c => { categoryCount[c.category] = (categoryCount[c.category] || 0) + 1; });
      const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0];
      if (topCategory) categoryRecs = await Course.find({ category: topCategory, _id: { $nin: enrolledCourseIds } }).limit(4);
    }

    res.json({ success: true, recommendations, trending, categoryBased: categoryRecs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
