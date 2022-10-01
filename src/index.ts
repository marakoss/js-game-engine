import { createWebApp } from "tools/dom";
import { createGame } from "tools/game";

const game = createGame();
const app = createWebApp(
	//@ts-expect-error wocument will contain those elements
	document.getElementById("command"),
	document.getElementById("console"),
	document.getElementById("form")
);

app.registerHandler(game.handleInput);
app.initialize(game);
