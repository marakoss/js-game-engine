import { initialGameState } from "game/state";
import { IGameState } from "types/gamestate";
import { possibleCommands } from "constants/commands";
import { GameActionEnum } from "constants/game";
import { playerProfile } from "game/player";

export function getResponse(state: IGameState, dispatch: Function): string {
	if (
		(state !== null &&
			typeof state === "object" &&
			state.hasOwnProperty("history") &&
			typeof state.history === "object" &&
			state.history.length > 0) === false
	)
		return "";

	function getHistory(index: number) {
		if (index < 0) return initialGameState.history[0];

		return state.history[index];
	}

	const lastCommand = getHistory(state.history.length - 1);
	const lastMessage = getHistory(state.history.length - 2);

	if (lastMessage.text == "ahoj, jake je tve jmeno?") {
		state.userProfile.name = lastCommand.text;
		return `Krásné jméno, odteď si budu pamatovat, že se jmenuješ ${lastCommand.text}`;
	}

	if (lastCommand.data !== undefined) {
		if (lastCommand.data.name == possibleCommands.JMENO) {
			return `Řekl jsi mi, že se jmenuješ ${state.userProfile.name}`;
		}

		if (lastCommand.data.name == possibleCommands.AHOJ) {
			if (playerProfile.name === null) return `ahoj, jake je tve jmeno?`;
			else return "ahoj";
		}
		if (lastCommand.data.name == possibleCommands.RESET) {
			dispatch(GameActionEnum.RESET);
			return `Starting a new game`;
		}
		if (lastCommand.data.name == possibleCommands.SAVE) {
			dispatch(GameActionEnum.SAVE);
			return `The game was saved`;
		}
	}

	return "";
}
