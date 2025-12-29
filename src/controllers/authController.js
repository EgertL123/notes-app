const authService = require('../services/authService');

exports.signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check for data
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await authService.signup(email, password);
        res.status(201).json({
            message: 'User created!',
            userId: user.id
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};