import connection from "@config/connectionFactory";
import { Category } from "@database/CategoryModel";
import { Combo } from "@database/ComboModel";
import { ComboProduct } from "@database/ComboProductModel";
import { Product } from "@database/ProductModel";

export default () => {
	connection.database.addModels([
		Category,
		Product,
		Combo,
		ComboProduct
	]);
};
