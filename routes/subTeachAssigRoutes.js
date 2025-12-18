const express = require('express');
const subTeachAssignmentController = require('../controllers/subTeachAssigController');

const router = express.Router();


router.post('/add', subTeachAssignmentController.addSubTeachAssignment);

router.get('/', subTeachAssignmentController.getAllSubTeachAssignment);
router.get('/:id', subTeachAssignmentController.getSubTeachAssignmentById);
router.put('/:id', subTeachAssignmentController.updateSubTeachAssignment);
router.delete('/:id', subTeachAssignmentController.deleteSubTeachAssignment);

module.exports = router;