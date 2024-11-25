import { Product } from "./Product";

export class ComboProduct {
	private comboId: number;
	private product: Product | null;
	private productId: number;

	constructor(comboId: number, productId: number, product: Product | null) {
		this.comboId = comboId;
		this.productId = productId;
		this.product = product;
	}

	getComboId(): number {
		return this.comboId;
	}

	getProductId(): number {
		return this.productId;
	}

	getProduct(): Product | null {
		return this.product;
	}
}
