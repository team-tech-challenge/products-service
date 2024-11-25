import { Router } from "express";
import { ComboAdapter } from "@adapters/ComboAdapter";
import { ComboUseCase } from "@usecases/ComboUseCase";
import { ComboController } from "@controllers/ComboController";

export const comboRoute = Router();

const comboAdapter = new ComboAdapter();
const comboUseCase = new ComboUseCase(comboAdapter);
const comboController = new ComboController(comboUseCase);

comboRoute.get("/all", (req, res) => {
	// #swagger.tags = ['Combo']
	/* #swagger.responses[200] = {
            description: 'Return all combos',
            schema: { $ref: '#/definitions/Combo' }
    } */
	comboController.getAll(req, res);
});

comboRoute.get("/:Id", (req, res) => {
	// #swagger.tags = ['Combo']
	comboController.getComboById(req, res);
});

comboRoute.post("/create", (req, res) => {
	// #swagger.tags = ['Combo']
	/* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/Combo' }
                }
            }
        }
    */
	comboController.createCombo(req, res);
});

comboRoute.post("/product/association/create", (req, res) => {
	// #swagger.tags = ['Combo']
	/* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/definitions/AddComboProduct' }
                }
            }
        }
    */
	comboController.createComboProductAssociation(req, res);
});

comboRoute.get("/:id/products", (req, res) => {
	// #swagger.tags = ['Combo']
	comboController.getComboProducts(req, res);
});
