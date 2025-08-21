import Review from "../models/review.js";
import Book from "../models/book.js";

async function getAllReviews(req, res) {
    try {
        const reviews = await Review.findAll({
            include: {
                model: Book,
                attributes: ["id", "title", "genre"]
            }
        });
        res.json(reviews);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getReviewById(req, res) {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const review = await Review.findByPk(id, {
            include: {
                model: Book,
                attributes: ["id", "title", "genre"]
            }
        });

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createReview(req, res) {
    try {
        const { comment, punctuation, bookId } = req.body;

        if (!comment || !punctuation || !bookId) {
            return res.status(400).json({ message: "Missing parameters" });
        }

        const newReview = await Review.create({
            comment,
            punctuation,
            bookId,
            dateReview: new Date()
        });

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateReview(req, res) {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const { comment, punctuation, bookId } = req.body;

        if (!comment || !punctuation || !bookId) {
            return res.status(400).json({ message: "Missing parameters" });
        }

        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        await review.update({ comment, punctuation, bookId, dateReview: new Date() });

        res.status(200).json(review);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteReview(req, res) {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        await review.destroy();

        res.status(204).send();

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
}        