import Book from "../models/book.js";
import Author from "../models/author.js";
import Review from "../models/review.js";

async function getAllBooks(req, res) {
    try {
        const books = await Book.findAll({
            include:{
                model:Author,
                attributes: ['id', 'name', 'nationality']
            }
        });
        res.json(books);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getBookbyId(req, res) {
    try {
        const id = parseInt(req.params.id);

        if(isNaN(id)){
           return res.status(400).json({ message: 'Id invalid'});
        }

        const book = await Book.findByPk(id, {
            include: [
                {
                    model: Author,
                    attributes: ['id', 'name', 'nationality']
                },
                {
                    model:Review,
                    attributes: ['id', 'comment', 'punctuation', 'dateReview']
                }
            ] 
        });
            

        if (!book) {
            return res.status(404).json({ message: 'book not found' })
        }

        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        const id = parseInt(req.params.id);

        if(isNaN(id)){
           return res.status(400).json({ message: 'Id invalid'})
        }

        const { title, year, genre, authorId } = req.body;

        if (!title || !year || !genre || !authorId) {
            return res.status(400).json({ message: 'missing parameters' });
        }

        const book = await Book.findByPk(id);
        if(!book){
           return res.status(404).json({ message: 'Book Not found'})
        }

        await book.update({ title, year, genre, authorId});

        res.status(200).json(book)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteBook(req, res) {
    try {
        const id = parseInt(req.params.id);

        if(isNaN(id)){
           return res.status(400).json({ message: 'Id invalid'})
        }

        const book = await Book.findByPk(id);
        if(!book){
           return res.status(404).json({ message: 'Book Not found'})
        }

        await book.destroy();
        return res.status(204).send();

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    getAllBooks,
    getBookbyId,
    createBook,
    updateBook,
    deleteBook
}