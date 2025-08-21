import mongoose from "mongoose";
import Review from "../models/review.js";
import Book from "../models/book.js";

async function getAllReviews(req, res) {
    try {
        const reviews = await Review.find().populate('bookId', 'title genre');
        res.json(reviews);

    } catch (error) {
        res.status(500).json({ error });
    }
}

async function getReviewbyId(req, res) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' })
        }

        res.json(review);
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function createReview(req, res) {
    try {
        const { comment, punctuation, bookId } = req.body;

        const dateReview = new Date();

        if (!comment || !punctuation || !bookId) {
            return res.status(400).json({ message: 'missing parameters' });
        }

        const newReview = await Review.create({
            comment,
            punctuation,
            dateReview,
            bookId
        });

        await Book.findByIdAndUpdate(bookId, { $push: { reviews: newReview._id } });

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function updateReview(req, res) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const { comment, punctuation, bookId } = req.body;

        const dateReview = new Date();


        if (!comment || !punctuation || !bookId) {
            return res.status(400).json({ message: 'missing parameters' });
        }

        const updatedReview = await Review.findByIdAndUpdate(id,
            { comment, punctuation, dateReview, bookId },
            { new: true }
        )

        if (updatedReview) {
            res.status(200).json(updatedReview);
        } else {
            res.status(404).json({ message: 'Review not found' })
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}

async function deleteReview(req, res) {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const deletedReview = await Review.findByIdAndDelete(id);

        if (deletedReview) {
            return res.status(204).send()
        } else {
            return res.status(404).json({ message: 'Review not found' })
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}

export {
    getAllReviews,
    getReviewbyId,
    createReview,
    updateReview,
    deleteReview
}        