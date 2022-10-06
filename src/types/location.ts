import { CommandEnum } from "constants/commands";
import { EntityEnum } from "constants/entities";
import { ItemEnum } from "constants/items";
import {
	LocationEnum,
	LocationTypeEnum,
	LocationDirectionEnum,
	LocationStateEnum,
} from "constants/locations";
import { QuestEnum } from "constants/quests";
import { IEntity } from "./entities";
import { IInventoryItem } from "./items";
import { IQuest } from "./quests";

export type LocationConnectionType = {
	link: LocationEnum;
	type: LocationTypeEnum;
	direction: LocationDirectionEnum[];
};

export type ILocation = {
	name: string;
	description: string;
	items: Map<ItemEnum, IInventoryItem>;
	entities: Map<EntityEnum, IEntity>;
	quests: Map<QuestEnum, IQuest>;
	connects: LocationConnectionType[];
	state: LocationStateEnum[];
	actions: CommandEnum[];
};
