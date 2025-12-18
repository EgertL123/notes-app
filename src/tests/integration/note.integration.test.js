const request = require('supertest');
const app = require('../../app');
const { sequelize } = require('../../models');

let token;
let noteId;

beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reset DB before tests

    // Create a user and login to get a token for authenticated routes
    await request(app).post('/api/auth/signup').send({ email: 'test@test.com', password: 'password123' });
    const loginRes = await request(app).post('/api/auth/login').send({ email: 'test@test.com', password: 'password123' });
    token = loginRes.body.token;
});

afterAll(async () => {
    await sequelize.close();
});

describe('Notes API Integration Flow', () => {

    // 1. POST (Create)
    it('should create a new note', async () => {
        const res = await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Integration Test', content: 'Testing full flow' });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        noteId = res.body.id;
    });

    // 2. GET (Read)
    it('should fetch the created note', async () => {
        const res = await request(app)
            .get('/api/notes')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.some(n => n.id === noteId)).toBe(true);
    });

    // 3. PUT (Update)
    it('should update the note', async () => {
        const res = await request(app)
            .put(`/api/notes/${noteId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated Title', content: 'Updated content' });

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('Updated Title');
    });

    // 4. DELETE (Delete)
    it('should delete the note', async () => {
        const res = await request(app)
            .delete(`/api/notes/${noteId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(204); // or 200 depending on your controller
    });
});