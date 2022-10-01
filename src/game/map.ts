import { items } from "./items";

export const gameMap = {
	hotel_lobby: {
		name: "Vstupni hala",
		description: "Prave se nachazite v hale temné hotelu",
		items: [items.shovel],
		entities: ["Lucie"],
		connects: [
			{ link: "stairs", type: "hidden", direction: "north" },
			{ link: "mistnost2", type: "hidden", direction: "down" },
		],
		state: ["normal"],
		actions: ["ahoj", "dig", "talk"],
		quests: [
			{
				id: "jmeno",
				name: "Predstav se",
				state: ["unsolved"],
			},
		],
	},
};
