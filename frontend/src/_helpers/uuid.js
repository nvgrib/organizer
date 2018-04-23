const generateUuid = () => {
	let counter = 0;
	return () => 'id' + counter++;
};

export const uuid = generateUuid();