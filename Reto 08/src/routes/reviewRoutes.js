import express from 'express';
import {
    getAllReviews,
    getReviewbyId,
    createReview,
    updateReview,
    deleteReview
} from '../controllers/reviewControllera.js';

const router = express.Router();

router.get('/reviews', getAllReviews);
router.get('/reviews/:id', getReviewbyId); 
router.post('/reviews', createReview);
router.put('/reviews/:id', updateReview);
router.delete('/reviews/:id', deleteReview)

export default router;