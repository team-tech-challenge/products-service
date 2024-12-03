import request from 'supertest';
import express from 'express';
import { categoryRoute } from '@routes/CategoryRoute'; // Ajuste o caminho conforme necessário

jest.mock('@controllers/CategoryController', () => {
    return {
        CategoryController: jest.fn().mockImplementation(() => {
            return {
                getAll: jest.fn(),
                createCategory: jest.fn(),
            };
        }),
    };
});

const app = express();
app.use(express.json());
app.use('/categories', categoryRoute);

// Aumentar o timeout para 10 segundos
jest.setTimeout(10000);

describe('Category Routes', () => {
    let categoryController;

    beforeEach(() => {
        const { CategoryController } = require('@controllers/CategoryController');
        categoryController = new CategoryController();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /categories/all', () => {
        it('Deve retornar todas as categorias', async () => {
            // Dado que existem categorias
            const mockCategories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
            
            categoryController.getAll.mockImplementation((req, res) => {
                res.status(200).json(mockCategories); // Mockando a resposta
            });

            // Quando o usuário faz uma solicitação GET para /categories/all
            const response = await request(app).get('/categories/all');

            // Então deve retornar um status 200
            expect(response.status).toBe(200);
            // E deve retornar as categorias esperadas
            expect(response.body).toEqual(mockCategories);
            // E a função getAll deve ter sido chamada
            expect(categoryController.getAll).toHaveBeenCalled();
        });
    });

    describe('POST /categories/create', () => {
        it('Deve criar uma nova categoria', async () => {
            // Dado que uma nova categoria é fornecida
            const newCategory = { name: 'New Category' };
            
            categoryController.createCategory.mockImplementation((req, res) => {
                res.status(201).json({ id: 3, ...req.body }); // Mockando a resposta
            });

            // Quando o usuário faz uma solicitação POST para /categories/create
            const response = await request(app)
                .post('/categories/create')
                .send(newCategory)
                .set('Accept', 'application/json');

            // Então deve retornar um status 201
            expect(response.status).toBe(201);
            // E deve retornar a nova categoria criada
            expect(response.body).toEqual({ id: 3, ...newCategory });
            // E a função createCategory deve ter sido chamada com os parâmetros corretos
            expect(categoryController.createCategory).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
        });
    });
});
