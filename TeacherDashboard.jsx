import React, { useState } from 'react';

const initialAppointments = [
  { id: 1, student: 'Student A', status: 'Pending' },
  { id: 2, student: 'Student B', status: 'Pending' },
];

const TeacherDashboard = () => {
  const [appointments, setAppointments] = useState(initialAppointments);

  const handleAction = (id, action) => {
    setAppointments(appointments.map(app => app.id === id ? { ...app, status: action } : app));
  };

  return (
    <div className="form-container">
      <h2>Teacher Dashboard</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.student} - {appointment.status}
            {appointment.status === 'Pending' && (
              <>
                <button onClick={() => handleAction(appointment.id, 'Approved')}>Approve</button>
                <button onClick={() => handleAction(appointment.id, 'Rejected')}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDashboard;
