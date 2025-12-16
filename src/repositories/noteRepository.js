const { Note } = require('../models');

class NoteRepository {
    create(data) {
        return Note.create(data);
    }

    findById(id) {
        return Note.findByPk(id);
    }

    findAll() {
        return Note.findAll();
    }

    delete(note) {
        return note.destroy();
    }
}

module.exports = new NoteRepository();
