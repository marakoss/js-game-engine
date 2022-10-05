import { CommandEnum } from "constants/commands";
import { historyTypeEnum } from "constants/history";
import { LocationEnum } from "constants/locations";

export type IHistory = {
	type: historyTypeEnum;
	text: string;
	data?: IHistorydata;
	time: Date | number;
	location: LocationEnum;
};

export type IHistorydata = {
	command: CommandEnum;
	arguments?: string[];
	originalInput?: string;
	transformedInput?: string;
};
