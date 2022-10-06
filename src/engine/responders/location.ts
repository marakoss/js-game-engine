import { locations } from "game/locations";
import { IGameState } from "types/gamestate";
import { IHistory } from "types/history";
import { ILocation, LocationConnectionType } from "types/location";

function locationHandler(
	request: IHistory,
	state: IGameState,
	currentRoom: ILocation,
	dispatch: Function
) {
	const direction = request.data.command;
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
	const description = `${locations.get(newRoom)!.name} ${
		locations.get(newRoom)!.description
	}`;

	return `${description}`;
}

export default locationHandler;
