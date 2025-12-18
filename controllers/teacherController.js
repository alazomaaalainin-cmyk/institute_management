const Teacher = require('../models/Teacher');
const bcrypt = require('argon2');

// إضافة أستاذ
exports. addTeacher = async (req, res) => {
  const { name, subject_id,phone_number, email,password ,role } = req.body;
const hashed = await bcrypt.hash(password);
  try {
    const teacher = await Teacher.create({ name, subject_id,phone_number, email, password:hashed,role });
    await teacher.save();
    res.status(201).json({ message: 'Teacher added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
/*exports.addTeacher = async (req, res) => {
    try {
        const teacher = new Teacher(req.body);
        await teacher.save();
        res.status(201).json(teacher);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};*/

//  جلب جميع المعلمين 
exports.getAllTeacher= async (req, res) => {
    try {
        const teacher = await Teacher.find();
        res.json(teacher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// جلب معلم حسب ID
exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
        res.json(teacher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// تعديل  معلم
exports.updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
        res.json(teacher);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// حذف معلم  
exports.deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
        res.json({ message: 'Teacher deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



