import { CommandTypesEnum } from "constants/commands";
import {
	LocationsEnum,
	LocationTypesEnum,
	LocationDirectionsTypesEnum,
	LocationStateTypesEnum,
} from "constants/locations";
import { QuestTypesEnum } from "constants/quests";
import { ItemTypesEnum } from "constants/items";
import { EntityTypesEnum } from "constants/entities";
import { items } from "./items";
import { entities } from "./entities";
import { quests } from "./quests";

export const gameMap = {
	HOTEL_LOBBY: {
		name: "Vstupni hala",
		description: "Prave se nachazite v hale temné hotelu",
		items: [items.get(ItemTypesEnum.SHOVEL)],
		entities: [entities.get(EntityTypesEnum.GENIE)],
		connects: [
			{
				link: LocationsEnum.HOTEL_STAIRCASE,
				type: LocationTypesEnum.PUBLIC,
				direction: [
					LocationDirectionsTypesEnum.NORTH,
					LocationDirectionsTypesEnum.UP,
				],
			},
		],
		state: [LocationStateTypesEnum.NORMAL],
		actions: [CommandTypesEnum.TAKE],
		quests: [quests.get(QuestTypesEnum.INTRODUCTION)],
	},
	HOTEL_STAIRCASE: {
		name: "Schody hotelu",
		description: "Prave se nachazite na starých vrzavých schodech hotelu",
		items: [],
		entities: [entities.get(EntityTypesEnum.GENIE)],
		connects: [
			{
				link: LocationsEnum.HOTEL_LOBBY,
				type: LocationTypesEnum.PUBLIC,
				direction: [
					LocationDirectionsTypesEnum.SOUTH,
					LocationDirectionsTypesEnum.DOWN,
				],
			},
		],
		state: [LocationStateTypesEnum.NORMAL],
		actions: [],
		quests: [],
	},
	HOTEL_ROOM: {
		name: "Pokoj hotelu",
		description: "Jste v pokoji a haraší Vám ve věži",
		items: [],
		entities: [entities.get(EntityTypesEnum.GENIE)],
		connects: [],
		state: [LocationStateTypesEnum.NORMAL],
		actions: [],
		quests: [],
	},
};
