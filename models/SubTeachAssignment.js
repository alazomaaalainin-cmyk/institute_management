const mongoose = require('mongoose');

const subTeachAssignmentSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  rating: { type: Number, required: true }, // التقييم من 1 إلى 5
  comments: { type: String }, // التعليق الاختياري
});

const SubTeachAssignment = mongoose.model('SubTeachAssignment', subTeachAssignmentSchema);

module.exports = SubTeachAssignment;