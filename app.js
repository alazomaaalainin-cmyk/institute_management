
const express = require('express');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB=require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const subjectRoutes = require('./routes/subjectRoutes'); 
const subTeachAssigRoutes = require('./routes/subTeachAssigRoutes'); 

const attendanceRoutes = require('./routes/attendanceRoutes');
const gradeRoutes = require('./routes/gradeRoutes');



const corsOptions = {
  origin: 'http://localhost:3000', // اسم نطاق الواجهة الأمامية
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // طرق HTTP المسموح بها
  allowedHeaders: ['Content-Type', 'Authorization'], // رؤوس (Headers) مسموح بها
};
// لتجنب مشاكل CORS في الواجهات الأمامية




const app = express();
connectDB();
dotenv.config();
app.use(bodyParser.json()); 
 // لتجنب مشاكل CORS في الواجهات الأمامية


  app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/subTeachAssignment', subTeachAssigRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/grades', gradeRoutes);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
