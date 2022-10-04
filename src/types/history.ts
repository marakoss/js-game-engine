import { historyTypeEnum } from "constants/history";
import { LocationsEnum } from "constants/locations";

export type IHistory = {
	type: historyTypeEnum;
	text: string;
	data?: IHistorydata;
	time: Date | number;
	location: LocationsEnum;
};

export type IHistorydata = {
	name: string;
	originalInput: string;
	transformedInput: string;
};
