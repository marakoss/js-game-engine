import { CommandEnum } from "constants/commands";
import { responders } from "tools/responders";
import locationHandler from "./location";
import lookHandler from "./look";
import takeHandler from "./take";

responders.registerHandlers([
	{ command: CommandEnum.TAKE, handler: takeHandler },
	{ command: CommandEnum.NORTH, handler: locationHandler },
	{ command: CommandEnum.SOUTH, handler: locationHandler },
	{ command: CommandEnum.EAST, handler: locationHandler },
	{ command: CommandEnum.WEST, handler: locationHandler },
	{ command: CommandEnum.LOOK, handler: lookHandler },
]);

export default responders;
