import { Table, Column, DataType, Model, HasMany } from "sequelize-typescript";
import { Product } from "@database/ProductModel";

@Table({
	timestamps: true,
	tableName: "category",
	modelName: "Category",
})
export class Category extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string;

	// Relacionamento de Um para Muitos com Product
	@HasMany(() => Product)
	product: Product[];
}
