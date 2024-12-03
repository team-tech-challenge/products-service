import request from 'supertest';
import express from 'express';
import { apiRoutes } from '@routes/index';
import { categoryRoute } from '@routes/CategoryRoute';
import { comboRoute } from '@routes/ComboRoute';
import { productRoute } from '@routes/ProductRoute';
import initDatabase from '@database';

jest.mock('@routes/CategoryRoute');
jest.mock('@routes/ComboRoute');
jest.mock('@routes/ProductRoute');
jest.mock('@database');

const app = express();
app.use('/api', apiRoutes);

describe('API Routes', () => {
  beforeAll(() => {
    (initDatabase as jest.Mock).mockResolvedValue(true);
  });

  it('should use categoryRoute for /api/category', async () => {
    (categoryRoute as unknown as jest.Mock).mockImplementation((req, res) => res.status(200).send('Category Route'));
    const res = await request(app).get('/api/category');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Category Route');
  });

  it('should use productRoute for /api/product', async () => {
    (productRoute as unknown as jest.Mock).mockImplementation((req, res) => res.status(200).send('Product Route'));
    const res = await request(app).get('/api/product');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Product Route');
  });

  it('should use comboRoute for /api/combo', async () => {
    (comboRoute as unknown as jest.Mock).mockImplementation((req, res) => res.status(200).send('Combo Route'));
    const res = await request(app).get('/api/combo');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Combo Route');
  });
});
