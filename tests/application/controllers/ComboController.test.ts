import { ComboController } from '@controllers/ComboController';
import { ComboUseCase } from '@usecases/ComboUseCase';
import { Combo } from '@entities/Combo';
import { ComboProduct } from '@entities/ComboProduct';
import { Product } from '@entities/Product';
import { handleError } from '@utils/http';

// Mocking dependencies
jest.mock('@usecases/ComboUseCase');
jest.mock('@utils/http', () => ({
  defaultReturnStatement: jest.fn(),
  formatObjectResponse: jest.fn(),
  handleError: jest.fn(),
}));

const mockedComboUseCase = new ComboUseCase(null) as jest.Mocked<ComboUseCase>;

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

describe('ComboController', () => {
  let controller: ComboController;

  beforeEach(() => {
    controller = new ComboController(mockedComboUseCase);
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should get all combos', async () => {
      const mockCombos = [
        new Combo('Combo 1', 10, 1),
      ];
      mockedComboUseCase.getAll.mockResolvedValue(mockCombos);

      const req = mockRequest();
      const res = mockResponse();

      await controller.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCombos.map(combo => ({
        id: combo.getId(),
        name: combo.getName(),
        discount: combo.getDiscount(),
      })));
    });

    it('should handle error in getAll', async () => {
      const error = new Error('Test Error');
      mockedComboUseCase.getAll.mockRejectedValue(error);

      const req = mockRequest();
      const res = mockResponse();

      await controller.getAll(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('getComboById', () => {
    it('should get a combo by ID', async () => {
      const mockCombo = new Combo('Combo 1', 10, 1);
      mockedComboUseCase.getComboById.mockResolvedValue(mockCombo);

      const req = mockRequest({}, { Id: '1' });
      const res = mockResponse();

      await controller.getComboById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: mockCombo.getId(),
        name: mockCombo.getName(),
        discount: mockCombo.getDiscount(),
      });
    });

    it('should handle error in getComboById', async () => {
      const error = new Error('Test Error');
      mockedComboUseCase.getComboById.mockRejectedValue(error);

      const req = mockRequest({}, { Id: '1' });
      const res = mockResponse();

      await controller.getComboById(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('createCombo', () => {
    it('should create a new combo', async () => {
      const mockCombo = new Combo('New Combo', 15, 1);
      mockedComboUseCase.createCombo.mockResolvedValue(mockCombo);

      const req = mockRequest({ name: 'New Combo', discount: 15 });
      const res = mockResponse();

      await controller.createCombo(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: mockCombo.getId(),
        name: mockCombo.getName(),
        discount: mockCombo.getDiscount(),
      });
    });

    it('should handle error in createCombo', async () => {
      const error = new Error('Test Error');
      mockedComboUseCase.createCombo.mockRejectedValue(error);

      const req = mockRequest({ name: 'New Combo', discount: 15 });
      const res = mockResponse();

      await controller.createCombo(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('createComboProductAssociation', () => {
    it('should create a new combo product association', async () => {
      const mockComboProduct = new ComboProduct(1, 1, null);
      mockedComboUseCase.createComboProductAssociation.mockResolvedValue(mockComboProduct);

      const req = mockRequest({ productId: 1, comboId: 1 });
      const res = mockResponse();

      await controller.createComboProductAssociation(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith("Product Association Created");
    });

    it('should handle error in createComboProductAssociation', async () => {
      const error = new Error('Test Error');
      mockedComboUseCase.createComboProductAssociation.mockRejectedValue(error);

      const req = mockRequest({ productId: 1, comboId: 1 });
      const res = mockResponse();

      await controller.createComboProductAssociation(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('getComboProducts', () => {
    it('should get products of a combo by ID', async () => {
      const mockProduct = new Product('Product 1','Description', 100, 1,  1);
      const mockComboProducts = [
        new ComboProduct(1, 1, mockProduct),
      ];
      mockedComboUseCase.getComboProducts.mockResolvedValue(mockComboProducts);

      const req = mockRequest({}, { id: '1' });
      const res = mockResponse();

      await controller.getComboProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockComboProducts.map(comboProduct => ({
        comboId: comboProduct.getComboId(),
        productId: comboProduct.getProductId(),
        product: comboProduct.getProduct(),
      })));
    });

    it('should handle error in getComboProducts', async () => {
      const error = new Error('Test Error');
      mockedComboUseCase.getComboProducts.mockRejectedValue(error);

      const req = mockRequest({}, { id: '1' });
      const res = mockResponse();

      await controller.getComboProducts(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });
});