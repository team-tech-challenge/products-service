import { Combo } from "@entities/Combo";

export class ComboMapper {
	// Mapeia de ComboModel (banco) para Combo (domínio)
	static toEntity(ComboModel: any): Combo {
		return new Combo(
			ComboModel.name,
			ComboModel.discount,
			ComboModel.id
		);
	}

	// Mapeia de Combo (domínio) para ComboModel (banco)
	static toModel(Combo: Combo): any {
		return {
			name: Combo.getName(),
			discount: Combo.getDiscount(),
			id: Combo.getId(),
		};
	}
}
