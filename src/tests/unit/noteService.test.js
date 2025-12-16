jest.mock('../../repositories/noteRepository', () => ({
    findById: jest.fn()
}));

const noteService = require('../../services/noteService');
const repo = require('../../repositories/noteRepository');

test('USER cannot delete чужой note', async () => {
    repo.findById.mockResolvedValue({ UserId: 2 });

    await expect(
        noteService.deleteNote(1, { id: 1, role: 'USER' })
    ).rejects.toThrow();
});
