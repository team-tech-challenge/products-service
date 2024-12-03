import { Product } from '@entities/Product';

describe('Product', () => {
	it('should create a Product instance with all properties', () => {
		const product = new Product('Phone', 'Smartphone with 128GB storage', 799, 1, 10);

		expect(product.getId()).toBe(10);
		expect(product.getName()).toBe('Phone');
		expect(product.getDescription()).toBe('Smartphone with 128GB storage');
		expect(product.getPrice()).toBe(799);
		expect(product.getCategoryId()).toBe(1);
	});

	it('should create a Product instance without an id', () => {
		const product = new Product('Laptop', 'Gaming laptop with RTX 3060', 1500, 2);

		expect(product.getId()).toBeUndefined();
		expect(product.getName()).toBe('Laptop');
		expect(product.getDescription()).toBe('Gaming laptop with RTX 3060');
		expect(product.getPrice()).toBe(1500);
		expect(product.getCategoryId()).toBe(2);
	});

	it('should return the correct name when getName is called', () => {
		const product = new Product('Tablet', 'Tablet with 10-inch display', 500, 3);

		expect(product.getName()).toBe('Tablet');
	});

	it('should return the correct description when getDescription is called', () => {
		const product = new Product('Headphones', 'Noise-cancelling headphones', 300, 4);

		expect(product.getDescription()).toBe('Noise-cancelling headphones');
	});

	it('should return the correct price when getPrice is called', () => {
		const product = new Product('Monitor', '4K Ultra HD monitor', 400, 5);

		expect(product.getPrice()).toBe(400);
	});

	it('should return the correct categoryId when getCategoryId is called', () => {
		const product = new Product('Mouse', 'Wireless gaming mouse', 50, 6);

		expect(product.getCategoryId()).toBe(6);
	});
});
