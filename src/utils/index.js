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
	`https://raw.githubusercontent.com/snehasharma1111/planner/master/src/images/notes-background/${
		index + 1
	}.webp`;

export const copy = (text) => {
	navigator.clipboard.writeText(text);
};
