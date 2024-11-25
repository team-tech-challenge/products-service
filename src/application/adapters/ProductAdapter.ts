import { Product as ProductModel } from "@database/ProductModel";
import { IProductGateway } from "@gateways/IProductGateway";
import { ICategoryGateway } from "@gateways/ICategoryGateway";
import { Product } from "@entities/Product";
import { ProductMapper } from "@mappers/ProductMapper";
import { Category as CategoryModel } from "@database/CategoryModel";

export class ProductAdapter implements IProductGateway {
	async allProducts(params?: any): Promise<Product[]> {
		const productModels = await ProductModel.findAll(params); 
		return productModels.map(model => ProductMapper.toEntity(model));
	}

	async getProductById(id: number): Promise<Product> {
        const productModels = await ProductModel.findOne({ where: { id } });
        return ProductMapper.toEntity(productModels);
    }

	async newProduct(values: any): Promise<Product> {
		const productModels = await ProductModel.create(values);
        return ProductMapper.toEntity(productModels);				
	}
	
	async updateProduct(id: number, data: Product): Promise<void> {
		
        const product = await ProductModel.findOne({ where: { id } });

        if (!product) {
            throw new Error("Product not found");
        }
        	 
		try {
			await ProductModel.update(ProductMapper.toModel(data), {
				where: { id }
			});
		} catch (error) {
			console.error(error);
			throw new Error("Product not updated");
		}		
	}

	deleteProduct(params: any): Promise<number> {
		return ProductModel.destroy(params);
	}
	
}
