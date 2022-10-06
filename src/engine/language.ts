import { CommandEnum, commandAliases } from "constants/commands";
import { ItemEnum } from "constants/items";
import { EntityEnum } from "constants/entities";
import { LocationEnum } from "constants/locations";
import { QuestEnum } from "constants/quests";
import { IGameState } from "types/gamestate";
import { defaultLocationActions, locations } from "game/locations";

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

	//const score = distance * (lengthDiff + 1) + 2.8;
	const score = 1 / (Math.pow(distance * (lengthDiff + 1), 2) + 1);
	return {
		original: {
			word: word,
			command: commandWord,
		},
		command: command,
		confidence: score,
	};
}

function getMostProbableCommand(word: string, includedCommands: CommandEnum[]) {
	//TODO: Ignore 2 letter words

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
			confidence: 0,
		};
	}

	return sortedCommands[0];
}

export function getGuessedCommand(
	sentence: string,
	state: IGameState
): CommandEnum {
	const currentRoom = locations.get(state.currentPosition);
	if (currentRoom === undefined) return CommandEnum.NOOP;

	const possibleCommandsInRoom = currentRoom.actions;
	const possibleDirectionsInRoom = currentRoom.connects.flatMap((el) => {
		return el.direction as unknown as CommandEnum;
	});

	const allPossible = [
		...defaultLocationActions,
		...possibleDirectionsInRoom,
		...possibleCommandsInRoom,
	];

	const commands = sentence
		.replace(/\s\s+/g, " ")
		.split(" ")
		.map((word) => {
			return getMostProbableCommand(word, allPossible);
		});

	const sortedCommands = commands.sort((a, b) => {
		return a.confidence >= b.confidence ? -1 : 1;
	});

	return sortedCommands[0].command;
}

function getStringArgumentProbability(word: string, argument: string) {
	const distance = levenshteinDistance(
		word.toLowerCase(),
		argument.toLowerCase()
	);

	const lengthDiff = Math.abs(word.length - argument.length);

	//const score = 1 / Math.log(distance * (lengthDiff + 1));
	const score = 1 / (Math.pow(distance * (lengthDiff + 1), 2) + 1);
	return {
		original: {
			word: word,
		},
		argument: argument,
		confidence: score,
	};
}

function getGuessedArgument(word: string) {
	// get list of all entities, itemsm locations, quests
	const possibleItems = Object.keys(ItemEnum);
	const possibleEntities = Object.keys(EntityEnum);
	const possibleLocations = Object.keys(LocationEnum);
	const possibleQuests = Object.keys(QuestEnum);

	const allPossibleArguments = [
		...possibleItems,
		...possibleEntities,
		...possibleLocations,
		...possibleQuests,
	];

	// calculate probability for each word against possible arguments
	const ratedArguments = allPossibleArguments.map((argument) => {
		return getStringArgumentProbability(word, argument);
	});

	const sortedArguments = ratedArguments.sort((a, b) => {
		return a.confidence >= b.confidence ? -1 : 1;
	});

	if (sortedArguments[0].confidence <= 0.6) {
		return {
			original: {
				word: word,
			},
			argument: null,
			confidence: 0,
		};
	}

	return sortedArguments[0];
}

function getGuessedArguments(words: string[]) {
	return words.map((word) => {
		return getGuessedArgument(word);
	});
}

export function getArguments(
	input: string,
	excludeCommand: string,
	state: IGameState
) {
	const words = input
		.replace(/\s\s+/g, " ")
		.split(" ")
		.filter((value, _index, _array) => {
			// TODO: filter giberish words
			// TODO: filter useless words
			// TODO: filter profanity
			return value.toLowerCase() !== excludeCommand.toLowerCase();
		});

	const allArguments = getGuessedArguments(words);

	const sortedArguments = allArguments.sort((a, b) => {
		return a.confidence >= b.confidence ? -1 : 1;
	});

	return sortedArguments;
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
