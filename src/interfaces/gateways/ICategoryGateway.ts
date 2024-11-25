import { Category } from "@entities/Category";

export interface ICategoryGateway {
	allCategories(): Promise<Category[]>;

	getCategoryById(id: number): Promise<Category>;

	newCategory(category: Category): Promise<Category>;
}
