module.exports = (req, res, next) => {
    req.user = {
        id: Number(req.header('x-user-id')),
        role: req.header('x-user-role') || 'USER'
    };
    next();
};
