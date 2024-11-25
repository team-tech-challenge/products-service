import { Category } from "@entities/Category";

export class CategoryMapper {
	// Mapeia de CategoryModel (banco) para Category (domínio)
	static toEntity(CategoryModel: any): Category {
		return new Category(
			CategoryModel.name,
			CategoryModel.id
		);
	}

	// Mapeia de Category (domínio) para CategoryModel (banco)
	static toModel(Category: Category): any {
		return {
			name: Category.getName(),
			id: Category.getId(),
		};
	}
}
