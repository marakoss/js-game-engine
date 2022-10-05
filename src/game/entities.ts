import {
	EntityTypesEnum,
	EntityAbilitiesTypeEnum,
	EntityActionsTypeEnum,
} from "constants/entities";

export const entities = new Map([
	[
		EntityTypesEnum.GENIE,
		{
			name: "Džin z lahve",
			description:
				"Magický džin, umí splnit jakékoli přání. Užij ho s rozumem.",
			abilities: [EntityAbilitiesTypeEnum.FLY],
			actions: [EntityActionsTypeEnum.BURP],
		},
	],
]);
