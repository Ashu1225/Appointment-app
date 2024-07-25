import React from 'react';

const StudentRegister = () => {
  return (
    <div className="form-container">
      <h2>Student Registration</h2>
      <form>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Phone Number" required />
        <input type="text" placeholder="Institute Name" required />
        <button type="submit">Register</button>
      </form>
      <a href="/student/login">Login</a>
    </div>
  );
};

export default StudentRegister;
