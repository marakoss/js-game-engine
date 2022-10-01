import type { IGameState } from "types/gamestate";
import { saveGameFile } from "constants/storage";

// TODO: Storage engine abstraction

export function saveGame(gameState: IGameState) {
	if (!isLocalStorageAvailable()) return;

	const gameData = {
		gameState: gameState,
	};

	localStorage.setItem(saveGameFile, JSON.stringify(gameData));
}

export function loadGame() {
	if (!isLocalStorageAvailable()) return;

	const data = localStorage.getItem(saveGameFile);
	if (data !== null) {
		const gameData = JSON.parse(data);
		// TODO: validate game data

		return gameData.gameState as IGameState;
	}
	return null;
}

export function resetGame() {
	if (!isLocalStorageAvailable()) return;
	localStorage.removeItem(saveGameFile);
	return true;
}

function isLocalStorageAvailable() {
	var test = "test";
	try {
		localStorage.setItem(test, test);
		localStorage.removeItem(test);
		return true;
	} catch (e) {
		console.warn("Cannot store/load gameData");
		return false;
	}
}
