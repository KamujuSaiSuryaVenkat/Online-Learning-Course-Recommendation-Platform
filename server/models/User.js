const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  role: { type: String, enum: ['learner', 'instructor', 'admin'], default: 'learner' },
  interests: [{ type: String }], // e.g., ['AI', 'Web Development', 'Data Science']
  skills: [{ type: String }],
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  totalPoints: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastActiveDate: { type: Date, default: Date.now },
  achievements: [{ title: String, icon: String, earnedAt: Date }],
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
