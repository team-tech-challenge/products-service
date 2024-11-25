import { ComboUseCase } from "@usecases/ComboUseCase";
import { defaultReturnStatement, formatObjectResponse } from "@utils/http";


export class ComboController {
	constructor(private comboUseCase: ComboUseCase) { }

	async getAll(req, res) {
		try {
			const combos = await this.comboUseCase.getAll();
			res.json(combos)
		} catch (err) {
			console.error(err);
			res.status(400).json({error: err });
		}
	}

	async getComboById(req, res) {
		try {
			const comboId = req.params.Id;
			const combo = await this.comboUseCase.getComboById(comboId);
			res.json(combo);
		} catch (err) {
			console.error(err);
			res.status(400).json({error: err });
		}
	}

	async createCombo(req, res) {
		try {			
			const combo = await this.comboUseCase.createCombo(req.body);
			res.json(combo);
		} catch (err) {
			console.error(err);
			res.status(400).json({error: err });
		}
	}

	async createComboProductAssociation(req, res) {
		try {
			await this.comboUseCase.createComboProductAssociation(req.body);
			res.json("Product Association Created")
		} catch (err) {
			console.error(err);
			res.status(400).json({error: err });
		}
	}

	async getComboProducts(req, res) {
		try {
			const comboID = req.params.id;
			const products = await this.comboUseCase.getComboProducts(comboID);
			res.json(products);			
		} catch (err) {
			console.error(err);
			res.status(400).json({error: err });
		}
	}
}
