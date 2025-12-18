const express = require('express');
const  teacherController = require('../controllers/teacherController');
//const authMiddleware = require('../middlewares/authMiddleware');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const router = express.Router();

// مسار إضافة معلم جديد
//router.post('/add teacher', authorizeMiddleware, addTeacher);
router.post('/add',teacherController.addTeacher);

router.get('/', teacherController.getAllTeacher);
router.get('/:id', teacherController.getTeacherById);
router.put('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;