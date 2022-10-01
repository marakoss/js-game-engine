import { loadGame, saveGame, resetGame } from "engine/storage";
import { gameState } from "game/state";

export function createGame() {
	const state = loadGame() ?? gameState;

	return {
		state: state,
		saveGame: function () {
			saveGame(state);
		},
		resetGame: function () {
			resetGame();
		},
	};
}
