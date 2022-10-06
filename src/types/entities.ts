import {
	EntityAbilityTypeEnum,
	EntityActionTypeEnum,
} from "constants/entities";

export type IEntity = {
	name: string;
	description: string;
	abilities: EntityAbilityTypeEnum[];
	actions: EntityActionTypeEnum[];
};
