import { IHistory } from "./history";
import { ItemEnum } from "constants/items";
import { IInventoryItem } from "./items";
import { IUserProfile } from "./userprofile";
import { LocationEnum } from "constants/locations";

export type IGameState = {
	messageCounter: number;
	history: [IHistory];
	inventory: Map<ItemEnum, IInventoryItem>;
	currentPosition: LocationEnum;
	userProfile: IUserProfile;
};
