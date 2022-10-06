import { QuestStateEnum } from "constants/quests";

export type IQuest = {
	state: QuestStateEnum[];
	name: string;
};
