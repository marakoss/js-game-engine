import { CommandEnum } from "constants/commands";
import { EntityEnum } from "constants/entities";
import { historyTypeEnum } from "constants/history";
import { ItemEnum } from "constants/items";
import { LocationEnum } from "constants/locations";
import { QuestEnum } from "constants/quests";

export type IHistory = {
	type: historyTypeEnum;
	text: string;
	data?: IHistorydata;
	time: Date | number;
	location: LocationEnum;
};

export type IHistorydata = {
	command: CommandEnum;
	arguments?: Argument[];
	originalInput?: string;
	transformedInput?: string;
};

export type Argument = {
	original: {
		word: string;
	};
	argument: ItemEnum | EntityEnum | LocationEnum | QuestEnum | null | string;
	confidence: number;
};
