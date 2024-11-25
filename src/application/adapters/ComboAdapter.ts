import { Combo as ComboModel } from "@database/ComboModel";
import { Product as ProductModel } from "@database/ProductModel";
import { ComboProduct as ComboProducModel } from "@database/ComboProductModel";
import { IComboGateway } from "@gateways/IComboGateway";
import { Combo } from "@entities/Combo";
import { ComboMapper } from "@mappers/ComboMapper";
import { ProductMapper } from "@mappers/ProductMapper";
import { Product } from "@entities/Product";
import { ComboProduct } from "@entities/ComboProduct";
import { ComboProductMapper } from "@mappers/ComboProductMapper";

export class ComboAdapter implements IComboGateway {

	async allCombos(): Promise<Combo[]> {
		const comboModels = await ComboModel.findAll();
        return comboModels.map(model => ComboMapper.toEntity(model));		
	}

	async getComboById(id: number): Promise<Combo> {
        const comboModel = await ComboModel.findOne({ where: { id } });
        return ComboMapper.toEntity(comboModel);
    }

	async newCombo(values: any): Promise<Combo> {
		const comboModels = await ComboModel.create(values);
        return ComboMapper.toEntity(comboModels);		
	}

	async newProductAssociation(values: any): Promise<ComboProduct> {
		try {
			const comboProductModel = ComboProducModel.create(values);
			return ComboProductMapper.toEntity(comboProductModel);
		} catch (error) {
			console.error(error);
			throw new Error("Product not association");
		}
		
	}

	async productsOfCombo(id: number): Promise<ComboProduct[]> {
		const comboProductRecords =  await ComboProducModel.findAll({
			where: { comboId: id },
			include: [
				{
					model: ProductModel,
					as: 'product'
				}]			
		});

		if (!comboProductRecords) {
            throw new Error("Products not found");
        }
		return comboProductRecords.map((comboProductRecord) => ComboProductMapper.toEntity(comboProductRecord));	
	}
	
}
