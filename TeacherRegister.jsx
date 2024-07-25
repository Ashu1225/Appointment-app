import React from 'react';

const TeacherRegister = () => {
  return (
    <div className="form-container">
      <h2>Teacher Registration</h2>
      <form>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Phone Number" required />
        <input type="text" placeholder="Institute Name" required />
        <button type="submit">Register</button>
      </form>
      <a href="/teacher/login">Login</a>
    </div>
  );
};

export default TeacherRegister;
