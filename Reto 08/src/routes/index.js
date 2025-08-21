import express from 'express';
import librosRoutes from './librosRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import authorRoutes from './authorsRoutes.js';

const router = express.Router();

router.use(librosRoutes);
router.use(reviewRoutes)
router.use(authorRoutes)

export default router;