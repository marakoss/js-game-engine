import {
	LocationsEnum,
	LocationTypesEnum,
	LocationDirectionsTypesEnum,
} from "constants/locations";

export type LocationConnectionType = {
	link: LocationsEnum;
	type: LocationTypesEnum;
	direction: LocationDirectionsTypesEnum[];
};
