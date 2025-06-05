const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Ingestion = require('../models/Ingestion');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/ingestion_test');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Ingestion Flow', () => {
  let ingestionId;

  it('Should ingest and return ID', async () => {
    const res = await request(app)
      .post('/ingest')
      .send({ ids: [1, 2, 3, 4, 5], priority: 'MEDIUM' });
    expect(res.body.ingestion_id).toBeDefined();
    ingestionId = res.body.ingestion_id;
  });

  it('Should get initial status', async () => {
    const res = await request(app).get(`/status/${ingestionId}`);
    expect(res.body.status).toBeDefined();
  });
});
