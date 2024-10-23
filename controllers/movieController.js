const Movie = require('../models/Movie');
const { upload } = require('../middlewares/validationMiddleware');
const fs = require('fs');
const Activity = require('../models/Activity');

const movieController = {
  createMovie: async (req, res) => {
    try {
      const { title, genre, releaseYear, director, duration, description, rating } = req.body;
      const newMovie = new Movie({
        title,
        genre,
        releaseYear,
        director,
        duration,
        description,
        rating, 
        addedBy: req.user._id, // set addedBy to ID of logged-in user
      });

      await newMovie.save();

      const activity = new Activity({ 
        userId: req.user.id, 
        action: 'Created movie',
        details: newMovie,
      });
      await activity.save();

      res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
    } catch (error) {
      console.error('Error creating movie:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateMovie: async (req, res) => {
    try {
      const movieId = req.params.id;
      const { title, genre, releaseYear, director, duration, description, rating } = req.body;
      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      movie.title = title;
      movie.genre = genre;
      movie.releaseYear = releaseYear;
      movie.director = director;
      movie.duration = duration;
      movie.description = description;
      movie.rating = rating;

      await movie.save();

      res.status(200).json({ message: 'Movie updated successfully', movie });
    } catch (error) {
      console.error('Error updating movie:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteMovie: async (req, res) => {
    try {
      const movieId = req.params.id;

      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      // Delete the poster file if it exists
      if (movie.poster) {
        fs.unlinkSync(movie.poster);
      }

      await movie.remove();

      res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
      console.error('Error deleting movie:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getMovieById: async (req, res) => {
    try {
      const movieId = req.params.id;

      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      res.status(200).json({ movie });
    } catch (error) {
      console.error('Error fetching movie by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllMovies: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const movies = await Movie.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      res.status(200).json({ movies });
    } catch (error) {
      console.error('Error fetching all movies:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  searchMovies: async (req, res) => {
    try {
      const { query } = req.query;

      const movies = await Movie.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { genre: { $regex: query, $options: 'i' } },
          { 'castCrew.director': { $regex: query, $options: 'i' } },
        ],
      });

      res.status(200).json({ movies });
    } catch (error) {
      console.error('Error searching movies:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  uploadPoster: async (req, res) => {
    try {
      // Check if a file is uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'Please upload a poster image' });
      }

      const movieId = req.params.id;
      const movie = await Movie.findById(movieId);

      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      // Delete the previous poster if it exists
      if (movie.poster) {
        fs.unlinkSync(movie.poster);
      }

      // Save the path of the uploaded poster image in the database
      movie.poster = req.file.path;
      await movie.save();

      res.status(200).json({ message: 'Poster uploaded successfully', movie });
    } catch (error) {
      console.error('Error uploading poster:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getMoviesAddedByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const movies = await Movie.find({ addedBy: userId });
      if (!movies) {
        return res.status(404).json({ error: 'No movies found for this user' });
      }
  
      res.status(200).json({ movies });
    } catch (error) {
      console.error('Error fetching movies added by user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getTrendingMovies: async (req, res) => {
    try {
        const movies = await Movie.find().sort({ rating: -1 }).limit(10); // Gets top 10 movies by rating
        if (!movies) {
            return res.status(404).json({ error: 'No trending movies found' });
        }
        res.status(200).json({ movies });
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
},
};

module.exports = movieController;
