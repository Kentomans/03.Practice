import Author from "../models/author.js";

async function getAllAuthors(req, res) {
    try {
        const authors = await Author.findAll({
            attributes: ['id', 'name', 'nationality', 'dateBirth']
        });
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAuthorbyId(req, res) {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Id invalid' })
        }

        const author = await Author.findByPk(id);

        if (!author) {
            return res.status(404).json({ message: 'Author not found' })
        }

        res.json(author);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createAuthor(req, res) {
    try {
        const { name, nationality, dateBirth } = req.body;

        if (!name || !nationality) {
            return res.status(400).json({ message: 'missing parameters' });
        }

        const newAuthor = await Author.create({
            name,
            nationality,
            dateBirth: dateBirth || null,
        });

        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateAuthor(req, res) {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Id invalid' })
        }

        const { name, nationality, dateBirth } = req.body;

        if (!name || !nationality) {
            return res.status(400).json({ message: 'missing parameters' });
        }

        const author = await Author.findByPk(id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' })
        }

        await author.update({ name, nationality, dateBirth: dateBirth || null });

        res.status(200).json(author);


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteAuthor(req, res) {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Id invalid' })
        }

        const author = await Author.findByPk(id);
        if (!author) {
            return res.status(404).json({ message: 'Not found' });
        }
        await author.destroy();
        return res.status(204).send()


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    getAllAuthors,
    getAuthorbyId,
    createAuthor,
    updateAuthor,
    deleteAuthor
}        