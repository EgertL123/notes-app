const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ message: 'Token missing' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'salajane_voti');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Wrong or expired token' });
    }
};