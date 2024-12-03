import request from 'supertest';
import express from 'express';
import { productRoute } from '@routes/ProductRoute'; // Ajuste o caminho conforme necessário

// Mock da classe ProductController
jest.mock('@controllers/ProductController', () => {
    return {
        ProductController: jest.fn().mockImplementation(() => {
            return {
                getAll: jest.fn(),
                getProductById: jest.fn(),
                createProduct: jest.fn(),
                deleteProduct: jest.fn(),
                updateProduct: jest.fn(),
                getProductByCategory: jest.fn(),
            };
        }),
    };
});

// Criação da aplicação Express
const app = express();
app.use(express.json());
app.use('/products', productRoute);

// Aumentar o timeout para 30 segundos para ajudar no diagnóstico
jest.setTimeout(30000);

describe('Product Routes', () => {
    let productController;

    beforeEach(() => {
        const { ProductController } = require('@controllers/ProductController');
        productController = new ProductController();
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    describe('GET /products/all', () => {
        it('Deve retornar todos os produtos', async () => {
            // Dado que existem produtos
            const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
            
            productController.getAll.mockImplementation((req, res) => {
                console.log('getAll called'); // Log para depuração
                res.status(200).json(mockProducts); // Mockando a resposta
            });

            // Quando o usuário faz uma solicitação GET para /products/all
            const response = await request(app).get('/products/all');

            // Então deve retornar um status 200
            expect(response.status).toBe(200);
            // E deve retornar os produtos esperados
            expect(response.body).toEqual(mockProducts);
            // E a função getAll deve ter sido chamada
            expect(productController.getAll).toHaveBeenCalled();
        });
    });

    describe('GET /products/:id', () => {
        it('Deve retornar um produto específico pelo ID', async () => {
            // Dado que um produto existe com o ID 1
            const mockProduct = { id: 1, name: 'Product 1' };
            const productId = 1;

            productController.getProductById.mockImplementation((req, res) => {
                console.log('getProductById called'); // Log para depuração
                res.status(200).json(mockProduct); // Mockando a resposta
            });

            // Quando o usuário faz uma solicitação GET para /products/1
            const response = await request(app).get(`/products/${productId}`);

            // Então deve retornar um status 200
            expect(response.status).toBe(200);
            // E deve retornar o produto esperado
            expect(response.body).toEqual(mockProduct);
            // E a função getProductById deve ter sido chamada com o ID correto
            expect(productController.getProductById).toHaveBeenCalledWith(expect.objectContaining({ params: { id: productId } }), expect.any(Object));
        });
    });

    describe('POST /products/create', () => {
        it('Deve criar um novo produto', async () => {
            // Dado que um novo produto é fornecido
            const newProduct = { name: 'New Product', categoryId: 1 };
            
            productController.createProduct.mockImplementation((req, res) => {
                console.log('createProduct called'); // Log para depuração
                res.status(201).json({ id: 3, ...req.body }); // Mockando a resposta
            });

            // Quando o usuário faz uma solicitação POST para /products/create
            const response = await request(app)
                .post('/products/create')
                .send(newProduct)
                .set('Accept', 'application/json');

            // Então deve retornar um status 201
            expect(response.status).toBe(201);
            // E deve retornar o novo produto criado
            expect(response.body).toEqual({ id: 3, ...newProduct });
            // E a função createProduct deve ter sido chamada com os parâmetros corretos
            expect(productController.createProduct).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
        });
    });

    describe('DELETE /products/delete/:id', () => {
        it('Deve deletar um produto pelo ID', async () => {
            // Dado que um produto existe com o ID 1
            const productId = 1;
            
            productController.deleteProduct.mockImplementation((req, res) => {
                console.log('deleteProduct called'); // Log para depuração
                res.status(204).send(); // Mockando a resposta sem conteúdo
            });

            // Quando o usuário faz uma solicitação DELETE para /products/delete/1
            const response = await request(app).delete(`/products/delete/${productId}`);

            // Então deve retornar um status 204
            expect(response.status).toBe(204);
            // E a função deleteProduct deve ter sido chamada com o ID correto
            expect(productController.deleteProduct).toHaveBeenCalledWith(expect.objectContaining({ params: { id: productId } }), expect.any(Object));
        });
    });

    describe('PUT /products/update/:id', () => {
        it('Deve atualizar um produto pelo ID', async () => {
            // Dado que um produto existe com o ID 1
            const updatedProduct = { name: 'Updated Product', categoryId: 1 };
            const productId = 1;

            productController.updateProduct.mockImplementation((req, res) => {
                console.log('updateProduct called'); // Log para depuração
                res.status(200).json({ id: productId, ...req.body }); // Mockando a resposta
            });

            // Quando o usuário faz uma solicitação PUT para /products/update/1
            const response = await request(app)
                .put(`/products/update/${productId}`)
                .send(updatedProduct)
                .set('Accept', 'application/json');

            // Então deve retornar um status 200
            expect(response.status).toBe(200);
            // E deve retornar o produto atualizado
            expect(response.body).toEqual({ id: productId, ...updatedProduct });
            // E a função updateProduct deve ter sido chamada com os parâmetros corretos
            expect(productController.updateProduct).toHaveBeenCalledWith(expect.objectContaining({ params: { id: productId } }), expect.any(Object));
        });
    });

    describe('GET /products/bycategory/:categoryId', () => {
        it('Deve retornar produtos de uma categoria específica', async () => {
            // Dado que existem produtos associados à categoria 1
            const categoryId = 1;
            const mockProducts = [{ id: 1, name: 'Product', categoryId: 1  }, { id: 2, name: 'Product 2', categoryId: 2  }];

            productController.getProductByCategory.mockImplementation((req, res) => {
                console.log('getProductByCategory called'); // Log para depuração
                res.status(200).json(mockProducts); // Mockando a resposta
            });

            // Quando o usuário faz uma solicitação GET para /products/bycategory/1
            const response = await request(app).get(`/products/bycategory/${categoryId}`);

            // Então deve retornar um status 200
            expect(response.status).toBe(200);
            // E deve retornar os produtos da categoria esperada
            expect(response.body).toEqual(mockProducts);
            // E a função getProductByCategory deve ter sido chamada com o ID da categoria correto
            expect(productController.getProductByCategory).toHaveBeenCalledWith(expect.objectContaining({ params: { categoryId } }), expect.any(Object));
        });
    });
});
