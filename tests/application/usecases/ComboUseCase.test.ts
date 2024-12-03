import { ComboUseCase } from '@usecases/ComboUseCase';
import { IComboGateway } from '@gateways/IComboGateway';
import { Combo } from '@entities/Combo';
import { ComboProduct } from '@entities/ComboProduct';

jest.mock('@gateways/IComboGateway');

describe('ComboUseCase', () => {
	let comboUseCase: ComboUseCase;
	let comboGatewayMock: jest.Mocked<IComboGateway>;

	beforeEach(() => {
		// Criando o mock do IComboGateway
		comboGatewayMock = {
			allCombos: jest.fn(),
			getComboById: jest.fn(),
			newCombo: jest.fn(),
			newProductAssociation: jest.fn(),
			productsOfCombo: jest.fn(),
		} as jest.Mocked<IComboGateway>;

		// Instanciando o ComboUseCase com o mock do gateway
		comboUseCase = new ComboUseCase(comboGatewayMock);
	});

	describe('getAll', () => {
		it('deve retornar todos os combos com sucesso', async () => {
			// Dados mockados para combos
			const mockCombos = [
				new Combo('Combo 1', 1),
				new Combo('Combo 2', 2),
			];

			// Configurando o mock do método allCombos do gateway
			comboGatewayMock.allCombos.mockResolvedValue(mockCombos);

			// Chama o método getAll do use case
			const combos = await comboUseCase.getAll();

			// Asserções
			expect(combos).toEqual(mockCombos);
			expect(comboGatewayMock.allCombos).toHaveBeenCalledTimes(1);
		});
	});

	describe('getComboById', () => {
		it('deve retornar um combo quando encontrado', async () => {
			// Dados mockados para um combo
			const mockCombo = new Combo('Combo 1', 1);

			// Configurando o mock do método getComboById do gateway
			comboGatewayMock.getComboById.mockResolvedValue(mockCombo);

			// Chama o método getComboById do use case
			const combo = await comboUseCase.getComboById(1);

			// Asserções
			expect(combo).toEqual(mockCombo);
			expect(comboGatewayMock.getComboById).toHaveBeenCalledWith(1);
		});

		it('deve retornar null quando o combo não for encontrado', async () => {
			// Configurando o mock para retornar null (combo não encontrado)
			comboGatewayMock.getComboById.mockResolvedValue(null);

			// Chama o método getComboById do use case
			const combo = await comboUseCase.getComboById(1);

			// Asserções
			expect(combo).toBeNull();  // Aqui estamos verificando o comportamento de retorno null
			expect(comboGatewayMock.getComboById).toHaveBeenCalledWith(1);
		});
	});

	describe('createCombo', () => {
		it('deve criar um combo com sucesso', async () => {
			// Dados mockados para um novo combo
			const newCombo = new Combo('New Combo', 3);

			// Configurando o mock do método newCombo do gateway
			comboGatewayMock.newCombo.mockResolvedValue(newCombo);

			// Chama o método createCombo do use case
			const createdCombo = await comboUseCase.createCombo(newCombo);

			// Asserções
			expect(createdCombo).toEqual(newCombo);
			expect(comboGatewayMock.newCombo).toHaveBeenCalledWith(newCombo);
		});
	});

	describe('createComboProductAssociation', () => {
		it('deve criar uma associação de produto com sucesso', async () => {
			// Dados mockados para a associação de produto
			const newAssociation = { comboId: 1, productId: 2 };

			// Configurando o mock do método newProductAssociation do gateway
			comboGatewayMock.newProductAssociation.mockResolvedValue(new ComboProduct(1, 2, null));

			// Chama o método createComboProductAssociation do use case
			const createdAssociation = await comboUseCase.createComboProductAssociation(newAssociation);

			// Asserções
			expect(createdAssociation).toEqual(new ComboProduct(1, 2, null));
			expect(comboGatewayMock.newProductAssociation).toHaveBeenCalledWith(newAssociation);
		});
	});

	describe('getComboProducts', () => {
		it('deve retornar os produtos de um combo com sucesso', async () => {
			// Dados mockados para os produtos do combo
			const mockComboProducts = [
				new ComboProduct(1, 2, null),
				new ComboProduct(1, 3, null),
			];

			// Configurando o mock do método productsOfCombo do gateway
			comboGatewayMock.productsOfCombo.mockResolvedValue(mockComboProducts);

			// Chama o método getComboProducts do use case
			const comboProducts = await comboUseCase.getComboProducts(1);

			// Asserções
			expect(comboProducts).toEqual(mockComboProducts);
			expect(comboGatewayMock.productsOfCombo).toHaveBeenCalledWith(1);
		});

		it('deve lançar um erro quando não encontrar produtos para o combo', async () => {
			// Configurando o mock para retornar null ou vazio (produtos não encontrados)
			comboGatewayMock.productsOfCombo.mockResolvedValue(null);

			// Espera que a função lance um erro
			await expect(comboUseCase.getComboProducts(1)).rejects.toThrow('Combo product not found');
			expect(comboGatewayMock.productsOfCombo).toHaveBeenCalledWith(1);
		});
	});
});
