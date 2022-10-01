export function createWebApp(
	stdin: HTMLInputElement,
	stdout: HTMLElement,
	watch: HTMLFormElement,
	handleInput: Function
) {
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
