jest.mock('../../repositories/noteRepository', () => ({
    findById: jest.fn()
}));

const noteService = require('../../services/noteService');
const repo = require('../../repositories/noteRepository');

test('USER cannot delete note', async () => {
    repo.findById.mockResolvedValue({ userId: 2 });

    await expect(
        noteService.deleteNote(1, { id: 1, role: 'USER' })
    ).rejects.toThrow();
});

test('ADMIN can delete any note', async () => {
    repo.findById.mockResolvedValue({ userId: 99 });
    repo.delete = jest.fn().mockResolvedValue(true);

    await expect(
        noteService.deleteNote(1, { id: 1, role: 'ADMIN' })
    ).resolves.not.toThrow();
});
