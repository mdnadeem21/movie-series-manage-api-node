// models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  director: { type: String, required: true },
  duration: { type: Number, required: true },
  description: { type: String },
  poster: { type: String },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  rating: { type: Number, default: 0 }, // new field
});

module.exports = mongoose.model('Movie', movieSchema);
