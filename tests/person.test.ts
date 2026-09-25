import request from 'supertest';
import app from '../src/app.js';

describe('API Health Check & Person Endpoint Tests', () => {
  it('GET /health should return 200 OK with UP status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('UP');
  });

  it('POST /person should validate required fields (name and salary)', async () => {
    const res = await request(app).post('/person').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeDefined();
  });
});
