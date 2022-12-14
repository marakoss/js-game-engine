import { loadGame, saveGame, resetGame } from "engine/storage";
import { handleRequest } from "engine/request";
import { getResponse } from "engine/response";
import { initialGameState } from "game/state";
import { historyTypeEnum } from "constants/history";
import { IGame } from "types/game";
import { GameActionEnum } from "constants/game";
import { CommandEnum } from "constants/commands";

export function createGame(): IGame {
	const state = loadGame() ?? initialGameState;

	const dispatch = function (action: GameActionEnum) {
		switch (action) {
			case GameActionEnum.SAVE:
				saveGame(state);
				break;
			case GameActionEnum.LOAD:
				loadGame();
				break;
			case GameActionEnum.RESET:
				resetGame();
				break;
		}
	};

	return {
		state: state,
		saveGame: function () {
			saveGame(state);
		},
		loadGame: function () {
			loadGame();
		},
		resetGame: function () {
			// TODO: RESET GAME STATE
			resetGame();
		},
		handleInput: function (input: string) {
			// TODO: input xss injection protection
			state.history.push({
				type: historyTypeEnum.COMMAND,
				text: input,
				data: handleRequest(input, state, dispatch),
				time: new Date().getTime(),
				location: state.currentPosition,
			});

			state.history.push({
				type: historyTypeEnum.RESPONSE,
				text: getResponse(state, dispatch),
				data: {
					command: CommandEnum.NOOP,
					arguments: [],
					originalInput: "",
					transformedInput: "",
				},
				time: new Date().getTime(),
				location: state.currentPosition,
			});
			return state;
		},
	};
}
