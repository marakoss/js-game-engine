import { IGameState } from "types/gamestate";
import { getGuessedCommand, getArguments } from "./language";

export function handleRequest(
	input: string,
	state: IGameState,
	dispatch: Function
) {
	const command = getGuessedCommand(input, state);
	return {
		command: command,
		aguments: getArguments(input, command, state),
		originalInput: input,
		transformedInput: input.toLowerCase().trim(),
	};
}
