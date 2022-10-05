import { CommandEnum, commandAliases } from "constants/commands";
import { ItemEnum } from "constants/items";
import { IGameState } from "types/gamestate";
import { locations } from "game/locations";

function getStringProbability(
	word: string,
	commandWord: string,
	command: CommandEnum
) {
	const distance = levenshteinDistance(
		word.toLowerCase(),
		commandWord.toLowerCase()
	);

	const lengthDiff = Math.abs(word.length - commandWord.length);

	const score = distance * (lengthDiff + 1) + 2.8;
	return {
		original: {
			word: word,
			command: commandWord,
		},
		command: command,
		confidence: 1 / Math.log(score),
	};
}

function getMostProbableCommand(word: string, includedCommands: CommandEnum[]) {
	const possibleCommandAlisesInRoom = includedCommands.flatMap((command) => {
		type CommandType = keyof typeof commandAliases;
		const key = command as CommandType;
		return commandAliases[key].map((alias) => {
			return {
				alias: alias,
				command: key as CommandEnum,
			};
		});
	});

	const probableCommands = includedCommands.map((command) => {
		return getStringProbability(word, command, command);
	});

	const probableAliases = possibleCommandAlisesInRoom.map((command) => {
		return getStringProbability(word, command.alias, command.command);
	});

	const allPossibleCommands = [...probableCommands, ...probableAliases];

	const sortedCommands = allPossibleCommands.sort((a, b) => {
		return a.confidence >= b.confidence ? -1 : 1;
	});

	if (sortedCommands[0].confidence <= 0.6) {
		return {
			original: {
				word: word,
				command: CommandEnum.NOOP,
			},
			command: CommandEnum.NOOP,
			confidence: 1,
		};
	}

	return sortedCommands[0];
}

export function getGuessedCommand(
	sentence: string,
	state: IGameState
): CommandEnum {
	const possibleCommandsInRoom = locations.get(
		state.currentPosition
	)!.actions;

	const commands = sentence.split(" ").map((word) => {
		return getMostProbableCommand(word, possibleCommandsInRoom);
	});

	return commands[0].command;
}

function getGuessedArgument(word: string) {
	// get list of all entities
	// get list of all items
	// get list of all locations
	// get list of all quests
	const possibleItems = Object.keys(ItemEnum);

	return {
		original: word,
		argument: possibleItems[0],
		confidence: 0,
	};
}

function getGuessedArguments(words: string[]) {
	return words.map((word) => {
		return getGuessedArgument(word);
	});
}

export function getArguments(
	text: string,
	excludeCommand: string,
	state: IGameState
) {
	const words = text.split(" ").filter((value, _index, _array) => {
		// TODO: filter giberish words
		// TODO: filter useless words
		return value.toLowerCase() !== excludeCommand.toLowerCase();
	});
	return getGuessedArguments(words);
}

const levenshteinDistance = (str1: string = "", str2: string = "") => {
	const track = Array(str2.length + 1)
		.fill(null)
		.map(() => Array(str1.length + 1).fill(null));
	for (let i = 0; i <= str1.length; i += 1) {
		track[0][i] = i;
	}
	for (let j = 0; j <= str2.length; j += 1) {
		track[j][0] = j;
	}
	for (let j = 1; j <= str2.length; j += 1) {
		for (let i = 1; i <= str1.length; i += 1) {
			const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
			track[j][i] = Math.min(
				track[j][i - 1] + 1, // deletion
				track[j - 1][i] + 1, // insertion
				track[j - 1][i - 1] + indicator // substitution
			);
		}
	}
	return track[str2.length][str1.length];
};
