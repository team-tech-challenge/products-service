import { Combo } from "@entities/Combo";
import { ComboProduct } from "@entities/ComboProduct";
import { Product } from "@entities/Product";

export interface IComboGateway {
	allCombos(): Promise<Combo[]>;

	getComboById(id: number): Promise<Combo>;

	newCombo(combo: Combo): Promise<Combo>;

	newProductAssociation(values: any): Promise<ComboProduct>;

	productsOfCombo(id: number): Promise<ComboProduct[]> ;
}
