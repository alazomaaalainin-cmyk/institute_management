const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  
   subTeachAssignment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SubTeachAssignment', required: true },
  date: { type: Date, required: true },
  attendance_status: { type: String, required: true }, // حضور أو غياب
},
 {timestamps:true});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;