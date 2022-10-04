import { historyTypeEnum } from "constants/history";
import { IGameState } from "types/gamestate";
import { playerProfile } from "./player";
import { LocationsEnum } from "constants/locations";

export const initialGameState: IGameState = {
	messageCounter: 0,
	currentPosition: LocationsEnum.HOTEL_LOBBY,
	history: [
		{
			type: historyTypeEnum.RESPONSE,
			text: "Vitej",
			data: {
				name: "",
				originalInput: "",
				transformedInput: "",
			},
			time: new Date().getTime(),
			location: LocationsEnum.HOTEL_LOBBY,
		},
	],
	inventory: [],
	userProfile: playerProfile,
};
