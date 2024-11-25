import { IComboGateway } from "@gateways/IComboGateway";
import { Combo } from "@entities/Combo";
import { Product } from "@entities/Product";
import { ComboProduct } from "@entities/ComboProduct";

export class ComboUseCase {
	constructor(private readonly comboGateway: IComboGateway) { }

	async getAll(): Promise<Combo[]> {
		return await this.comboGateway.allCombos();
	}

	async getComboById(id: number): Promise<Combo | null> {
		const combo = await this.comboGateway.getComboById(id);
		return combo ? combo : null;
	}

	async createCombo(data: Combo): Promise<Combo> {
		return await this.comboGateway.newCombo(data);
	}

	async createComboProductAssociation(data: any): Promise<ComboProduct> {
		return await this.comboGateway.newProductAssociation(data);
	}

	async getComboProducts(id: number): Promise<ComboProduct[]> {
		const comboProduct = await this.comboGateway.productsOfCombo(id);

		if (!comboProduct) {
			throw new Error('Combo product not found');
		}
	  
		return comboProduct;
	}
}
