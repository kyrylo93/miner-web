export const getMap = (width, height) => {
	console.log(width, height)
	const map = [];
	for (let i = 0; i < height; i++) {
		
		const row = [];
		
		for (let j = 0; j < width; j++) {
			row.push({ type: "-",x: i, y: j, bombsAround: 0, isClicked: false, isFlagSet: false })
		}
		map.push(row);
	}
	
	return map
};
