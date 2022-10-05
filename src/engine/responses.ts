import { initialGameState } from "game/state";
import { IGameState } from "types/gamestate";
import { CommandEnum } from "constants/commands";
import { GameActionEnum } from "constants/game";
import { playerProfile } from "game/player";
import { gameMap } from "game/map";
import { LocationDirectionEnum } from "constants/locations";
import { LocationConnectionType } from "types/location";

const traverseMap = (direction: LocationDirectionEnum, state: IGameState) => {
	const room = state.currentPosition;
	const currentRoom = gameMap.get(room)!;

	const goToRoom: LocationConnectionType[] = currentRoom.connects.filter(
		(connectedRoom: LocationConnectionType) => {
			return connectedRoom.direction.find(
				(el) => el.toLowerCase() === direction.toLowerCase()
			);
		}
	);
	if (goToRoom.length === 0) {
		return "Tímhle směrem jít nemůžeš! Zkus to jinak.";
	}
	state.currentPosition = goToRoom[0].link;

	const newRoom = state.currentPosition;
	const description = `${gameMap.get(newRoom)!.name} ${
		gameMap.get(newRoom)!.description
	}`;

	return `${description}`;
};

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
	const room = state.currentPosition;

	if (lastMessage.text == "ahoj, jake je tve jmeno?") {
		state.userProfile.name = lastCommand.text;
		return `Krásné jméno, odteď si budu pamatovat, že se jmenuješ ${lastCommand.text}`;
	}

	if (lastCommand.data !== undefined) {
		if (
			[
				CommandEnum.NORTH,
				CommandEnum.SOUTH,
				CommandEnum.EAST,
				CommandEnum.WEST,
			].includes(lastCommand.data.name as CommandEnum)
		) {
			return traverseMap(
				lastCommand.data.name as LocationDirectionEnum,
				state
			);
		}

		if (lastCommand.data.name == CommandEnum.JMENO) {
			return `Řekl jsi mi, že se jmenuješ ${state.userProfile.name}`;
		}

		if (lastCommand.data.name == CommandEnum.TAKE) {
		}

		if (lastCommand.data.name == CommandEnum.LOOK) {
			const description = `${gameMap.get(room)!.name} ${
				gameMap.get(room)!.description
			}`;
			return `Právě jsi ${description}`;
		}

		if (lastCommand.data.name == CommandEnum.AHOJ) {
			if (playerProfile.name === null) return `ahoj, jake je tve jmeno?`;
			else return "ahoj";
		}
		if (lastCommand.data.name == CommandEnum.RESET) {
			dispatch(GameActionEnum.RESET);
			return `Starting a new game`;
		}

		if (lastCommand.data.name == CommandEnum.SAVE) {
			dispatch(GameActionEnum.SAVE);
			return `The game was saved`;
		}
		if (lastCommand.data.name == CommandEnum.LOAD) {
			dispatch(GameActionEnum.LOAD);
			return `The game was loaded from savefile`;
		}
	}

	return "Nerozumím kmenu tvého řeče (a pokud si myslíš, že bych ti měl rozumnět, tak zkus někdy programovat natural language engine)";
}
