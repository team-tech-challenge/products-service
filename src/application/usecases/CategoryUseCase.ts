import { ICategoryGateway } from "@gateways/ICategoryGateway";
import { Category } from "@entities/Category";

export class CategoryUseCase {
	constructor(private readonly categoryGateway: ICategoryGateway) { }

	async getAll(): Promise<Category[]> {
		return await this.categoryGateway.allCategories();
	}

	async getCategoryById(id: number): Promise<Category | null> {
		const category = await this.categoryGateway.getCategoryById(id);
		return category ? category : null;
	}

	async createCategory(data: Category): Promise<Category> {
		return await this.categoryGateway.newCategory(data);
	}
}
