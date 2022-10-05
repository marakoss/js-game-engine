import { IHistory } from "./history";
import { IInventoryItem } from "./items";
import { IUserProfile } from "./userprofile";
import { LocationEnum } from "constants/locations";

export type IGameState = {
	messageCounter: number;
	history: [IHistory];
	inventory: [IInventoryItem?];
	currentPosition: LocationEnum;
	userProfile: IUserProfile;
};
