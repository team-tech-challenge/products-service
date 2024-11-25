import { ICategoryGateway } from "@gateways/ICategoryGateway";
import { Category as CategoryModel } from "@database/CategoryModel";
import { Category } from "@entities/Category";
import { CategoryMapper } from "@mappers/CategoryMapper";

export class CategoryAdapter implements ICategoryGateway {
	async allCategories(): Promise<Category[]> {
        const categoryModels = await CategoryModel.findAll();
        return categoryModels.map(model => CategoryMapper.toEntity(model));		
	}

    async getCategoryById(id: number): Promise<Category> {
        const categoryModel = await CategoryModel.findOne({ where: { id } });
        return CategoryMapper.toEntity(categoryModel);      
    }

	async newCategory(category: any): Promise<Category> {
        const categoryModel = await CategoryModel.create(category);
        return CategoryMapper.toEntity(categoryModel);             
	}

}
