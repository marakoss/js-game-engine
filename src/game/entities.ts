import {
	EntityEnum,
	EntityAbilityTypeEnum,
	EntityActionTypeEnum,
} from "constants/entities";

export const entities = new Map([
	[
		EntityEnum.GENIE,
		{
			name: "Džin z lahve",
			description:
				"Magický džin, umí splnit jakékoli přání. Užij ho s rozumem.",
			abilities: [EntityAbilityTypeEnum.FLY],
			actions: [EntityActionTypeEnum.BURP],
		},
	],
]);
