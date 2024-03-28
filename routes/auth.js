const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../utils/auth');

module.exports = function (passport) {
    router.get('/login', checkNotAuthenticated, (req, res) => {
        res.render('login.ejs');
    });

    router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    router.get('/register', checkNotAuthenticated, (req, res) => {
        res.render('register.ejs')
    });

    router.post('/register', checkNotAuthenticated, async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10)
            await db.User.create({
                name,
                email,
                password: hashedPassword
            });
            res.redirect('/login')
        } catch (error) {
            console.log(error);
            res.redirect('/register')
        }
    })

    router.get('/', checkAuthenticated, (req, res) => {
        res.render('index.ejs', { name: req.user.name })
    });

    router.post('/logout', (req, res, next) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/login');
        });
    });

    return router;
}