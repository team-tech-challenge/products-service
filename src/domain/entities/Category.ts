export class Category {
	private id?: number;
	private name: string;

	constructor(name: string, id?: number) {
		this.id = id;
		this.name = name;
	}

	public getId(): number | undefined {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}
}
