class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.status = 404;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.status = 422;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { NotFoundError, ValidationError };