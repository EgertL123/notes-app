const noteService = require('../services/noteService');

exports.deleteNote = async (req, res, next) => {
    try {
        await noteService.deleteNote(req.params.id, req.user);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
