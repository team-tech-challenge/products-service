import { ComboProduct } from '@entities/ComboProduct';
import { Product } from '@entities/Product';

describe('ComboProduct', () => {
	it('should create a ComboProduct instance with comboId, productId, and a Product object', () => {
		const product = new Product('Phone', 'Smartphone with 128GB storage', 799, 1, 10);// Exemplo do Product
		const comboProduct = new ComboProduct(1, 100, product);

		expect(comboProduct.getComboId()).toBe(1);
		expect(comboProduct.getProductId()).toBe(100);
		expect(comboProduct.getProduct()).toBe(product);
	});

	it('should create a ComboProduct instance with null product', () => {
		const comboProduct = new ComboProduct(2, 101, null);

		expect(comboProduct.getComboId()).toBe(2);
		expect(comboProduct.getProductId()).toBe(101);
		expect(comboProduct.getProduct()).toBeNull();
	});

	it('should return the correct comboId when getComboId is called', () => {
		const comboProduct = new ComboProduct(3, 102, null);

		expect(comboProduct.getComboId()).toBe(3);
	});

	it('should return the correct productId when getProductId is called', () => {
		const comboProduct = new ComboProduct(4, 103, null);

		expect(comboProduct.getProductId()).toBe(103);
	});

	it('should return the correct Product object when getProduct is called', () => {
		const product = new Product('Phone', 'Smartphone with 128GB storage', 799, 1, 10); // Outro exemplo do Product
		const comboProduct = new ComboProduct(5, 104, product);

		expect(comboProduct.getProduct()).toBe(product);
	});
});
