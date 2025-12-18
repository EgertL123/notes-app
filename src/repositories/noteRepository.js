const { Note, User } = require('../models');

class NoteRepository {
    async create(data) {
        return await Note.create(data);
    }

    async findById(id) {
        return await Note.findByPk(id);
    }

    async findAll(options = {}) {
        return await Note.findAll({
            ...options,
            include: [{ model: User, attributes: ['email'] }]
        });
    }

    async update(id, data) {
        const note = await Note.findByPk(id);
        if (note) {
            return await note.update(data);
        }
        return null;
    }

    async delete(note) {
        return await note.destroy();
    }
}

module.exports = new NoteRepository();