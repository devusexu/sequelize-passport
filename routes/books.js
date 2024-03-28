const express = require('express');
const router = express.Router();
const { User, Book } = require('../models');
const { NotFoundError, ValidationError } = require('../utils/error');

router.get('/:id', async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (! book) {
            throw new NotFoundError('Book not found');
        }
        res.status(200).json(book);
    } catch(error) {
        next(error);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const books = await Book.findAll();
        if (books.length === 0) {
            throw new NotFoundError('No books found');
        }
        res.status(200).json(books);
    } catch(error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.body.ownerId);
        if (! user) {
            throw new ValidationError('Owner does not exist');
        }
        const book = await user.createBook(req.body);
        res.status(201).json(book);
    } catch(error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { title } = req.body;
        const [ affectedRows ] = await Book.update({
           title 
        }, {
            where: {
                id: req.params.id
            }
        });
        if (affectedRows === 0) {
            throw new NotFoundError('Book not found');
        }
        // return affected record only supported in PostgreSQL, so here I use 204 instead
        // to return the affected record in MySQL, find & save could be used but it required two queries 
        res.status(204).end();
    } catch(error) {
        next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const affectedRows = await Book.destroy({
            where: {
                id: req.params.id
            }
        });
        if (affectedRows === 0) {
            throw new NotFoundError('Book not found');
        }
        res.status(204).end();
    } catch(error) {
        next(error);
    }
})

module.exports = router;