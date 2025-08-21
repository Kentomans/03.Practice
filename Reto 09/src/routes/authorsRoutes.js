import express from 'express';
import {
    getAllAuthors,
    getAuthorbyId,
    createAuthor,
    updateAuthor,
    deleteAuthor
} from '../controllers/authorController.js';

const router = express.Router();

router.get('/authors', getAllAuthors);
router.get('/authors/:id', getAuthorbyId); 
router.post('/authors', createAuthor);
router.put('/authors/:id', updateAuthor);
router.delete('/authors/:id', deleteAuthor)

export default router;