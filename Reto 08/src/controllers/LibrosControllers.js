import mongoose from "mongoose";
import Book from "../models/book.js";

async function getAllBooks(req, res) {
    try {
        const books = await Book.find().populate('authorId', 'name nationality');
        res.json(books);

    } catch (error) {
        res.status(500).json({ error });
    }
}

async function getBookbyId(req, res) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const book = await Book.findById(id)
            .populate('authorId', 'name nationality')
            .populate('reviews');

        if (!book) {
            return res.status(404).json({ message: 'book not found' })
        }

        res.json(book);
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function createBook(req, res) {
    try {
        const { title, year, genre, authorId } = req.body;

        if (!title || !year || !genre || !authorId) {
            return res.status(400).json({ message: 'missing parameters' });
        }

        const newBook = await Book.create({
            title,
            year,
            genre,
            authorId
        });

        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function updateBook(req, res) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const { title, year, genre, authorId } = req.body;

        if (!title || !year || !genre || !authorId) {
            return res.status(400).json({ message: 'missing parameters' });
        }

        const updatedBook = await Book.findByIdAndUpdate(id,
            { title, year, genre, authorId },
            { new: true }
        )

        if (updatedBook) {
            res.status(200).json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' })
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}

async function deleteBook(req, res) {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const deletedBook = await Book.findByIdAndDelete(id);

        if (deletedBook) {
            return res.status(204).send()
        } else {
            return res.status(404).json({ message: 'Book not found' })
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}

export {
    getAllBooks,
    getBookbyId,
    createBook,
    updateBook,
    deleteBook
}