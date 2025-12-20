const Subject = require('../models/Subject');

// إضافة مادة
exports.addSubject = async (req, res) => {
  const { name, totalmarks, level } = req.body;
try {
    const subject = new Subject({ name, totalmarks, level });
    await subject.save();
    res.status(201).json({ message: 'Subject added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


//  جلب جميع مواد 
exports.getAllSubject= async (req, res) => {
    try {
        const subject = await Subject.find();
        res.json(subject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// جلب مادة حسب ID
exports.getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) return res.status(404).json({ message: 'Subject not found' });
        res.json(subject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// تعديل  مادة
exports.updateSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subject) return res.status(404).json({ message: 'Subject not found' });
        res.json(subject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// حذف مادة  
exports.deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (!subject) return res.status(404).json({ message: 'Subject not found' });
        res.json({ message: 'Subject deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
