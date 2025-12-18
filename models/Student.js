const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  phone_number: { type: String, required: true },
  class_level: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'teacher', 'moderator'],
    default: 'student'}},
    {timestamps:true});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;