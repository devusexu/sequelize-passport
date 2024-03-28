const db = require('../models');
const { NotFoundError, ValidationError } = require('../utils/error');

function errorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.status).json({
            type: err.name, 
            message: err.message
        });
    }
    else if (err instanceof NotFoundError) {
        return res.status(err.status).json({
            type: err.name, 
            message: err.message
        });
    }
    else if (err instanceof db.Sequelize.ValidationError) {
        const errorMessages = err.errors.map(e => e.message);

        return res.status(422).json({ 
            type: "Validation Error",
            message: errorMessages
        });
    }

    // errors not handled above would all be treated as 500 Internal Server Error
    return res.status(500).json({
        type: 'Internal Server Error',
        message: 'Internal Server Error' 
    });
}

module.exports = errorHandler;