import express from 'express';
import genresControllers from './genres.controllers.js';

const router = express.Router();

router.get('/', genresControllers.getAllGenres);

export default router;