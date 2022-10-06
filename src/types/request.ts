import { CommandEnum } from "constants/commands";
import { Argument } from "./history";

export type IRequest = {
	command: CommandEnum;
	arguments: Argument[];
	originalInput: string;
	transformedInput: string;
};
