import { Router } from "express";
import { ProductAdapter } from "@adapters/ProductAdapter";
import { ProductUseCase } from "@usecases/ProductUseCase";
import { ProductController } from "@controllers/ProductController";

export const productRoute = Router();

const productAdapter = new ProductAdapter();
const productUseCase = new ProductUseCase(productAdapter);
const productController = new ProductController(productUseCase);

productRoute.get("/all", (req, res) => {
	// #swagger.tags = ['Product']
	/* #swagger.responses[200] = {
			description: 'Return all products',
			schema: { $ref: '#/definitions/Product' }
	} */
	productController.getAll(req, res);
});

productRoute.get("/:Id", (req, res) => {
	// #swagger.tags = ['Product']
	productController.getProductById(req, res);
});

productRoute.post("/create", (req, res) => {
	// #swagger.tags = ['Product']
	/* #swagger.requestBody = {
			required: true,
			content: {
				"application/json": {
					schema: { $ref: '#/definitions/AddProduct' }
				}
			}
		}
	*/
	productController.createProduct(req, res);
});

productRoute.delete("/delete/:id", (req, res) => {
	// #swagger.tags = ['Product']
	productController.deleteProduct(req, res);
});

productRoute.put("/update/:id", (req, res) => {
	// #swagger.tags = ['Product']
	// #swagger.description = 'Update Product by ID'
	/* #swagger.requestBody = {
			required: true,
			content: {
				"application/json": {
					schema: { $ref: '#/definitions/Product' }
				}
			}
		}
	*/
	productController.updateProduct(req, res);
});

productRoute.get("/bycategory/:categoryId", (req, res) => {
	// #swagger.tags = ['Product']
	productController.getProductByCategory(req, res);
});
