const noteRepository = require('../repositories/noteRepository');
const { ForbiddenError, NotFoundError } = require('../errors/httpErrors');

class NoteService {
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
