const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'MERN Blog API is running' });
});

// Posts route
app.get('/api/posts', (req, res) => {
  res.json([
    { id: 1, title: 'First Post', body: 'Hello from MERN stack!' },
    { id: 2, title: 'Second Post', body: 'Building with MongoDB, Express, React, Node' },
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
