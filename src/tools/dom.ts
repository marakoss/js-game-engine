import { IHistory } from "types/history";

export function createWebApp(
	stdin: HTMLInputElement,
	stdout: HTMLElement,
	watch: HTMLFormElement,
	handleInput: Function
) {
	var messageCounter = 0;
	watch.addEventListener("submit", (e: any) => {
		e.preventDefault();
		handleInput();
	});

	return {
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
