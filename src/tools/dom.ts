import { IHistory } from "types/history";
import { IGame } from "types/game";
import { IGameState } from "types/gamestate";

export function createWebApp(
	stdin: HTMLInputElement,
	stdout: HTMLElement,
	watch: HTMLFormElement
) {
	var messageCounter = 0;

	return {
		initialize: function (game: IGame) {
			this.writeNewMessagesToOutput(game.state.history);
		},
		registerHandler: function (handler: (input: string) => IGameState) {
			watch.addEventListener("submit", (e: any) => {
				e.preventDefault();
				const text = this.readInput();
				const newGameState = handler(text);
				this.writeNewMessagesToOutput(newGameState.history);
				this.clearInput();
				this.scrollBottom();
			});
		},
		readInput: function () {
			return stdin.value;
		},
		clearInput: function () {
			stdin.value = "";
		},
		writeNewMessagesToOutput: function (history: IHistory[]) {
			while (messageCounter < history.length) {
				const hist = history[messageCounter];

				if (hist === undefined) break;

				const div = document.createElement("div");
				div.className = hist.type;
				div.innerHTML = hist.text;

				this.writeOutput(div);

				messageCounter++;
			}
		},
		writeOutput: function (element: HTMLElement) {
			stdout.appendChild(element);
		},
		scrollBottom: function () {
			stdout.scroll({
				top: stdout.scrollHeight,
				behavior: "smooth",
			});
		},
	};
}
