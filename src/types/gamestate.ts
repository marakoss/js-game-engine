import { IHistory } from "./history";
import { IUserProfile } from "./userprofile";

export type IGameState = {
	messageCounter: number;
	history: [IHistory];
	inventory: [object?];
	currentPosition: number;
	userProfile: IUserProfile;
};
