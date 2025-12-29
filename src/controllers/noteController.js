const noteService = require('../services/noteService');

exports.createNote = async (req, res, next) => {
    try {
        const notes = await noteService.getNotes(req.user);

        if (notes.length >= 5) {
            return res.status(403).json({
                error: 'Note limit reached',
                message: 'You can only create up to 5 notes. Please delete an existing note to create a new one.'
            });
        }
        const note = await noteService.createNote(req.body, req.user);
        res.status(201).json(note.toJSON());
    } catch (err) {
        next(err);
    }
};

exports.getNotes = async (req, res, next) => {
    try {
        const notes = await noteService.getNotes(req.user);
        res.json(notes.map(note => note.toJSON()));
    } catch (err) {
        next(err);
    }
};

exports.deleteNote = async (req, res, next) => {
    try {
        await noteService.deleteNote(req.params.id, req.user);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

exports.updateNote = async (req, res, next) => {
    try {
        const note = await noteService.updateNote(req.params.id, req.user.id, req.body);
        res.status(200).json(note);
    } catch (err) {
        next(err);
    }
};
