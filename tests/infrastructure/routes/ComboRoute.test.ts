import request from 'supertest';
import express from 'express';
import { comboRoute } from '@routes/ComboRoute'; // Ajuste o caminho conforme necessário

// Mock da classe ComboController
jest.mock('@controllers/ComboController', () => {
    return {
        ComboController: jest.fn().mockImplementation(() => {
            return {
                getAll: jest.fn(),
                getComboById: jest.fn(),
                createCombo: jest.fn(),
                createComboProductAssociation: jest.fn(),
                getComboProducts: jest.fn(),
            };
        }),
    };
});

// Criação da aplicação Express
const app = express();
app.use(express.json());
app.use('/combos', comboRoute);

// Aumentar o timeout para 30 segundos para ajudar no diagnóstico
jest.setTimeout(30000);

describe('Combo Routes', () => {
    let comboController;

    beforeEach(() => {
        const { ComboController } = require('@controllers/ComboController');
        comboController = new ComboController();
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste para evitar interferências
    });

    describe('GET /combos/all', () => {
        it('Deve retornar todos os combos', async () => {
            // Dado que existem combos
            const mockCombos = [{ id: 1, name: 'Combo 1' }, { id: 2, name: 'Combo 2' }];
            
            comboController.getAll.mockImplementation((req, res) => {
                console.log('getAll called'); // Log para depuração
                res.status(200).json(mockCombos); // Mockando a resposta
            });

            // Quando o usuário faz uma solicitação GET para /combos/all
            const response = await request(app).get('/combos/all');

            // Então deve retornar um status 200
            expect(response.status).toBe(200);
            // E deve retornar os combos esperados
            expect(response.body).toEqual(mockCombos);
            // E a função getAll deve ter sido chamada
            expect(comboController.getAll).toHaveBeenCalled();
        });
    });

    describe('GET /combos/:id', () => {
        it('Deve retornar um combo específico pelo ID', async () => {
            // Dado que um combo existe com o ID 1
            const mockCombo = { id: 1, name: 'Combo 1' };
            const comboId = 1;

            comboController.getComboById.mockImplementation((req, res) => {
                console.log('getComboById called'); // Log para depuração
                res.status(200).json(mockCombo); // Mockando a resposta
            });

            // Quando o usuário faz uma solicitação GET para /combos/1
            const response = await request(app).get(`/combos/${comboId}`);

            // Então deve retornar um status 200
            expect(response.status).toBe(200);
            // E deve retornar o combo esperado
            expect(response.body).toEqual(mockCombo);
            // E a função getComboById deve ter sido chamada com o ID correto
            expect(comboController.getComboById).toHaveBeenCalledWith(expect.objectContaining({ params: { id: comboId } }), expect.any(Object));
        });
    });

    describe('POST /combos/create', () => {
        it('Deve criar um novo combo', async () => {
            // Dado que um novo combo é fornecido
            const newCombo = { name: 'New Combo' };
            
            comboController.createCombo.mockImplementation((req, res) => {
                console.log('createCombo called'); // Log para depuração
                res.status(201).json({ id: 3, ...req.body }); // Mockando a resposta
            });

            // Quando o usuário faz uma solicitação POST para /combos/create
            const response = await request(app)
                .post('/combos/create')
                .send(newCombo)
                .set('Accept', 'application/json');

            // Então deve retornar um status 201
            expect(response.status).toBe(201);
            // E deve retornar o novo combo criado
            expect(response.body).toEqual({ id: 3, ...newCombo });
            // E a função createCombo deve ter sido chamada com os parâmetros corretos
            expect(comboController.createCombo).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
        });
    });

    describe('POST /combos/product/association/create', () => {
        it('Deve criar uma associação de produto a um combo', async () => {
            // Dado que uma nova associação de produto é fornecida
            const newAssociation = { comboId: 1, productId: 2 };
            
            comboController.createComboProductAssociation.mockImplementation((req, res) => {
                console.log('createComboProductAssociation called'); // Log para depuração
                res.status(201).json({ message: 'Association created', ...req.body }); // Mockando a resposta
            });

            // Quando o usuário faz uma solicitação POST para /combos/product/association/create
            const response = await request(app)
                .post('/combos/product/association/create')
                .send(newAssociation)
                .set('Accept', 'application/json');

            // Então deve retornar um status 201
            expect(response.status).toBe(201);
            // E deve retornar a mensagem de associação criada
            expect(response.body).toEqual({ message: 'Association created', ...newAssociation });
            // E a função createComboProductAssociation deve ter sido chamada
            expect(comboController.createComboProductAssociation).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
        });
    });

    describe('GET /combos/:id/products', () => {
        it('Deve retornar todos os produtos de um combo específico pelo ID', async () => {
            // Dado que existem produtos associados ao combo com ID 1
            const comboId = 1;
            const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

            comboController.getComboProducts.mockImplementation((req, res) => {
                console.log('getComboProducts called'); // Log para depuração
                res.status(200).json(mockProducts); // Mockando a resposta
            });

            // Quando o usuário faz uma solicitação GET para /combos/1/products
            const response = await request(app).get(`/combos/${comboId}/products`);

            // Então deve retornar um status 200
            expect(response.status).toBe(200);
            // E deve retornar os produtos esperados
            expect(response.body).toEqual(mockProducts);
            // E a função getComboProducts deve ter sido chamada com o ID correto
            expect(comboController.getComboProducts).toHaveBeenCalledWith(expect.objectContaining({ params: { id: comboId } }), expect.any(Object));
        });
    });
});
