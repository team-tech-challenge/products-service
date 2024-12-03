import { CategoryUseCase } from '@usecases/CategoryUseCase';
import { ICategoryGateway } from '@gateways/ICategoryGateway';
import { Category } from '@entities/Category';

jest.mock('@gateways/ICategoryGateway');

describe('CategoryUseCase', () => {
	let categoryUseCase: CategoryUseCase;
	let categoryGatewayMock: jest.Mocked<ICategoryGateway>;

	beforeEach(() => {
		// Criando o mock do ICategoryGateway
		categoryGatewayMock = {
			allCategories: jest.fn(),
			getCategoryById: jest.fn(),
			newCategory: jest.fn(),
		} as jest.Mocked<ICategoryGateway>;

		// Instanciando o CategoryUseCase com o mock do gateway
		categoryUseCase = new CategoryUseCase(categoryGatewayMock);
	});

	describe('getAllCategories', () => {
		it('deve retornar todas as categorias com sucesso', async () => {
			// Dados mockados para categorias
			const mockCategories = [
				new Category('Category 1', 1),
				new Category('Category 2', 2),
			];

			// Configurando o mock do método allCategories do gateway
			categoryGatewayMock.allCategories.mockResolvedValue(mockCategories);

			// Chama o método getAllCategories do use case
			const categories = await categoryUseCase.getAll();

			// Asserções
			expect(categories).toEqual(mockCategories);
			expect(categoryGatewayMock.allCategories).toHaveBeenCalledTimes(1);
		});

		it('deve lançar um erro caso falhe ao buscar categorias', async () => {
			// Configurando o mock para lançar um erro
			categoryGatewayMock.allCategories.mockRejectedValue(new Error('Erro ao buscar categorias'));

			// Espera que a função lance um erro
			await expect(categoryUseCase.getAll()).rejects.toThrow('Erro ao buscar categorias');
			expect(categoryGatewayMock.allCategories).toHaveBeenCalledTimes(1);
		});
	});

	describe('getCategoryById', () => {
		it('deve retornar a categoria quando encontrada', async () => {
			// Dados mockados para uma categoria
			const mockCategory = new Category('Category 1', 1);

			// Configurando o mock do método getCategoryById do gateway
			categoryGatewayMock.getCategoryById.mockResolvedValue(mockCategory);

			// Chama o método getCategoryById do use case
			const category = await categoryUseCase.getCategoryById(1);

			// Asserções
			expect(category).toEqual(mockCategory);
			expect(categoryGatewayMock.getCategoryById).toHaveBeenCalledWith(1);
		});

		it('deve retornar null quando a categoria não for encontrada', async () => {
			// Configurando o mock para retornar null (categoria não encontrada)
			categoryGatewayMock.getCategoryById.mockResolvedValue(null);

			// Chama o método getCategoryById do use case
			const category = await categoryUseCase.getCategoryById(1);

			// Asserções
			expect(category).toBeNull();  // Aqui estamos verificando o comportamento de retorno null
			expect(categoryGatewayMock.getCategoryById).toHaveBeenCalledWith(1);
		});
	});

	describe('createCategory', () => {
		it('deve criar uma nova categoria com sucesso', async () => {
			const newCategory = new Category('New Category', 3);

			// Configurando o mock do método newCategory do gateway
			categoryGatewayMock.newCategory.mockResolvedValue(newCategory);

			// Chama o método createCategory do use case
			const createdCategory = await categoryUseCase.createCategory(newCategory);

			// Asserções
			expect(createdCategory).toEqual(newCategory);
			expect(categoryGatewayMock.newCategory).toHaveBeenCalledWith(newCategory);
		});

		it('deve lançar um erro caso falhe ao criar uma categoria', async () => {
			const newCategory = new Category('New Category', 3);

			// Configurando o mock para lançar um erro
			categoryGatewayMock.newCategory.mockRejectedValue(new Error('Erro ao criar categoria'));

			// Espera que a função lance um erro
			await expect(categoryUseCase.createCategory(newCategory)).rejects.toThrow('Erro ao criar categoria');
			expect(categoryGatewayMock.newCategory).toHaveBeenCalledWith(newCategory);
		});
	});
});
