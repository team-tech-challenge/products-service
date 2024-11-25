import { Router } from "express";
import { CategoryAdapter } from "@adapters/CategoryAdapter";
import { CategoryUseCase } from "@usecases/CategoryUseCase";
import { CategoryController } from "@controllers/CategoryController";

export const categoryRoute = Router();

const categoryAdapter = new CategoryAdapter();
const categoryUseCase = new CategoryUseCase(categoryAdapter);
const categoryController = new CategoryController(categoryUseCase);

categoryRoute.get("/all", (req, res) => {
	// #swagger.tags = ['Category']
	/* #swagger.responses[200] = {
            description: 'Return all categories',
            schema: { $ref: '#/definitions/Category' }
    } */
	categoryController.getAll(req, res);
});

categoryRoute.post("/create", (req, res) => {
	// #swagger.tags = ['Category']
	/* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/Category' }
                }
            }
        }
    */
	categoryController.createCategory(req, res);
});
