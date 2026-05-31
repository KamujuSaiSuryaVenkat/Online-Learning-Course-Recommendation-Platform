const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'careerflow_secret_2024', { expiresIn: '30d' });

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, interests, level } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ success: false, message: 'Email already exists' });
    const user = await User.create({ name, email, password, interests: interests || [], level: level || 'beginner' });
    res.status(201).json({ success: true, token: generateToken(user._id), user: { _id: user._id, name: user.name, email: user.email, interests: user.interests, level: user.level, role: user.role, totalPoints: user.totalPoints, streak: user.streak } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    // Update streak logic
    const today = new Date().toDateString();
    const lastActive = new Date(user.lastActiveDate).toDateString();
    if (today !== lastActive) {
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      user.streak = yesterday.toDateString() === lastActive ? user.streak + 1 : 1;
      user.lastActiveDate = new Date();
      await user.save();
    }
    res.json({ success: true, token: generateToken(user._id), user: { _id: user._id, name: user.name, email: user.email, interests: user.interests, level: user.level, role: user.role, totalPoints: user.totalPoints, streak: user.streak, bio: user.bio } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/auth/me
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json({ success: true, user });
};

// PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, interests, skills, level } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, bio, interests, skills, level }, { new: true }).select('-password');
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
