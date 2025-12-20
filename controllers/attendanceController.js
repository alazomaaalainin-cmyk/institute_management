const Attendance = require('../models/Attendance');

// إضافة حضور
exports. addAttendance = async (req, res) => {
  const { subTeachAssignment_id,date,attendance_status } = req.body;

  try {
    const attendance = new Attendance({subTeachAssignment_id,date,attendance_status });
    await attendance.save();
    res.status(201).json({ message: 'Attendance added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
//  جلب جميع الحضور 
exports.getAllAttendance= async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.json(attendance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// جلب حضور حسب ID
exports.getAttendanceById = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAttendancePercentage = async (req, res) => {
  const studentId = req.params.studentId;

  try {
    // عدد الأيام التي سجل فيها الطالب حضور
    const presentCount = await Attendance.countDocuments({
      studentId: studentId,
      status: 'present',
    });

    // عدد الأيام التي حضر فيها الطالب بشكل عام
    const totalCount = await Attendance.countDocuments({
      studentId: studentId
    });

    // حساب النسبة
    const attendancePercentage = totalCount > 0
      ? (presentCount / totalCount) * 100
      : 0;

    return res.status(200).json({
      studentId,
      attendancePercentage,
      totalDays: totalCount,
      presentDays: presentCount,
    });
  } catch (error) {
    console.error(error);
     res.status(500).json({  error: err.message });
  }
};


// تعديل  حضور
exports.updateAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
        res.json(attendance);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// حذف حضور  
exports.deleteAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
        res.json({ message: 'Attendance deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


