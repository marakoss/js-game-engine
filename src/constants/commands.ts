export enum possibleCommands {
	NOOP = "",
	AHOJ = "ahoj",
	SOUTH = "south",
	NORTH = "north",
	WEST = "west",
	EAST = "east",
	JMENO = "jmeno",
	RESET = "reset",
	SAVE = "save",
	LOOK = "look",
}

export const commandAliases = {
	NOOP: [""],
	AHOJ: ["cau", "hi", "zdar", "cauko"],
	NORTH: ["n", "sever"],
	SOUTH: ["s", "jih"],
	EAST: ["e", "vychod"],
	JMENO: ["jmeno", "me jmeno", "jake je me jmeno"],
	RESET: ["reset"],
	SAVE: ["save"],
	LOOK: ["look", "podívej se", "kde jsem", "co to je"],
};
