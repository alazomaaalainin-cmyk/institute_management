const express = require('express');
const subjectController = require('../controllers/subjectController');

const router = express.Router();


router.post('/add', subjectController.addSubject);

router.get('/', subjectController.getAllSubject);
router.get('/:id', subjectController.getSubjectById);
router.put('/:id', subjectController.updateSubject);
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;
