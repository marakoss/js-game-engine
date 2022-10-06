import { CommandEnum } from "constants/commands";
import { IGameState } from "./gamestate";
import { IHistory } from "./history";
import { ILocation } from "./location";

export interface IResponders {
	handlers: Map<CommandEnum, IResponder>;
	registerHandlers: (
		args: { command: CommandEnum; handler: IResponder }[]
	) => void;
	registerHandler: (command: CommandEnum, handler: IResponder) => void;
	callHandler: (
		handler: IResponder,
		state: IGameState,
		dispatch: Function
	) => string;
	callHandlers: (state: IGameState, dispatch: Function) => string;
}

export type IResponder = (
	request: IHistory,
	state: IGameState,
	currentRoom: ILocation,
	dispatch: Function
) => string;
