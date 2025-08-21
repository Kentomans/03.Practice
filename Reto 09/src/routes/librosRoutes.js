import express from 'express';
import {
    getAllBooks,
    getBookbyId,
    createBook,
    updateBook,
    deleteBook
} from '../controllers/LibrosControllers.js';

const router = express.Router();

router.get('/libros', getAllBooks);
router.get('/libros/:id', getBookbyId); 
router.post('/libros', createBook);
router.put('/libros/:id', updateBook);
router.delete('/libros/:id', deleteBook)

export default router;