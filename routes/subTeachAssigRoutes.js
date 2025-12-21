const express = require('express');
const subTeachAssignmentController = require('../controllers/subTeachAssigController');

const router = express.Router();


router.post('/add', subTeachAssignmentController.addSubTeachAssignment);

router.get('/', subTeachAssignmentController.getAllSubTeachAssignment);
router.get('/:id', subTeachAssignmentController.getSubTeachAssignmentById);
router.put('/:id', subTeachAssignmentController.updateSubTeachAssignment);


router.put('/:id/rate', subTeachAssignmentController.rateTeacher);


router.delete('/:id', subTeachAssignmentController.deleteSubTeachAssignment);

//جلب المواد المدرسين التقييمات لطالب معين

router.get("/student/:studentId", subTeachAssignmentController.getByStudent);

module.exports = router;