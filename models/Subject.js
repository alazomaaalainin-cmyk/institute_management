const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: String, required: true }, // مثل تاسع، بكالوريا علمي أو أدبي
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;