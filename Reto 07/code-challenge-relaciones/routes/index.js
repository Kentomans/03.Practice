import express from 'express';
import calificacionesRoutes from './calificacionesRoutes.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to your API');
});

router.use('/calificaciones', calificacionesRoutes);

export default router;