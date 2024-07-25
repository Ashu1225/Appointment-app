import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import TeacherLogin from './components/TeacherLogin';
import TeacherRegister from './components/TeacherRegister';
import StudentLogin from './components/StudentLogin';
import StudentRegister from './components/StudentRegister';
import Appointment from './components/Appointment';
import TeacherDashboard from './components/TeacherDashboard';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/register" element={<TeacherRegister />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/appointment" element={<Appointment />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
