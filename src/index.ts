import { createWebApp } from "tools/dom";
import { createGame } from "tools/game";
import { historyTypeEnum } from "constants/history";
import { possibleCommands } from "constants/commands";
import { createCommand } from "engine/language";
import { IHistory } from "types/history";
import { playerProfile } from "game/player";

const handleSubmit = function () {
	const text = app.readInput();

	game.state.history.push({
		type: historyTypeEnum.COMMAND,
		text: text,
		data: createCommand(text),
		time: new Date().getTime(),
	});

	game.state.history.push({
		type: historyTypeEnum.RESPONSE,
		text: getResponse(),
		time: new Date().getTime(),
	});

	app.writeNewMessagesToOutput(game.state.history);
	app.clearInput();
	app.scrollBottom();
};

const game = createGame();

const app = createWebApp(
	//@ts-expect-error wocument will contain those elements
	document.getElementById("command"),
	document.getElementById("console"),
	document.getElementById("form"),
	handleSubmit
);

game.state.history.push({
	type: historyTypeEnum.RESPONSE,
	text: "Vítej",
	time: new Date().getTime(),
});

app.writeNewMessagesToOutput(game.state.history);

function getHistory(index: number) {
	if (index < 0)
		return {
			type: historyTypeEnum.RESPONSE,
			text: "",
			data: {
				name: "",
			},
			time: new Date().getTime(),
		};

	return game.state.history[index] as IHistory;
}

function getResponse() {
	if (
		(game.state !== null &&
			typeof game.state === "object" &&
			game.state.hasOwnProperty("history") &&
			typeof game.state.history === "object" &&
			game.state.history.length > 0) === false
	)
		return "";

	const lastCommand = getHistory(game.state.history.length - 1);
	const lastMessage = getHistory(game.state.history.length - 2);

	if (lastMessage.text == "ahoj, jake je tve jmeno?") {
		game.state.userProfile.name = lastCommand.text;
		return `Krásné jméno, odteď si budu pamatovat, že se jmenuješ ${lastCommand.text}`;
	}

	if (lastCommand.data !== undefined) {
		if (lastCommand.data.name == possibleCommands.JMENO) {
			return `Řekl jsi mi, že se jmenuješ ${game.state.userProfile.name}`;
		}

		if (lastCommand.data.name == possibleCommands.AHOJ) {
			if (playerProfile.name === null) return `ahoj, jake je tve jmeno?`;
			else return "ahoj";
		}
		if (lastCommand.data.name == possibleCommands.RESET) {
			game.resetGame();
			return `Starting a new game`;
		}
		if (lastCommand.data.name == possibleCommands.SAVE) {
			game.saveGame();
			return `The game was saved`;
		}
	}

	return "";
}
