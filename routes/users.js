const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { NotFoundError }= require('../utils/error');

router.get('/:id/books', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (! user) {
            throw new NotFoundError('User not found');
        }
        res.status(200).json(await user.getBooks());
    } catch(error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (! user) {
            throw new NotFoundError('User not found');
        }
        res.status(200).json(user);
    } catch(error) {
        next(error);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();
        if (users.length === 0) {
            throw new NotFoundError('No users found');
        }
        res.status(200).json(users);
    } catch(error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch(error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { name } = req.body;
        const [ affectedRows ] = await User.update({
            name
        }, {
            where: {
                id: req.params.id
            }
        });
        if (affectedRows === 0) {
            throw new NotFoundError('User not found');
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
        const affectedRows = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if (affectedRows === 0) {
            throw new NotFoundError('User not found');
        }
        res.status(204).end();
    } catch(error) {
        next(error);
    }
})

module.exports = router;