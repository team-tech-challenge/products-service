import { ComboProduct } from '@entities/ComboProduct';
import { ProductMapper } from './ProductMapper';

export class ComboProductMapper {
	static toEntity(comboProduct: any): ComboProduct {
		const product = comboProduct.product ? ProductMapper.toEntity(comboProduct.product) : null; // Verifica se o produto está presente
		return new ComboProduct(
			comboProduct.comboId,
			comboProduct.productId,
			product // Inclui a entidade Product
		);
	}

	static toModel(comboProduct: ComboProduct): any {
		return {
			comboId: comboProduct.getComboId(),
			productId: comboProduct.getProductId(),
		};
	}
}
