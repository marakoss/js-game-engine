import { IGameState } from "types/gamestate";
import responder from "engine/responders/index";

export function getResponse(state: IGameState, dispatch: Function): string {
	if (
		(state !== null &&
			typeof state === "object" &&
			state.hasOwnProperty("history") &&
			typeof state.history === "object" &&
			state.history.length > 0) === false
	)
		return "Something has gone terribly wrong";

	const result = responder.callHandlers(state, dispatch);

	return result;

	/*
	if (lastResponse.text == "ahoj, jake je tve jmeno?") {
		state.userProfile.name = lastRequest.text;
		return `Krásné jméno, odteď si budu pamatovat, že se jmenuješ ${lastRequest.text}`;
	}

	if (lastRequest.data !== undefined) {

		if (lastRequest.data.command == CommandEnum.JMENO) {
			return `Řekl jsi mi, že se jmenuješ ${state.userProfile.name}`;
		}

		if (lastRequest.data.command == CommandEnum.AHOJ) {
			if (playerProfile.name === null) return `ahoj, jake je tve jmeno?`;
			else return "ahoj";
		}

		if (lastRequest.data.command == CommandEnum.RESET) {
			dispatch(GameActionEnum.RESET);
			return `Starting a new game`;
		}

		if (lastRequest.data.command == CommandEnum.SAVE) {
			dispatch(GameActionEnum.SAVE);
			return `The game was saved`;
		}
		if (lastRequest.data.command == CommandEnum.LOAD) {
			dispatch(GameActionEnum.LOAD);
			return `The game was loaded from savefile`;
		}
	}

	return "Nerozumím kmenu tvého řeče (a pokud si myslíš, že bych ti měl rozumnět, tak zkus někdy programovat natural language engine)";

	*/
}
