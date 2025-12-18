const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    async signup(email, password) {
        // Check if user already exists
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) throw new Error('Email already in use!');

        // Crypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        return await userRepository.create({
            email,
            password: hashedPassword,
            role: 'USER' // User by default
        });
    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Wrong password');

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || 'salajane_voti',
            { expiresIn: '2h' }
        );

        return { token, user: { id: user.id, email: user.email, role: user.role } };
    }
}

module.exports = new AuthService();