import { CommandEnum, commandAliases } from "constants/commands";

function getGuessedCommand(text: string) {
	var lowest = 1000;
	var intent = "";
	const words = text.split(" ");
	words.forEach((word: string) => {
		type CommanKeyType = keyof typeof commandAliases;
		const commandKeys = Object.keys(commandAliases) as CommanKeyType[];

		commandKeys.forEach((key: CommanKeyType) => {
			const distance = levenshteinDistance(
				key.toUpperCase(),
				word.toUpperCase()
			);
			if (distance < lowest) {
				lowest = distance;
				intent = key;
			}

			commandAliases[key].forEach((alias: string) => {
				const distance = levenshteinDistance(
					alias.toUpperCase(),
					word.toUpperCase()
				);
				if (distance < lowest) {
					lowest = distance;
					intent = key;
				}
			});
		});
	});
	return intent.toUpperCase() as CommandEnum;
}

function getArguments(text: string, excludeCommand: string) {
	// get list of all entities
	// get list of all items
	// get list of all locations
	// get list of all quests
	return text;
}

export function processRequest(text: string) {
	const command = getGuessedCommand(text);
	return {
		command: command,
		aguments: getArguments(text, command),
		originalInput: text,
		transformedInput: text.toLowerCase().trim(),
	};
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
