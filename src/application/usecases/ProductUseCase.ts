import { IProductGateway } from "@gateways/IProductGateway";
import { ICategoryGateway } from "@gateways/ICategoryGateway";
import { Product } from "@entities/Product";
import { ProductNotFoundError } from "@utils/errors/productErrors";

export class ProductUseCase {
	constructor(private readonly productGateway: IProductGateway) { }

	async getAll(): Promise<any> {
		return await this.productGateway.allProducts();
	}

	async getProductByCategory(categoryId: string): Promise<any> {
		return await this.productGateway.allProducts({
			where: { categoryId: categoryId },
		});
	}

	async getProductById(id: number): Promise<Product | null> {
		const product = await this.productGateway.getProductById(id);
		return product ? product : null;
	}
	
	async createProduct(data: Product): Promise<Product> {		
		return await this.productGateway.newProduct(data);
	}

	async updateProduct(id: number, data: Product): Promise<void> {
        const product = await this.getProductById(id);
        if (!product) throw new ProductNotFoundError("product not found");
        this.productGateway.updateProduct(id, data);
    }

	async deleteProduct(productId: string): Promise<number> {
		if (!productId) throw new Error("Missing required parameter: id");

		const deletedCount = await this.productGateway.deleteProduct({
			where: { id: productId },
		});

		if (deletedCount === 0) throw new Error("Product not found");

		return deletedCount;
	}
}
