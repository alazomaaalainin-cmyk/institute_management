const Grade = require('../models/Grade');

// إضافة علامة
exports. addGrade = async (req, res) => {
  const { subTeachAssignment_id,grade,statuse } = req.body;

  try {
    const gradee = new Grade({ subTeachAssignment_id, grade ,statuse});
    await gradee.save();
    res.status(201).json({ message: 'Grade added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


//  جلب جميع العلامات 
exports.getAllGrade= async (req, res) => {
    try {
        const grade = await Grade.find();
        res.json(grade);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// جلب علامة حسب ID
exports.getGradeById = async (req, res) => {
    try {
        const grade = await Grade.findById(req.params.id);
        if (!grade) return res.status(404).json({ message: 'Grade not found' });
        res.json(Grade);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// تعديل  علامة
exports.updateGrade = async (req, res) => {
    try {
        const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!grade) return res.status(404).json({ message: 'Grade not found' });
        res.json(grade);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// حذف علامة  
exports.deleteGrade = async (req, res) => {
    try {
        const grade = await Grade.findByIdAndDelete(req.params.id);
        if (!grade) return res.status(404).json({ message: 'Grade not found' });
        res.json({ message: 'Grade deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

