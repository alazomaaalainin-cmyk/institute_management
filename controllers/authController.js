const express = require('express');
const bcrypt = require('argon2');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');


exports.registerstudent = async (req, res) => {
  const { name,gender,phone_number,class_level, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password);
  
  const student = await Student.create({ name,gender,phone_number,class_level, email, password: hashed, role });
    await student.save();

  res.json({ message: 'Student registered' });
};
exports.registerteacher = async (req, res) => {
  const { name,subject_id,phone_number, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password);
  
  const teacher = await Teacher.create({ name,subject_id,phone_number, email, password: hashed, role });
 await teacher.save();
  res.json({ message: 'Teacher registered' });
};


exports.loginstudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    // التحقق من كلمة السر
    const isMatch = await bcrypt.verify(student.password, password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    
    // توليد التوكن
    const token = jwt.sign({ studentId: student._id, role: student.role }, 
        process.env.JWT_SECRETS,
         { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.loginteacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(400).json({ message: "Teacher not found" });
    }

    // التحقق من كلمة السر
    const isMatch = await bcrypt.verify(teacher.password, password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    
    // توليد التوكن
    const token = jwt.sign({ teacherId: teacher._id, role: teacher.role }, 
        process.env.JWT_SECRETT,
         { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

