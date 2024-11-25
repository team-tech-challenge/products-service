import swaggerAutogen from "swagger-autogen";

const doc = {
	info: {
		version: "v1.0.0",
		title: "Swagger Tech Challenge",
		description: "Tech Challenge API",
	},
	servers: [
		{
			url: "http://localhost:3000",
		},
	],
	definitions: {
		Category: {
			name: "Category Name",
		},
		Combo: {
			name: "Combo Name",
			discount: "10",
		},
		Product: {
			name: "Product Name",
			price: "8.90",
			description: "Product Name",
			category: {
				$ref: "#/definitions/Category",
			}
		},
		AddProduct: {
			name: "Product Name",
			price: "8.90",
			description: "Product Description",
			categoryId: 1,
		},
		AddComboProduct: {
			comboId: 1,
			productId: 1,
		},
	},
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/infrastructure/config/routes.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
