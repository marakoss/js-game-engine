import { CommandEnum } from "constants/commands";
import { historyTypeEnum } from "constants/history";
import { IGameState } from "types/gamestate";
import { playerProfile } from "./player";
import { LocationEnum } from "constants/locations";

export const initialGameState: IGameState = {
	messageCounter: 0,
	currentPosition: LocationEnum.HOTEL_LOBBY,
	history: [
		{
			type: historyTypeEnum.RESPONSE,
			text: "Vitej ve hře. Nápovědu zobrazíš napsáním HELP a stiskem klávesy ENTER",
			data: {
				command: CommandEnum.NOOP,
			},
			time: new Date().getTime(),
			location: LocationEnum.HOTEL_LOBBY,
		},
	],
	inventory: [],
	userProfile: playerProfile,
};
