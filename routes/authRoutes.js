const express = require('express');
const  authController= require('../controllers/authController');
//const register= require('../controllers/authController');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const router = express.Router();

// مسار تسجيل الدخول
router.post('/loginstu', authController.loginstudent,authorizeMiddleware);
router.post('/regstu', authController.registerstudent);
router.post('/logintea', authController.loginteacher,authorizeMiddleware);
router.post('/regtea', authController.registerteacher);

module.exports = router;