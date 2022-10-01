export enum possibleCommands {
	NOOP = "",
	AHOJ = "ahoj",
	SOUTH = "south",
	NORTH = "north",
	WEST = "west",
	EAST = "east",
	JMENO = "jmeno",
}

export const commandAliases = {
	NOOP: [""],
	AHOJ: ["cau", "hi", "zdar", "cauko"],
	NORTH: ["n", "sever"],
	SOUTH: ["s", "jih"],
	EAST: ["e", "vychod"],
	JMENO: ["jmeno", "me jmeno", "jake je me jmeno"],
};
