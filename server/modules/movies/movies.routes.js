import express from 'express';
import moviesControllers from './movies.controllers.js';
import { uploadImageSingle } from '../../middlewares/multer.js';

const router = express.Router();

router.get('/', moviesControllers.getAll);

router.post('/', uploadImageSingle('posters'), moviesControllers.createMovie);

export default router;