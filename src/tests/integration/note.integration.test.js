const request = require('supertest');
const app = require('../../app');
const { Note } = require('../../models');

describe('Note API Integration Tests', () => {

    test('Should create and then fail to delete a note belonging to another user', async () => {
        const note = await Note.create({
            title: 'Teise kasutaja märge',
            content: 'Sisu',
            userId: 99
        });

        await request(app)
            .delete(`/api/notes/${note.id}`)
            .set('x-user-id', 1)
            .set('x-user-role', 'USER')
            .expect(403);
    });
});