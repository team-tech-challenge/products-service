import { CategoryController } from '@controllers/CategoryController';
import { CategoryUseCase } from '@usecases/CategoryUseCase';
import { Category } from '@entities/Category';
import { handleError } from '@utils/http';

// Mocking dependencies
jest.mock('@usecases/CategoryUseCase');
jest.mock('@utils/http', () => ({
  handleError: jest.fn(),
}));

const mockedCategoryUseCase = new CategoryUseCase(null) as jest.Mocked<CategoryUseCase>;

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

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(() => {
    controller = new CategoryController(mockedCategoryUseCase);
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should get all categories', async () => {
      const mockCategories = [
        new Category('Category 1', 1),
      ];
      mockedCategoryUseCase.getAll.mockResolvedValue(mockCategories);

      const req = mockRequest();
      const res = mockResponse();

      await controller.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCategories.map(category => ({
        id: category.getId(),
        name: category.getName(),
      })));
    });

    it('should handle error in getAll', async () => {
      const error = new Error('Test Error');
      mockedCategoryUseCase.getAll.mockRejectedValue(error);

      const req = mockRequest();
      const res = mockResponse();

      await controller.getAll(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const mockCategory = new Category('New Category', 1);
      mockedCategoryUseCase.createCategory.mockResolvedValue(mockCategory);

      const req = mockRequest({ name: 'New Category' });
      const res = mockResponse();

      await controller.createCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: mockCategory.getId(),
        name: mockCategory.getName(),
      });
    });

    it('should handle error in createCategory', async () => {
      const error = new Error('Test Error');
      mockedCategoryUseCase.createCategory.mockRejectedValue(error);

      const req = mockRequest({ name: 'New Category' });
      const res = mockResponse();

      await controller.createCategory(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });
});