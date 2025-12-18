const noteService = require('../../services/noteService');
const noteRepository = require('../../repositories/noteRepository');

// Mock the repository
jest.mock('../../repositories/noteRepository');

describe('NoteService Unit Tests', () => {
    it('should create a note successfully', async () => {
        const mockNote = { id: 1, title: 'Test', content: 'Content', userId: 1 };

        // Setup mock behavior
        noteRepository.create.mockResolvedValue(mockNote);

        const result = await noteService.createNote({ title: 'Test', content: 'Content' }, 1);

        expect(result).toEqual(mockNote);
        expect(noteRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if title is missing', async () => {
        await expect(noteService.createNote({ content: 'Only content' }, 1))
            .rejects.toThrow();
    });
});