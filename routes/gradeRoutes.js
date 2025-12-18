const express = require('express');
const gradeController = require('../controllers/gradeController');

const router = express.Router();


router.post('/add', gradeController.addGrade);

router.get('/', gradeController.getAllGrade);
router.get('/:id', gradeController.getGradeById);
router.put('/:id', gradeController.updateGrade);
router.delete('/:id', gradeController.deleteGrade);

module.exports = router;
