const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Student application backend running' });
});

app.get('/api/students', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, full_name, email, course_name, phone_number, date_of_birth, application_id, address, city, country, notes, created_at FROM students ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.get('/api/students/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT id, full_name, email, course_name, phone_number, date_of_birth, application_id, address, city, country, notes, created_at FROM students WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching student by id:', error);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

app.post('/api/students', async (req, res) => {
  const {
    full_name,
    email,
    course_name,
    phone_number,
    date_of_birth,
    application_id,
    address,
    city,
    country,
    notes,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO students (
        full_name,
        email,
        course_name,
        phone_number,
        date_of_birth,
        application_id,
        address,
        city,
        country,
        notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, full_name, email, course_name, phone_number, date_of_birth, application_id, address, city, country, notes, created_at`,
      [
        full_name,
        email,
        course_name,
        phone_number,
        date_of_birth,
        application_id,
        address,
        city,
        country,
        notes,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Failed to create student' });
  }
});

app.put('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  const {
    full_name,
    email,
    course_name,
    phone_number,
    date_of_birth,
    application_id,
    address,
    city,
    country,
    notes,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE students SET
        full_name = $1,
        email = $2,
        course_name = $3,
        phone_number = $4,
        date_of_birth = $5,
        application_id = $6,
        address = $7,
        city = $8,
        country = $9,
        notes = $10
      WHERE id = $11
      RETURNING id, full_name, email, course_name, phone_number, date_of_birth, application_id, address, city, country, notes, created_at`,
      [
        full_name,
        email,
        course_name,
        phone_number,
        date_of_birth,
        application_id,
        address,
        city,
        country,
        notes,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
