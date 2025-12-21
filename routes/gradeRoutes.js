const express = require('express');
const gradeController = require('../controllers/gradeController');

const router = express.Router();


router.post('/add', gradeController.addGrade);

router.get('/', gradeController.getAllGrade);
router.get('/:id', gradeController.getGradeById);


router.get('/student/:studentId', gradeController.getGradesForStudent);


router.put('/:id', gradeController.updateGrade);
router.delete('/:id', gradeController.deleteGrade);

// الحصول على الدرجات والمعدل التراكمي بناءً على المواد المختارة
router.get('/:studentId/grades', gradeController.getGradesAndSubjects);


module.exports = router;
