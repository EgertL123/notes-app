class ForbiddenError extends Error {
    constructor(message = "Forbidden") {
        super(message);
        this.name = "ForbiddenError";
        this.status = 403;
    }
}

class NotFoundError extends Error {
    constructor(message = "Not Found") {
        super(message);
        this.name = "NotFoundError";
        this.status = 404;
    }
}

module.exports = { ForbiddenError, NotFoundError };