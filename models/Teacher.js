const mongoose = require('mongoose');


const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password:{type:String,required:true },
  role: {
    type: String,
    enum: ['student', 'teacher', 'moderator'],
    default: 'teacher'}
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;