import {
	LocationEnum,
	LocationTypeEnum,
	LocationDirectionEnum,
} from "constants/locations";

export type LocationConnectionType = {
	link: LocationEnum;
	type: LocationTypeEnum;
	direction: LocationDirectionEnum[];
};
