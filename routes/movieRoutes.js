const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const upload=require('../middlewares/validationMiddleware')
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware.authenticateToken, roleMiddleware.ensureAdmin, movieController.createMovie);
router.put('/:id', authMiddleware.authenticateToken, roleMiddleware.ensureAdmin, movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);
router.get('/:id', movieController.getMovieById);
router.get('/', movieController.getAllMovies);
router.get('/search', movieController.searchMovies);
router.post('/:id/upload-poster', upload.single('poster'), movieController.uploadPoster);

router.get('/user/:userId', movieController.getMoviesAddedByUser);
router.get('/trending', movieController.getTrendingMovies);


module.exports = router;
