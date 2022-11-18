import { IGameState } from "types/gamestate";
import { IHistory } from "types/history";
import { ILocation } from "types/location";

function lookHandler(
	request: IHistory,
	state: IGameState,
	currentRoom: ILocation,
	dispatch: Function
) {
	const description = `${currentRoom.name} ${currentRoom!.description}`;
	currentRoom.items
	return `Právě jsi v ${description}`;
}

export default lookHandler;
