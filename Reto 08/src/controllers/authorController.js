import mongoose from "mongoose";
import Author from "../models/author.js";

async function getAllAuthors(req, res) {
    try {
        const authors = await Author.find({}, "name nationality dateBirth");
        res.json(authors);

    } catch (error) {
        res.status(500).json({ error });
    }
}

async function getAuthorbyId(req, res) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const author = await Author.findById(id);

        if (!author) {
            return res.status(404).json({ message: 'Author not found' })
        }

        res.json(author);
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function createAuthor(req, res) {
    try {
        const { name, nationality, dateBirth } = req.body;

        if (!name || !nationality || !dateBirth) {
            return res.status(400).json({ message: 'missing parameters' });
        }

        const newAuthor = await Author.create({
            name,
            nationality,
            dateBirth,
        });

        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function updateAuthor(req, res) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const { name, nationality, dateBirth } = req.body;

        if (!name || !nationality || !dateBirth) {
            return res.status(400).json({ message: 'missing parameters' });
        }

        const updatedAuthor = await Author.findByIdAndUpdate(id,
            { name, nationality, dateBirth },
            { new: true }
        )

        if (updatedAuthor) {
            res.status(200).json(updatedAuthor);
        } else {
            res.status(404).json({ message: 'Author not found' })
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}

async function deleteAuthor(req, res) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const deletedAuthor = await Author.findByIdAndDelete(id);

        if (deletedAuthor) {
            return res.status(204).send()
        } else {
            return res.status(404).json({ message: 'Author not found' })
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}

export {
    getAllAuthors,
    getAuthorbyId,
    createAuthor,
    updateAuthor,
    deleteAuthor
}        