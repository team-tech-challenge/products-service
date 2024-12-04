import { Category } from '@entities/Category';

describe('Category', () => {
	it('should create a Category instance with name and id', () => {
		const category = new Category('Books', 1);
		expect(category.getId()).toBe(1);
		expect(category.getName()).toBe('Books');
	});

	it('should create a Category instance with name only', () => {
		const category = new Category('Movies');
		expect(category.getId()).toBeUndefined();
		expect(category.getName()).toBe('Movies');
	});

	it('should return the correct name when getName is called', () => {
		const category = new Category('Music');
		expect(category.getName()).toBe('Music');
	});

	it('should return undefined for id if it is not provided', () => {
		const category = new Category('Games');
		expect(category.getId()).toBeUndefined();
	});
});
