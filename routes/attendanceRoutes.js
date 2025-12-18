const express = require('express');
const attendanceController = require('../controllers/attendanceController');

const router = express.Router();


router.post('/add', attendanceController.addAttendance);

router.get('/', attendanceController.getAllAttendance);
router.get('/:id', attendanceController.getAttendanceById);
router.put('/:id', attendanceController.updateAttendance);
router.delete('/:id', attendanceController.deleteAttendance);

module.exports = router;
