import { Combo } from '@entities/Combo';

describe('Combo', () => {
	it('should create a Combo instance with name, discount, and id', () => {
		const combo = new Combo('Meal Deal', 10, 1);
		expect(combo.getId()).toBe(1);
		expect(combo.getName()).toBe('Meal Deal');
		expect(combo.getDiscount()).toBe(10);
	});

	it('should create a Combo instance with name and discount only', () => {
		const combo = new Combo('Snack Pack', 5);
		expect(combo.getId()).toBeUndefined();
		expect(combo.getName()).toBe('Snack Pack');
		expect(combo.getDiscount()).toBe(5);
	});

	it('should return the correct name when getName is called', () => {
		const combo = new Combo('Burger Combo', 15);
		expect(combo.getName()).toBe('Burger Combo');
	});

	it('should return the correct discount when getDiscount is called', () => {
		const combo = new Combo('Holiday Special', 20);
		expect(combo.getDiscount()).toBe(20);
	});

	it('should return undefined for id if it is not provided', () => {
		const combo = new Combo('Weekend Deal', 12);
		expect(combo.getId()).toBeUndefined();
	});
});
