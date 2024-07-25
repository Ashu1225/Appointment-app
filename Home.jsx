import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';  // Adjusted the import path

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Learning Portal</h1>
      <div className="button-container">
        <Link to="/teacher/login" className="role-button">Teacher</Link>
        <Link to="/student/login" className="role-button">Student</Link>
      </div>
    </div>
  );
};

export default Home;
