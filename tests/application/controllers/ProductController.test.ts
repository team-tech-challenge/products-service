import { ProductController } from "@controllers/ProductController";
import { ProductUseCase } from "@usecases/ProductUseCase";
import { defaultReturnStatement } from "@utils/http";

jest.mock("@utils/http");

describe("ProductController", () => {
	let productUseCase: jest.Mocked<ProductUseCase>;
	let productController: ProductController;
	let mockReq: any;
	let mockRes: any;

	beforeEach(() => {
		productUseCase = {
			getAll: jest.fn(),
			getProductById: jest.fn(),
			getProductByCategory: jest.fn(),
			createProduct: jest.fn(),
			updateProduct: jest.fn(),
			deleteProduct: jest.fn(),
		} as unknown as jest.Mocked<ProductUseCase>;

		productController = new ProductController(productUseCase);

		mockReq = { params: {}, body: {} };
		mockRes = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};
		(defaultReturnStatement as jest.Mock).mockImplementation((res, message, data) =>
			res.json({ message, data })
		);
	});

	describe("getAll", () => {
		it("should return all products", async () => {
			const mockProducts = [{ id: 1, name: "Product 1" }];
			productUseCase.getAll.mockResolvedValue(mockProducts);

			await productController.getAll(mockReq, mockRes);

			expect(productUseCase.getAll).toHaveBeenCalled();
			expect(defaultReturnStatement).toHaveBeenCalledWith(mockRes, "Products", mockProducts);
		});

		it("should handle errors", async () => {
			const error = new Error("Database error");
			productUseCase.getAll.mockRejectedValue(error);

			await productController.getAll(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({ status: 500, error });
		});
	});

	describe("getProductById", () => {
		it("should return a product if found", async () => {
			const mockProduct = { id: 1, name: "Product 1" };
			mockReq.params.Id = "1";
			productUseCase.getProductById.mockResolvedValue(null);

			await productController.getProductById(mockReq, mockRes);

			expect(productUseCase.getProductById).toHaveBeenCalledWith("1");
			expect(mockRes.json).toHaveBeenCalledWith(mockProduct);
		});

		it("should return 404 if product not found", async () => {
			mockReq.params.Id = "1";
			productUseCase.getProductById.mockResolvedValue(null);

			await productController.getProductById(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(404);
			expect(mockRes.json).toHaveBeenCalledWith({ error: "Product not found" });
		});

		it("should handle errors", async () => {
			const error = new Error("Internal server error");
			mockReq.params.Id = "1";
			productUseCase.getProductById.mockRejectedValue(error);

			await productController.getProductById(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({ error: error.message });
		});
	});

	describe("getProductByCategory", () => {
		it("should return products by category", async () => {
			const mockProducts = [{ id: 1, name: "Product 1" }];
			mockReq.params.categoryId = "2";
			productUseCase.getProductByCategory.mockResolvedValue(mockProducts);

			await productController.getProductByCategory(mockReq, mockRes);

			expect(productUseCase.getProductByCategory).toHaveBeenCalledWith("2");
			expect(defaultReturnStatement).toHaveBeenCalledWith(mockRes, "Products", mockProducts);
		});

		it("should handle errors", async () => {
			const error = new Error("Category fetch error");
			mockReq.params.categoryId = "2";
			productUseCase.getProductByCategory.mockRejectedValue(error);

			await productController.getProductByCategory(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({ status: 500, error });
		});
	});

	describe("createProduct", () => {
		it("should create a product", async () => {
			const mockProduct = { id: 1, name: "New Product" };
			mockReq.body = mockProduct;
			productUseCase.createProduct.mockResolvedValue(null);

			await productController.createProduct(mockReq, mockRes);

			expect(productUseCase.createProduct).toHaveBeenCalledWith(mockProduct);
			expect(defaultReturnStatement).toHaveBeenCalledWith(mockRes, "Product Created", mockProduct);
		});

		it("should handle errors", async () => {
			const error = new Error("Create product error");
			mockReq.body = { name: "New Product" };
			productUseCase.createProduct.mockRejectedValue(error);

			await productController.createProduct(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({ status: 500, error });
		});
	});

	describe("updateProduct", () => {
		it("should update a product", async () => {
			const mockResult = { success: true };
			mockReq.params.id = "1";
			mockReq.body = { name: "Updated Product" };
			productUseCase.updateProduct.mockResolvedValue(null);

			await productController.updateProduct(mockReq, mockRes);

			expect(productUseCase.updateProduct).toHaveBeenCalledWith("1", mockReq.body);
			expect(defaultReturnStatement).toHaveBeenCalledWith(mockRes, "Product updated successfully", mockResult);
		});

		it("should handle 404 error for product not found", async () => {
			const error = new Error("Product not found");
			mockReq.params.id = "1";
			productUseCase.updateProduct.mockRejectedValue(error);

			await productController.updateProduct(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(404);
			expect(mockRes.json).toHaveBeenCalledWith({ status: 404, error });
		});

		it("should handle other errors", async () => {
			const error = new Error("Database error");
			mockReq.params.id = "1";
			productUseCase.updateProduct.mockRejectedValue(error);

			await productController.updateProduct(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({ status: 500, error });
		});
	});

	describe("deleteProduct", () => {
		it("should delete a product if found", async () => {
			productUseCase.deleteProduct.mockResolvedValue(1);
			mockReq.params.id = "1";

			await productController.deleteProduct(mockReq, mockRes);

			expect(productUseCase.deleteProduct).toHaveBeenCalledWith("1");
			expect(defaultReturnStatement).toHaveBeenCalledWith(mockRes, "Product deleted successfully", 1);
		});

		it("should return not found if product not deleted", async () => {
			productUseCase.deleteProduct.mockResolvedValue(0);
			mockReq.params.id = "1";

			await productController.deleteProduct(mockReq, mockRes);

			expect(defaultReturnStatement).toHaveBeenCalledWith(mockRes, "Product not found", 0);
		});

		it("should handle errors", async () => {
			const error = new Error("Internal server error");
			mockReq.params.id = "1";
			productUseCase.deleteProduct.mockRejectedValue(error);

			await productController.deleteProduct(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({ status: 500, error });
		});
	});
});
