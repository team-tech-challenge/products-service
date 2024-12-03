import { ProductController } from '@controllers/ProductController';
import { ProductUseCase } from '@usecases/ProductUseCase';
import { defaultReturnStatement } from '@utils/http';
import { Product } from '@entities/Product';

jest.mock('../../src/usecases/ProductUseCase');
jest.mock('../../src/utils/http', () => ({
  defaultReturnStatement: jest.fn(),
}));

const mockedProductUseCase = new ProductUseCase(null) as jest.Mocked<ProductUseCase>;

const mockRequest = (body = {}, params = {}) => ({
  body,
  params,
});

const mockResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
};

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(() => {
    controller = new ProductController(mockedProductUseCase);
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should get all products', async () => {
      const mockProducts = [
        new Product('Product 1', 'Description 1', 100, 1, 1),
      ];
      mockedProductUseCase.getAll.mockResolvedValue(mockProducts);

      const req = mockRequest();
      const res = mockResponse();

      await controller.getAll(req, res);

      expect(defaultReturnStatement).toHaveBeenCalledWith(res, "Products", mockProducts);
    });

    it('should handle error in getAll', async () => {
      const error = new Error('Test Error');
      mockedProductUseCase.getAll.mockRejectedValue(error);

      const req = mockRequest();
      const res = mockResponse();

      await controller.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 500, error });
    });
  });

  describe('getProductById', () => {
    it('should get a product by ID', async () => {
      const mockProduct = new Product('Product 1', 'Description 1', 100, 1, 1);
      mockedProductUseCase.getProductById.mockResolvedValue(mockProduct);

      const req = mockRequest({}, { Id: '1' });
      const res = mockResponse();

      await controller.getProductById(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    it('should handle product not found in getProductById', async () => {
      mockedProductUseCase.getProductById.mockResolvedValue(null);

      const req = mockRequest({}, { Id: '1' });
      const res = mockResponse();

      await controller.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
    });

    it('should handle error in getProductById', async () => {
      const error = new Error('Test Error');
      mockedProductUseCase.getProductById.mockRejectedValue(error);

      const req = mockRequest({}, { Id: '1' });
      const res = mockResponse();

      await controller.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('getProductByCategory', () => {
    it('should get products by category', async () => {
      const mockProducts = [
        new Product('Product 1', 'Description 1', 100, 1, 1),
      ];
      mockedProductUseCase.getProductByCategory.mockResolvedValue(mockProducts);

      const req = mockRequest({}, { categoryId: '1' });
      const res = mockResponse();

      await controller.getProductByCategory(req, res);

      expect(defaultReturnStatement).toHaveBeenCalledWith(res, "Products", mockProducts);
    });

    it('should handle error in getProductByCategory', async () => {
      const error = new Error('Test Error');
      mockedProductUseCase.getProductByCategory.mockRejectedValue(error);

      const req = mockRequest({}, { categoryId: '1' });
      const res = mockResponse();

      await controller.getProductByCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 500, error });
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const mockProduct = new Product('New Product', 'New Description', 200, 1, 1);
      mockedProductUseCase.createProduct.mockResolvedValue(mockProduct);

      const req = mockRequest({ name: 'New Product', description: 'New Description', price: 200, categoryId: 1 });
      const res = mockResponse();

      await controller.createProduct(req, res);

      expect(defaultReturnStatement).toHaveBeenCalledWith(res, "Product Created", mockProduct);
    });

    it('should handle error in createProduct', async () => {
      const error = new Error('Test Error');
      mockedProductUseCase.createProduct.mockRejectedValue(error);

      const req = mockRequest({ name: 'New Product', description: 'New Description', price: 200, categoryId: 1 });
      const res = mockResponse();

      await controller.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 500, error });
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      mockedProductUseCase.updateProduct.mockResolvedValue();

      const req = mockRequest({ name: 'Updated Product', description: 'Updated Description', price: 300, categoryId: 2 }, { id: '1' });
      const res = mockResponse();

      await controller.updateProduct(req, res);

      expect(defaultReturnStatement).toHaveBeenCalledWith(res, "Product updated successfully", undefined);
    });

    it('should handle product not found in updateProduct', async () => {
      const error = new Error('Product not found');
      mockedProductUseCase.updateProduct.mockRejectedValue(error);

      const req = mockRequest({ name: 'Updated Product', description: 'Updated Description', price: 300, categoryId: 2 }, { id: '1' });
      const res = mockResponse();

      await controller.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ status: 404, error });
    });

    it('should handle error in updateProduct', async () => {
      const error = new Error('Test Error');
      mockedProductUseCase.updateProduct.mockRejectedValue(error);

      const req = mockRequest({ name: 'Updated Product', description: 'Updated Description', price: 300, categoryId: 2 }, { id: '1' });
      const res = mockResponse();

      await controller.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 500, error });
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      mockedProductUseCase.deleteProduct.mockResolvedValue(1);

      const req = mockRequest({}, { id: '1' });
      const res = mockResponse();

      await controller.deleteProduct(req, res);

      expect(defaultReturnStatement).toHaveBeenCalledWith(res, "Product deleted successfully", 1);
    });

    it('should handle product not found in deleteProduct', async () => {
      const error = new Error('Product not found');
      mockedProductUseCase.deleteProduct.mockRejectedValue(error);

      const req = mockRequest({}, { id: '1' });
      const res = mockResponse();

      await controller.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ status: 404, error });
    });

    it('should handle error in deleteProduct', async () => {
      const error = new Error('Test Error');
      mockedProductUseCase.deleteProduct.mockRejectedValue(error);

      const req = mockRequest({}, { id: '1' });
      const res = mockResponse();

      await controller.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 500, error });
    });
  });
});
