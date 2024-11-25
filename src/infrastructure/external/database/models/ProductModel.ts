import { Table, Column, DataType, Model, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Category } from "@database/CategoryModel";
import { ComboProduct } from "@database/ComboProductModel";

@Table({
	timestamps: true,
	tableName: "product",
	modelName: "Product",
})
export class Product extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@ForeignKey(() => Category)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare categoryId: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	description: string;

	@Column({
		type: DataType.FLOAT,
		allowNull: false,
	})
	price: number;

	// Relacionamento de Muitos para Um com Category
	@BelongsTo(() => Category)
	declare category: Category;

	@HasMany(() => ComboProduct)
	declare comboproduct: ComboProduct[];

}
