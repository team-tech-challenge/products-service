import { CategoryMapper } from "@mappers/CategoryMapper";
import { Category } from "@entities/Category";

describe("CategoryMapper", () => {
    describe("toEntity", () => {
        it("should map CategoryModel to Category entity", () => {
            const categoryModel = { name: "Electronics", id: 1 };
            const category = CategoryMapper.toEntity(categoryModel);

            expect(category).toBeInstanceOf(Category);
            expect(category.getName()).toBe("Electronics");
            expect(category.getId()).toBe(1);
        });

        it("should throw an error if CategoryModel is invalid", () => {
            expect(() => CategoryMapper.toEntity(null)).toThrow();
        });
    });

    describe("toModel", () => {
        it("should map Category entity to CategoryModel", () => {
            const category = new Category("Electronics", 1);
            const categoryModel = CategoryMapper.toModel(category);

            expect(categoryModel).toEqual({ name: "Electronics", id: 1 });
        });

        it("should throw an error if Category is invalid", () => {
            expect(() => CategoryMapper.toModel(null)).toThrow();
        });
    });
});