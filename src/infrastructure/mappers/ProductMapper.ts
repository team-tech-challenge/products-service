import { Product } from "@entities/Product";

export class ProductMapper {
	// Mapeia de ProductModel (banco) para Product (domínio)
	static toEntity(productModel: any): Product {
		return new Product(
			productModel.name,
			productModel.description,
			productModel.price,
			productModel.categoryId,
			productModel.id
		);
	}
	// Mapeia de Product (domínio) para ProductModel (banco)
	static toModel(product: Product): any {
		return {
			id: product.getId(),
			name: product.getName(),
			description: product.getDescription(),
			price: product.getPrice(),
			categoryId: product.getCategoryId(),
		};
	}
}
