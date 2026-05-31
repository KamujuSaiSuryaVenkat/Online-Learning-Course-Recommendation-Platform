const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: String,
  duration: Number, // in minutes
  type: { type: String, enum: ['video', 'article', 'quiz'], default: 'video' },
  order: Number
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  instructorAvatar: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  category: { type: String, required: true }, // 'AI', 'Web Development', 'Data Science', 'Cybersecurity', 'Cloud', 'Mobile'
  tags: [{ type: String }],
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  price: { type: Number, default: 0 },
  isFree: { type: Boolean, default: true },
  duration: { type: Number, default: 0 }, // total hours
  lessons: [lessonSchema],
  totalLessons: { type: Number, default: 0 },
  rating: { type: Number, default: 4.0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  enrolledCount: { type: Number, default: 0 },
  language: { type: String, default: 'English' },
  certificate: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  skills: [{ type: String }], // skills learner gains
  prerequisites: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
