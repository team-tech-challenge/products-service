import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Combo } from "@database/ComboModel";
import { Product } from "@database/ProductModel";

@Table({
	timestamps: true,
	tableName: "combo_product",
	modelName: "ComboProduct",
})
export class ComboProduct extends Model {

	@ForeignKey(() => Combo)
	@Column({		
		type: DataType.INTEGER,
		allowNull: true,
	})
	declare comboId: number;

	@ForeignKey(() => Product)
	@Column({		
		type: DataType.INTEGER,
		allowNull: true,
	})
	declare productId: number;

	// Relacionamento de Muitos para Um com Combo
	@BelongsTo(() => Combo)
	combo: Combo;

	// Relacionamento de Muitos para Um com Product
	@BelongsTo(() => Product)
	product: Product;

}
