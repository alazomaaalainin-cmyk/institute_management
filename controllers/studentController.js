const Student = require('../models/Student');
const bcrypt = require('argon2');

// إضافة طالب جديد
exports. addStudent = async (req, res) => {
  const { name, gender, phone_number, class_level, email, password ,role} = req.body;
 const hashed = await bcrypt.hash(password);
  try {
    const student = await Student.create({ name, gender, phone_number, class_level, email, password:hashed,role });
    await student.save();
    res.status(201).json({ message: 'Student added successfully(registered)' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/*exports.addStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};*/

// جلب جميع الطلابب 
exports.getAllStudent= async (req, res) => {
    try {
        const student = await Student.find();
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// جلب طالب حسب ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// تعديل  طالب
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// حذف طالب 
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
