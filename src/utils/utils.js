export const getRandomNumberInRange = range => Math.floor(Math.random() * range);

export const getMap = amount => {
	const map = [];
	for (let i = 0; i < amount; i++) {
		
		const row = [];
		
		for (let j = 0; j < amount; j++) {
			row.push({ type: "-",x: i, y: j, bombsAround: 0, isClicked: false, isFlagSet: false })
		}
		map.push(row);
	}
	
	return map
};
