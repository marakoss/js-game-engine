import { QuestEnum, QuestStateEnum } from "constants/quests";

export const quests = new Map([
	[
		QuestEnum.INTRODUCTION,
		{
			state: [QuestStateEnum.UNSOLVED],
			name: "Predstav se",
		},
	],
]);
