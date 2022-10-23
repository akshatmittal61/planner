import _ from "lodash";

export const max = (a, b) => (a > b ? a : b);
export const min = (a, b) => (a < b ? a : b);

export const sleep = (seconds) => {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const colors = [
	"bgcolor",
	"red",
	"pink",
	"purple",
	"dark-purple",
	"indigo",
	"blue",
	"light-blue",
	"cyan",
	"green",
	"light-green",
	"orange",
	"brown",
	"grey",
	"blue-grey",
];

export const imageBackgroundUrl = (index) =>
	`https://raw.githubusercontent.com/akshatmittal61/planner/master/src/images/notes-background/${
		index + 1
	}.webp`;

export const predictIcon = (text) => {
	switch (_.kebabCase(text)) {
		case "home":
			return "home";
		case "work":
			return "work";
		case "personal":
			return "person";
		case "shopping":
			return "shopping_cart";
		case "study":
			return "school";
		case "travel":
			return "flight";
		case "finance":
			return "attach_money";
		case "health":
			return "local_hospital";
		case "food":
			return "restaurant";
		case "write-ups":
			return "history_edu";
		case "draw":
			return "brush";
		case "music":
			return "music_note";
		case "movies":
			return "movie";
		case "shows":
			return "tv";
		case "web-series":
			return "subscriptions";
		case "games":
			return "sports_esports";
		case "sports":
			return "sports";
		case "books":
			return "menu_book";
		case "design":
			return "draw";
		case "programming":
			return "code";
		default:
			return "label";
	}
};

export const copy = (text) => {
	navigator.clipboard.writeText(text);
};

export const omit = (obj, key) => {
	const { [key]: omitted, ...rest } = obj;
	return rest;
};
