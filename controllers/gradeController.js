const Grade = require('../models/Grade');
const SubTeachAssignment = require('../models/SubTeachAssignment');
const Subject = require('../models/Subject');

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

//  جلب العلامة حسب id
exports.getGradeById = async (req, res) => {
    try {
        const grade = await Grade.findById(req.params.student_id);
        if (!grade) return res.status(404).json({ message: 'Grade not found' });
        res.json(grade);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// تعديل  علامة
exports.updateGrade = async (req, res) => {
    try {
        const grade = await Grade.findByIdAndUpdate(req.params.student_id, req.body, { new: true });
        if (!grade) return res.status(404).json({ message: 'Grade not found' });
        res.json(grade);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// حذف علامة  
exports.deleteGrade = async (req, res) => {
    try {
        const grade = await Grade.findByIdAndDelete(req.params.student_id);
        if (!grade) return res.status(404).json({ message: 'Grade not found' });
        res.json({ message: 'Grade deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// تحليل المواد والعلامات
exports.getGradesAndSubjects = async (req, res) => {
 // const studentId = req.params.studentId;

  try {
    // الحصول على جميع المواد التي اختارها الطالب مع المدرس
    const studentSubjects = await SubTeachAssignment.findOne( {student_id:req.params.studentId} )
      .populate('subject_id teacher_id');

    const subjectsCount = studentSubjects.length;

    if (subjectsCount === 0) {
      return res.status(400).json({ message: 'لم يتم اختيار أي مادة' });
    }

    // حساب نسبة الدرجات لكل مادة والمعدل التراكمي
    let totalMarksObtained = 0;
    let totalMaxMarks = 0;
    const subjectDetails = [];

    for (const studentSubject of studentSubjects) {
      const subject = studentSubject.subject_id;
      const teacher = studentSubject.teacher_id;

      // الحصول على الدرجات الخاصة بالطالب لهذه المادة (مع المدرس)
      const grade = await Grade.findOne({subTeachAssignment: studentSubject._id });
      if (grade) {
        const subjectMarks = subject.totalMarks;
        const marksObtained = grade.marksObtained;

        // حساب النسبة المئوية للدرجات لكل مادة
        const percentage = (marksObtained / subjectMarks) * 100;

        subjectDetails.push({
          subjectName: subject.name,
          teacherName: teacher.name,
          marksObtained,
          subjectMarks,
          percentage
        });

        totalMarksObtained += marksObtained;
        totalMaxMarks += subjectMarks;
      }
    }

    // حساب المعدل التراكمي بناءً على الدرجات
    const cumulativeGPA = (totalMarksObtained / totalMaxMarks) * 100;

    return res.status(200).json({
      cumulativeGPA,
      subjectsCount,
      subjectDetails
      
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'خطأ في حساب الدرجات' });
  }
};

exports.getGradesForStudent = async (req, res) => {
  const assignments = await SubTeachAssignment.find({ student_id: req.params.studentId });
  const ids = assignments.map(a => a._id);
  const grades = await Grade.find({ subTeachAssignment_id: { $in: ids } });
  res.json(grades);
};
