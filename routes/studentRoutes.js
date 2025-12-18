const express = require('express');
const studentController = require('../controllers/studentController');
//const authMiddleware = require('../middlewares/authMiddleware');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const router = express.Router();

// مسار إضافة طالب جديد
//router.post('/add',authorizeMiddleware, studentController.addStudent);
router.post('/add', studentController.addStudent);

router.get('/', studentController.getAllStudent);
router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
