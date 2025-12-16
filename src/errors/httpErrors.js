class ForbiddenError extends Error {
    status = 403;
}
class NotFoundError extends Error {
    status = 404;
}

module.exports = { ForbiddenError, NotFoundError };
