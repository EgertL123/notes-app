const request = require('supertest');
const app = require('../../app');

test('DELETE /notes/:id returns 403 for wrong user', async () => {
    await request(app)
        .delete('/notes/1')
        .set('x-user-id', 1)
        .expect(403);
});
