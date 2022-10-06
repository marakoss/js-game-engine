import { ItemEnum } from "constants/items";
import { items } from "game/items";
import { IGameState } from "types/gamestate";
import { IHistory } from "types/history";
import { ILocation } from "types/location";

function takeHandler(
	request: IHistory,
	state: IGameState,
	currentRoom: ILocation,
	dispatch: Function
) {
	const args = request?.data?.arguments || null;

	if (args === null) return "Musíš napsat co chceš vzít";

	const item = args[0]?.argument as ItemEnum;

	if (item === undefined) return "Musíš napsat co chceš vzít";
	if (item === null) return "Tento objekt neznám";

	if (currentRoom.items.has(item)) {
		state.inventory.set(item, items.get(item)!);
		currentRoom.items.delete(item);

		return `Vzal jsi ${items.get(item)!.name}`;
	}

	return "Tento objekt tu není";
}

export default takeHandler;
