import {
	LocationsEnum,
	LocationTypesEnum,
	LocationDirectionsTypesEnum,
} from "constants/locations";
import { items } from "./items";

export const gameMap = {
	HOTEL_LOBBY: {
		name: "Vstupni hala",
		description: "Prave se nachazite v hale temné hotelu",
		items: [items.shovel],
		entities: ["Lucie"],
		connects: [
			{
				link: LocationsEnum.HOTEL_STAIRCASE,
				type: LocationTypesEnum.PUBLIC,
				direction: [
					LocationDirectionsTypesEnum.NORTH,
					LocationDirectionsTypesEnum.UP,
				],
			},
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
	HOTEL_STAIRCASE: {
		name: "Schody hotelu",
		description: "Prave se nachazite na starých vrzavých schodech hotelu",
		items: [items.shovel],
		entities: ["Lucie"],
		connects: [
			{
				link: LocationsEnum.HOTEL_LOBBY,
				type: LocationTypesEnum.PUBLIC,
				direction: [
					LocationDirectionsTypesEnum.SOUTH,
					LocationDirectionsTypesEnum.DOWN,
				],
			},
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
	HOTEL_ROOM: {
		name: "Pokoj hotelu",
		description: "Jste v pokoji a haraší Vám ve věži",
		items: [items.shovel],
		entities: ["Lucie"],
		connects: [],
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
