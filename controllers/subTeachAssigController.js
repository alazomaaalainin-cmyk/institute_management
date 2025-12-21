const SubTeachAssignment = require('../models/SubTeachAssignment');
const Grade = require('../models/Grade');

// إضافة اختيار طالب للاستاذ
exports.addSubTeachAssignment = async (req, res) => {
  const {student_id,teacher_id,rating,comments} = req.body;
try {
    const subTeachAssignment = new SubTeachAssignment({ student_id,teacher_id,rating,comments });
    await subTeachAssignment.save();
    res.status(201).json({ message: 'SubTeachAssignment added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


//  جلب جميع الاختيارات 
exports.getAllSubTeachAssignment= async (req, res) => {
    try {
        const subTeachAssignment = await SubTeachAssignment.find();
        res.json(subTeachAssignment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// جلب عدد الموادوالمدرسين على حسب الختيار
exports.getSubTeachAssignmentById = async (req, res) => {
    try {
        const studentSubjects = await SubTeachAssignment.find({student_id:req.params.studentId}).populate( 'student_id teacher_id');
        
        const countsubject=studentSubjects.length;

        if(countsubject===0){
            return res.status(400).json({message:'لم يتم اختيار المادة'})
        }
        res.json(studentSubjects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// تعديل  الاختيار
exports.updateSubTeachAssignment = async (req, res) => {
    try {
        const subTeachAssignment = await SubTeachAssignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subTeachAssignment) return res.status(404).json({ message: 'SubTeachAssignment not found' });
        res.json(subTeachAssignment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// حذف الاختيار  
exports.deleteSubTeachAssignment = async (req, res) => {
    try {
        const subTeachAssignment = await SubTeachAssignment.findByIdAndDelete(req.params.id);
        if (!subTeachAssignment) return res.status(404).json({ message: 'SubTeachAssignment not found' });
        res.json({ message: 'SubTeachAssignment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getByStudent = async (req, res) => {
  const assignments = await SubTeachAssignment.find({ student_id: req.params.studentId })
    .populate("subject_id")
    .populate("teacher_id");
  res.json(assignments);
};

exports.rateTeacher = async (req, res) => {
  const { rating, comments } = req.body;
  const assignment = await SubTeachAssignment.findById(req.params.id);
  if (!assignment) return res.status(404).json({ message: "غير موجود" });

  assignment.rating = rating;
  assignment.comments = comments;
  await assignment.save();

  res.json({ message: "تم حفظ التقييم" });
};