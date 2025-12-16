const noteRepository = require('../repositories/noteRepository');
const { ForbiddenError, NotFoundError } = require('../errors/httpErrors');

class NoteService {
    async createNote(data, user) {
        return noteRepository.create({ ...data, UserId: user.id });
    }

    async getNotes(user) {
        // For simplicity, return all notes, but in real app, filter by user
        return noteRepository.findAll();
    }

    async deleteNote(noteId, user) {
        const note = await noteRepository.findById(noteId);
        if (!note) throw new NotFoundError('Note not found');

        if (user.role !== 'ADMIN' && note.UserId !== user.id) {
            throw new ForbiddenError('Forbidden');
        }

        return noteRepository.delete(note);
    }
}

module.exports = new NoteService();
