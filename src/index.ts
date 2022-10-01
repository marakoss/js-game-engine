import { createWebApp } from "tools/dom";
import { loadGame, saveGame } from "engine/storage";
import { historyTypeEnum } from "constants/history";
import { possibleCommands } from "constants/commands";
import { createCommand } from "engine/language";
import type { IGameState } from "types/gamestate";
import { IHistory } from "types/history";

const handleSubmit = function () {
	const text = app.readInput();

	gameState.history.push({
		type: historyTypeEnum.COMMAND,
		text: text,
		data: createCommand(text),
		time: new Date().getTime(),
	});

	gameState.history.push({
		type: historyTypeEnum.RESPONSE,
		text: getResponse(),
		time: new Date().getTime(),
	});

	app.clearInput();
	writeAllNewMessagesToChat(gameState);
	saveGame(gameState);
};

const app = createWebApp(
	//@ts-expect-error wocument will contain those elements
	document.getElementById("command"),
	document.getElementById("console"),
	document.getElementById("form"),
	handleSubmit
);

loadGame();

export function writeAllNewMessagesToChat(gameState: IGameState) {
	while (gameState.messageCounter < gameState.history.length) {
		const history = gameState.history[gameState.messageCounter];

		if (history === undefined) break;

		const div = document.createElement("div");
		div.className = history.type;
		div.innerHTML = history.text;

		app.writeOutput(div);

		gameState.messageCounter++;
	}
}

const items = {
	shovel: {
		name: "",
		description:
			"Tohle je moc hezka lopata, akorat s ni nekoho jebout po palici",
	},
};

const gameMap = {
	hotel_lobby: {
		name: "Vstupni hala",
		description: "Prave se nachazite v hale temné hotelu",
		items: [items.shovel],
		entities: ["Lucie"],
		connects: [
			{ link: "stairs", type: "hidden", direction: "north" },
			{ link: "mistnost2", type: "hidden", direction: "down" },
		],
		state: ["normal"],
		actions: ["ahoj", "dig", "talk"],
		quests: [
			{
				id: "jmeno",
				name: "Predstav se",
				state: ["unsolved"],
			},
		],
	},
};

const userProfile = {
	name: null,
	age: null,
};
var gameState: IGameState = {
	messageCounter: 0,
	currentPosition: 0,
	history: [],
	inventory: [],
	userProfile: userProfile,
};

gameState.history.push({
	type: historyTypeEnum.RESPONSE,
	text: "hellosssass",
	time: new Date().getTime(),
});

writeAllNewMessagesToChat(gameState);

function getHistory(index: number) {
	if (index < 0)
		return {
			type: historyTypeEnum.RESPONSE,
			text: "",
			data: {
				name: "fuck",
			},
			time: new Date().getTime(),
		};

	return gameState.history[index] as IHistory;
}

function getResponse() {
	if (
		(gameState !== null &&
			typeof gameState === "object" &&
			gameState.hasOwnProperty("history") &&
			typeof gameState.history === "object" &&
			gameState.history.length > 0) === false
	)
		return "";

	const lastCommand = getHistory(gameState.history.length - 1);
	const lastMessage = getHistory(gameState.history.length - 2);

	if (lastMessage.text == "ahoj, jake je tve jmeno?") {
		gameState.userProfile.name = lastCommand.text;
		return `Krásné jméno, odteď si budu pamatovat, že se jmenuješ ${lastCommand.text}`;
	}

	if (lastCommand.data !== undefined) {
		if (lastCommand.data.name == possibleCommands.JMENO) {
			return `Řekl jsi mi, že se jmenuješ ${gameState.userProfile.name}`;
		}

		if (lastCommand.data.name == possibleCommands.AHOJ) {
			if (userProfile.name === null) return `ahoj, jake je tve jmeno?`;
			else return "ahoj";
		}
	}

	return "";
}
