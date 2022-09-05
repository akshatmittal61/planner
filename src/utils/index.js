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

export const copy = (text) => {
	navigator.clipboard.writeText(text);
};

export const omit = (obj, key) => {
	const { [key]: omitted, ...rest } = obj;
	return rest;
};
