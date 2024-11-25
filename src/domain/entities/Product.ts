export class Product {
	private id?: number;
	private name: string;
	private description: string;
	private price: number;
	private categoryId: number;

	constructor(name: string, description: string, price: number, categoryId: number, id?: number) {
		this.name = name;
		this.description = description;
		this.price = price;
		this.categoryId = categoryId;
		this.id = id;
	}

	getId(): number {
		return this.id;
	}

	getName(): string {
		return this.name;
	}

	getDescription(): string {
		return this.description;
	}

	getPrice(): number {
		return this.price;
	}

	getCategoryId(): number {
		return this.categoryId;
	}
}
