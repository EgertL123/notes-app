const noteRepository = require('../repositories/noteRepository');
const userRepository = require('../repositories/userRepository');
const { ForbiddenError, NotFoundError } = require('../errors/httpErrors');

class NoteService {
    async createNote(data, user) {
        if (!user || !user.id) {
            const err = new Error('User not authenticated');
            err.status = 401;
            throw err;
        }
        let dbUser = await userRepository.findById(user.id);

        if (!dbUser) {
            dbUser = await userRepository.create({
                id: user.id,
                role: user.role
            });
        }

        return noteRepository.create({
            title: data.title,
            content: data.content,
            userId: dbUser.id
        });
    }

    async getNotes(user) {
        return noteRepository.findAll({ where: { userId: user.id } });
    }

    async deleteNote(noteId, user) {
        const note = await noteRepository.findById(noteId);

        if (!note) throw new NotFoundError('Note not found');

        if (user.role !== 'ADMIN' && note.userId !== user.id) {
            throw new ForbiddenError('Forbidden');
        }

        return noteRepository.delete(note);
    }

    async updateNote(id, userId, data) {
        const note = await noteRepository.findById(id);

        if (!note) throw new Error('Note not found');
        if (note.userId !== userId) throw new Error('Unauthorized');

        return await noteRepository.update(id, data);
    }
}

module.exports = new NoteService();
