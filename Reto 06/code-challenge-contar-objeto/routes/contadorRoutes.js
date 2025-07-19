import express from 'express';
import contarPropiedades from '../controllers/contarController.js';

const router = express.Router();

router.post('/contar', contarPropiedades);

export default router;

