import { IHistory } from "./history";
import { IUserProfile } from "./userprofile";
import { LocationsEnum } from "constants/locations";

export type IGameState = {
	messageCounter: number;
	history: [IHistory];
	inventory: [object?];
	currentPosition: LocationsEnum;
	userProfile: IUserProfile;
};
