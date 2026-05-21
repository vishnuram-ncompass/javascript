exports.AppError = class extends Error {
    static statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

exports.BadRequestError = class extends exports.AppError {
    constructor(message) {
        super(message, 400);
    }
}

exports.UnauthorizedError = class extends exports.AppError {
    constructor(message) {
        super(message, 401);
    }
}

exports.NotFoundError = class extends exports.AppError {
    constructor(message) {
        super(message, 404);
    }
}

exports.InternalServerError = class extends exports.AppError {
    constructor(message) {
        super(message, 500);
    }
}

// custom class errors with appError as parent class...