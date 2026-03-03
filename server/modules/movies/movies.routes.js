import express from 'express';
import moviesControllers from './movies.controllers.js';

const router = express.Router();

router.get('/', moviesControllers.getAll);

export default router;