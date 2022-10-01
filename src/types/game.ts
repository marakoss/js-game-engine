import { IGameState } from "./gamestate";

export interface IGame {
	state: IGameState;
	loadGame: () => void;
	saveGame: () => void;
	resetGame: () => void;
	handleInput: (input: string) => IGameState;
}
