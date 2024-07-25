import React, { useState } from 'react';

const teachers = [
  { id: 1, name: 'Teacher A' },
  { id: 2, name: 'Teacher B' },
  { id: 3, name: 'Teacher C' },
];

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);

  const bookAppointment = (teacher) => {
    setAppointments([...appointments, { teacher, status: 'Pending' }]);
  };

  return (
    <div className="form-container">
      <h2>Book Appointment</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            {teacher.name} <button onClick={() => bookAppointment(teacher)}>Book</button>
          </li>
        ))}
      </ul>
      <h2>Your Appointments</h2>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>
            {appointment.teacher.name} - {appointment.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointment;
