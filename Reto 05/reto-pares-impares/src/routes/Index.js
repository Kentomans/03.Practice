import express from 'express';

import filtrar from './filtrar.js';

const router = express.Router();

router.use(filtrar);

export default router;