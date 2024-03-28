if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('./middlewares/passport');
const flash = require('express-flash');
const session = require('express-session');
const bcrypt = require('bcrypt');

const port = 3000;
const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const authRouter = require('./routes/auth')(passport);
const db = require('./models');
const errorHandler = require('./middlewares/errorHandler');

testDatabaseConnection();

// set ejs as view-engine
app.set('view-engine', 'ejs');

// enable CORS for all routes
app.use(cors());

// set up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// set up routes 
app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use('/', authRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

async function testDatabaseConnection() {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        // terminate the application
        process.exit(1);
    }
}

// module.exports = passport;