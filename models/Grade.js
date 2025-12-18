const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  
  subTeachAssignment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SubTeachAssignment', required: true },
  grade: { type: Number, required: true },
  statuse:{type:String,  required:true}

});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
