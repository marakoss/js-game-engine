import { QuestTypesEnum, QuestStateTypeEnum } from "constants/quests";

export const quests = new Map([
	[
		QuestTypesEnum.INTRODUCTION,
		{
			state: [QuestStateTypeEnum.UNSOLVED],
			name: "Predstav se",
		},
	],
]);
