import { historyTypeEnum } from "constants/history";
import { IGameState } from "types/gamestate";
import { playerProfile } from "./player";

export const initialGameState: IGameState = {
	messageCounter: 0,
	currentPosition: 0,
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
		},
	],
	inventory: [],
	userProfile: playerProfile,
};
