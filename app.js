const express = require('express');
const app = express();
require('dotenv').config();
const db=require('./configs/mongoose')
db()

app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});