import { historyTypeEnum } from "constants/history";

export type IHistory = {
	type: historyTypeEnum;
	text: string;
	data?: IHistorydata;
	time: Date | number;
};

export type IHistorydata = {
	name: string;
	originalInput: string;
	transformedInput: string;
};
