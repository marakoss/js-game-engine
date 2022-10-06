import { CommandEnum } from "constants/commands";
import {
	LocationEnum,
	LocationTypeEnum,
	LocationDirectionEnum,
	LocationStateEnum,
} from "constants/locations";
import { QuestEnum } from "constants/quests";
import { ItemEnum } from "constants/items";
import { EntityEnum } from "constants/entities";
import { items } from "./items";
import { entities } from "./entities";
import { quests } from "./quests";
import { ILocation } from "types/location";

export const defaultLocationActions = [CommandEnum.LOOK, CommandEnum.HELP];

export const locations: Map<LocationEnum, ILocation> = new Map([
	[
		LocationEnum.HOTEL_LOBBY,
		{
			name: "Vstupni hala",
			description: "Prave se nachazite v hale temné hotelu",
			items: new Map([[ItemEnum.SHOVEL, items.get(ItemEnum.SHOVEL)!]]),
			entities: new Map([
				[EntityEnum.GENIE, entities.get(EntityEnum.GENIE)!],
			]),
			connects: [
				{
					link: LocationEnum.HOTEL_STAIRCASE,
					type: LocationTypeEnum.PUBLIC,
					direction: [
						LocationDirectionEnum.NORTH,
						LocationDirectionEnum.UP,
					],
				},
			],
			state: [LocationStateEnum.NORMAL],
			actions: [CommandEnum.TAKE, CommandEnum.AHOJ],
			quests: new Map([
				[QuestEnum.INTRODUCTION, quests.get(QuestEnum.INTRODUCTION)!],
			]),
		},
	],
	[
		LocationEnum.HOTEL_STAIRCASE,
		{
			name: "Schody hotelu",
			description:
				"Prave se nachazite na starých vrzavých schodech hotelu",
			items: new Map(),
			entities: new Map([
				[EntityEnum.GENIE, entities.get(EntityEnum.GENIE)!],
			]),
			connects: [
				{
					link: LocationEnum.HOTEL_LOBBY,
					type: LocationTypeEnum.PUBLIC,
					direction: [
						LocationDirectionEnum.SOUTH,
						LocationDirectionEnum.DOWN,
					],
				},
			],
			state: [LocationStateEnum.NORMAL],
			actions: [],
			quests: new Map(),
		},
	],
	[
		LocationEnum.HOTEL_ROOM,
		{
			name: "Pokoj hotelu",
			description: "Jste v pokoji a haraší Vám ve věži",
			items: new Map(),
			entities: new Map([
				[EntityEnum.GENIE, entities.get(EntityEnum.GENIE)!],
			]),
			connects: [],
			state: [LocationStateEnum.NORMAL],
			actions: [],
			quests: new Map(),
		},
	],
]);
