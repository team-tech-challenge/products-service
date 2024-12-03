import { ProductUseCase } from '@usecases/ProductUseCase';
import { IProductGateway } from '@gateways/IProductGateway';
import { Product } from '@entities/Product';
import { ProductNotFoundError } from '@utils/errors/productErrors';

jest.mock('@gateways/IProductGateway');

describe('ProductUseCase', () => {
	let productUseCase: ProductUseCase;
	let productGatewayMock: jest.Mocked<IProductGateway>;

	beforeEach(() => {
		// Criando o mock do IProductGateway
		productGatewayMock = {
			allProducts: jest.fn(),
			getProductById: jest.fn(),
			newProduct: jest.fn(),
			updateProduct: jest.fn(),
			deleteProduct: jest.fn(),
		} as jest.Mocked<IProductGateway>;

		// Instanciando o ProductUseCase com o mock do gateway
		productUseCase = new ProductUseCase(productGatewayMock);
	});

	describe('getAll', () => {
		it('deve retornar todos os produtos com sucesso', async () => {
			// Dados mockados para produtos
			const mockProducts = [
				new Product('1', 'Product 1', 1, 10),
				new Product('2', 'Product 2', 2, 20),
			];

			// Configurando o mock do método allProducts do gateway
			productGatewayMock.allProducts.mockResolvedValue(mockProducts);

			// Chama o método getAll do use case
			const products = await productUseCase.getAll();

			// Asserções
			expect(products).toEqual(mockProducts);
			expect(productGatewayMock.allProducts).toHaveBeenCalledTimes(1);
		});
	});

	describe('getProductByCategory', () => {
		it('deve retornar produtos por categoria com sucesso', async () => {
			// Dados mockados para produtos de uma categoria
			const mockProducts = [
				new Product('1', 'Product 1', 1, 10),
				new Product('2', 'Product 2', 2, 20),
			];

			// Configurando o mock do método allProducts do gateway
			productGatewayMock.allProducts.mockResolvedValue(mockProducts);

			// Chama o método getProductByCategory do use case
			const products = await productUseCase.getProductByCategory('Category 1');

			// Asserções
			expect(products).toEqual(mockProducts);
			expect(productGatewayMock.allProducts).toHaveBeenCalledWith({
				where: { categoryId: 'Category 1' },
			});
		});
	});

	describe('getProductById', () => {
		it('deve retornar o produto quando encontrado', async () => {
			// Dados mockados para um produto
			const mockProduct = new Product('1', 'Product 1', 1, 10);

			// Configurando o mock do método getProductById do gateway
			productGatewayMock.getProductById.mockResolvedValue(mockProduct);

			// Chama o método getProductById do use case
			const product = await productUseCase.getProductById(1);

			// Asserções
			expect(product).toEqual(mockProduct);
			expect(productGatewayMock.getProductById).toHaveBeenCalledWith(1);
		});

		it('deve retornar null quando o produto não for encontrado', async () => {
			// Configurando o mock para retornar null (produto não encontrado)
			productGatewayMock.getProductById.mockResolvedValue(null);

			// Chama o método getProductById do use case
			const product = await productUseCase.getProductById(1);

			// Asserções
			expect(product).toBeNull();  // Aqui estamos verificando o comportamento de retorno null
			expect(productGatewayMock.getProductById).toHaveBeenCalledWith(1);
		});
	});

	describe('createProduct', () => {
		it('deve criar um produto com sucesso', async () => {
			// Dados mockados para um novo produto
			const newProduct = new Product('1', 'Product 1', 1, 10);

			// Configurando o mock do método newProduct do gateway
			productGatewayMock.newProduct.mockResolvedValue(newProduct);

			// Chama o método createProduct do use case
			const createdProduct = await productUseCase.createProduct(newProduct);

			// Asserções
			expect(createdProduct).toEqual(newProduct);
			expect(productGatewayMock.newProduct).toHaveBeenCalledWith(newProduct);
		});
	});

	describe('updateProduct', () => {
		it('deve atualizar um produto com sucesso', async () => {
			// Dados mockados para um produto existente
			const existingProduct = new Product('1', 'Product 1', 1, 10);

			// Configurando o mock do método getProductById para retornar o produto existente
			productGatewayMock.getProductById.mockResolvedValue(existingProduct);

			// Configurando o mock do método updateProduct
			productGatewayMock.updateProduct.mockResolvedValue(undefined);

			// Chama o método updateProduct do use case
			await productUseCase.updateProduct(1, existingProduct);

			// Asserções
			expect(productGatewayMock.updateProduct).toHaveBeenCalledWith(1, existingProduct);
		});

		it('deve lançar um erro quando o produto não for encontrado', async () => {
			// Configurando o mock do método getProductById para retornar null (produto não encontrado)
			productGatewayMock.getProductById.mockResolvedValue(null);

			// Espera que a função lance um erro do tipo ProductNotFoundError
			await expect(productUseCase.updateProduct(1, new Product('1', 'Product 1', 1, 10)))
				.rejects.toThrow(ProductNotFoundError);
		});
	});

	describe('deleteProduct', () => {
		it('deve deletar um produto com sucesso', async () => {
			// Configurando o mock do método deleteProduct para retornar 1 (produto deletado com sucesso)
			productGatewayMock.deleteProduct.mockResolvedValue(1);

			// Chama o método deleteProduct do use case
			const deletedCount = await productUseCase.deleteProduct('1');

			// Asserções
			expect(deletedCount).toBe(1);
			expect(productGatewayMock.deleteProduct).toHaveBeenCalledWith({ where: { id: '1' } });
		});

		it('deve lançar um erro quando o id do produto estiver ausente', async () => {
			// Espera que a função lance um erro quando o id estiver ausente
			await expect(productUseCase.deleteProduct('')).rejects.toThrow('Missing required parameter: id');
		});

		it('deve lançar um erro quando o produto não for encontrado ao tentar deletar', async () => {
			// Configurando o mock do método deleteProduct para retornar 0 (produto não encontrado)
			productGatewayMock.deleteProduct.mockResolvedValue(0);

			// Espera que a função lance um erro quando o produto não for encontrado
			await expect(productUseCase.deleteProduct('1')).rejects.toThrow('Product not found');
		});
	});
});
