import { Product } from "@entities/Product";

export interface IProductGateway {
	allProducts(condition?: any): Promise<Product[]>;

	getProductById(id: number): Promise<Product>;

	newProduct(product: Product): Promise<Product>;

	updateProduct(id: number, product: Product): Promise<void>;	

	deleteProduct(params: any): Promise<number>;
}
