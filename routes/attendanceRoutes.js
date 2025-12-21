const express = require('express');
const attendanceController = require('../controllers/attendanceController');

const router = express.Router();


router.post('/add', attendanceController.addAttendance);

router.get('/', attendanceController.getAllAttendance);
router.get('/:id', attendanceController.getAttendanceById );

router.get('/student/:studentId', attendanceController.getAttendanceForStudent );

// الحصول على نسبة الحضور للطالب
router.get('/:studentId', attendanceController.getAttendancePercentage);

router.put('/:id', attendanceController.updateAttendance);
router.delete('/:id', attendanceController.deleteAttendance);


module.exports = router;
