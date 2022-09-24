export const omit = (obj, key) => {
	let object = obj;
	if (obj._doc) object = obj.toJSON();
	const { [key]: omitted, ...rest } = object;
	return rest;
};
