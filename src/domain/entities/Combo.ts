export class Combo {
	private id?: number;
	private name: string;
	private discount: number;

	constructor(name: string, discount: number, id?: number) {
		this.id = id;
		this.name = name;
		this.discount = discount;
	}

	getId(): number | undefined {
		return this.id;
	}

	getName(): string {
		return this.name;
	}

	getDiscount(): number {
		return this.discount;
	}

}
