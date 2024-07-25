const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// In-memory storage (for demonstration purposes)
let users = [];
let appointments = [];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Utility function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, 'secret', { expiresIn: '1h' });
};

// Registration Route
app.post('/api/users/register', async (req, res) => {
  const { name, email, password, role, institute } = req.body;

  try {
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { id: users.length + 1, name, email, password: hashedPassword, role, institute };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
});

// Login Route
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Book Appointment Route
app.post('/api/appointments/book', authenticateToken, (req, res) => {
  const { studentId, teacherId, date } = req.body;

  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const newAppointment = { id: appointments.length + 1, studentId, teacherId, date, status: 'Pending' };
    appointments.push(newAppointment);

    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error booking appointment', error });
  }
});

// Get Appointments for a Teacher Route
app.get('/api/appointments/teacher/:id', authenticateToken, (req, res) => {
  const teacherId = parseInt(req.params.id, 10);

  try {
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const teacherAppointments = appointments.filter(app => app.teacherId === teacherId);
    
    res.json(teacherAppointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update Appointment Route
app.put('/api/appointments/:id', authenticateToken, (req, res) => {
  const appointmentId = parseInt(req.params.id, 10);
  const { status } = req.body;

  try {
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const appointment = appointments.find(app => app.id === appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status;

    res.json({ message: 'Appointment updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error updating appointment', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
