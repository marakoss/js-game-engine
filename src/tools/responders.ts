import { IResponders } from "types/responders";
import { locations } from "game/locations";
import { initialGameState } from "game/state";
import { historyTypeEnum } from "constants/history";

export const responders: IResponders = {
	handlers: new Map(),
	registerHandlers(args) {
		args.map((arg) => {
			this.registerHandler(arg.command, arg.handler);
		});
	},
	registerHandler(command, handler) {
		this.handlers.set(command, handler);
	},
	callHandler(handler, state, dispatch) {
		const currentRoom = locations.get(state.currentPosition)!;

		try {
			return handler(state.history.at(-1)!, state, currentRoom, dispatch);
		} catch (e) {
			return "S touhle informací si (zatím) neumím poradit";
		}
	},
	callHandlers(state, dispatch) {
		const lastRequest = state.history.at(-1);

		if (lastRequest == undefined) return "Wrong history";
		if (lastRequest.type !== historyTypeEnum.COMMAND) {
			return "Wrong command type";
		}
		const handler = this.handlers.get(lastRequest.data.command)!;
		return this.callHandler(handler, state, dispatch);
	},
};
