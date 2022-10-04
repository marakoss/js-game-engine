import { initialGameState } from "game/state";
import { IGameState } from "types/gamestate";
import { possibleCommands } from "constants/commands";
import { GameActionEnum } from "constants/game";
import { playerProfile } from "game/player";
import { gameMap } from "game/map";
import { LocationDirectionsTypesEnum } from "constants/locations";
import { LocationConnectionType } from "types/location";

const traverseMap = (
	direction: LocationDirectionsTypesEnum,
	state: IGameState,
	dispatch: Function
) => {
	const room = state.currentPosition;
	const currentRoom = gameMap[room];

	const goToRoom: LocationConnectionType[] = currentRoom.connects.filter(
		(connectedRoom: LocationConnectionType) => {
			return connectedRoom.direction.find((el) => el === direction);
		}
	);
	if (goToRoom.length === 0) {
		return "Tímhle směrem jít nemůžeš! Zkus to jinak.";
	}
	state.currentPosition = goToRoom[0].link;

	const newRoom = state.currentPosition;
	const description = `${gameMap[newRoom].name} ${gameMap[newRoom].description}`;

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

	if (lastMessage.text == "ahoj, jake je tve jmeno?") {
		state.userProfile.name = lastCommand.text;
		return `Krásné jméno, odteď si budu pamatovat, že se jmenuješ ${lastCommand.text}`;
	}

	if (lastCommand.data !== undefined) {
		if (lastCommand.data.name == possibleCommands.JMENO) {
			return `Řekl jsi mi, že se jmenuješ ${state.userProfile.name}`;
		}

		if (lastCommand.data.name == possibleCommands.LOOK) {
			const room = state.currentPosition;
			const description = `${gameMap[room].name} ${gameMap[room].description}`;
			return `Právě jsi ${description}`;
		}

		if (lastCommand.data.name == possibleCommands.NORTH) {
			return traverseMap(
				LocationDirectionsTypesEnum.NORTH,
				state,
				dispatch
			);
		}

		if (lastCommand.data.name == possibleCommands.SOUTH) {
			return traverseMap(
				LocationDirectionsTypesEnum.SOUTH,
				state,
				dispatch
			);
		}

		if (lastCommand.data.name == possibleCommands.EAST) {
			return traverseMap(
				LocationDirectionsTypesEnum.EAST,
				state,
				dispatch
			);
		}

		if (lastCommand.data.name == possibleCommands.WEST) {
			return traverseMap(
				LocationDirectionsTypesEnum.WEST,
				state,
				dispatch
			);
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
