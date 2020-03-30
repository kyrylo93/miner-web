import React, {useEffect, useState} from "react";
import classes from './GameSrceen.module.css';

//components
import GameBlock from "../../components/GameBlock/GameBlock";

//functions
import { getRandomNumberInRange } from "../../utils/utils";

const GameScreen = () => {
	const BLOCKS_LINE_AMOUNT = 10;
	const [blocksMap, setBlocksMap] = useState([
		[{type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}],
		[{type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}],
		[{type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}],
		[{type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}],
		[{type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}],
		[{type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}],
		[{type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}],
		[{type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}],
		[{type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}],
		[{type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}, {type: "-", bombsAround: 0, isClicked: false, isFlagSet: false}],
	]);
	
	const [isBombsShowed, setIsBombsShowed] = useState(false);
	
	useEffect(() => {
		console.log(blocksMap)
		// add bombs to map
		const newMap = [...blocksMap];
		for (let i = 0; i < BLOCKS_LINE_AMOUNT; i++) {
			const x = getRandomNumberInRange(BLOCKS_LINE_AMOUNT);
			const y = getRandomNumberInRange(BLOCKS_LINE_AMOUNT);
			
			if (newMap[x][y].type === '-') {
				newMap[x][y].type = 'b'
			} else {
				i--
			}
		}
		
		setBlocksMap(newMap);
	}, []);
	
	const onBombClick = event => {
		if (isBombsShowed) return;
		
		console.log('onBombClick');
		setIsBombsShowed(true);
	};
	
	const onSetFlagClick = (event, x, y) => {
		console.log('onContextClick');
		console.log(x, y)
	};
	
	const getCloseBombsAmount = (x, y) => {
		const leftElement = blocksMap?.[x]?.[y - 1]?.type;
		const rightElement = blocksMap?.[x]?.[y + 1]?.type;
		const topElement = blocksMap?.[x - 1]?.[y]?.type;
		const bottomElement = blocksMap?.[x + 1]?.[y]?.type;
		
		const lefTopElement = blocksMap?.[x - 1]?.[y - 1]?.type;
		const rightTopElement = blocksMap?.[x - 1]?.[y + 1]?.type;
		
		const lefBottomElement = blocksMap?.[x + 1]?.[y - 1]?.type;
		const rightBottomElement = blocksMap?.[x + 1]?.[y + 1]?.type;
		
		const elements = [leftElement, rightElement, topElement, bottomElement, lefTopElement, rightTopElement, lefBottomElement, rightBottomElement];
		
		const amount =  elements.reduce((acc, curr) => curr === 'b' ? acc + 1 : acc, 0);
		blocksMap[x][y].amount = amount;
		return amount;
	};
	
	const openNearBlocks = (x, y) => {
		const newMap = [...blocksMap];
		
		//to left
		// for (let i = y; i >= 0; i--) {
		// 	console.log(newMap[x][i]);
		// 	if (newMap[x][i].type === 'b') {
		// 		console.log('is a bomb');
		// 		return false;
		// 	}
		// 	if (newMap[x][i].amount > 0 ) {
		// 		console.log('it has amount');
		// 		newMap[x][i].isClicked = true;
		// 		return false;
		// 	}
		// 	console.log('it has nothing');
		// 	newMap[x][i].isClicked = true;
		// 	setBlocksMap(newMap);
		// }
		
		//to right
		// for (let i = y; i <= BLOCKS_LINE_AMOUNT -1; i++) {
		// 	console.log(newMap[x][i]);
		// 	if (newMap[x][i].type === 'b') {
		// 		console.log('is a bomb');
		// 		return false;
		// 	}
		// 	if (newMap[x][i].amount > 0 ) {
		// 		console.log('it has amount');
		// 		newMap[x][i].isClicked = true;
		// 		return false;
		// 	}
		// 	console.log('it has nothing');
		// 	newMap[x][i].isClicked = true;
		// 	setBlocksMap(newMap);
		// }
		
		// to top
		// for (let i = x; i >= 0; i--) {
		// 	console.log(newMap[x][i]);
		// 	if (newMap[i][y].type === 'b') {
		// 		console.log('is a bomb');
		// 		return false;
		// 	}
		// 	if (newMap[i][y].amount > 0 ) {
		// 		console.log('it has amount');
		// 		newMap[i][y].isClicked = true;
		// 		return false;
		// 	}
		// 	console.log('it has nothing');
		// 	newMap[i][y].isClicked = true;
		// 	setBlocksMap(newMap);
		// }
		
		// to bottom
		for (let i = x; i <= BLOCKS_LINE_AMOUNT -1; i++) {
			console.log(newMap[x][i]);
			if (newMap[i][y].type === 'b') {
				console.log('is a bomb');
				return false;
			}
			if (newMap[i][y].amount > 0 ) {
				console.log('it has amount');
				newMap[i][y].isClicked = true;
				return false;
			}
			console.log('it has nothing');
			newMap[i][y].isClicked = true;
			setBlocksMap(newMap);
		}
	};
	
	const blocks = blocksMap.map((row, rowIndex) => {
		return row.map((el, elIndex) =>
			<GameBlock
				x={rowIndex} y={elIndex} isBombsShowed={isBombsShowed} getCloseBombsAmount={getCloseBombsAmount} blocksMap={blocksMap}
				element={el} key={`${rowIndex}_${elIndex}`} onBombClick={onBombClick} onSetFlagClick={onSetFlagClick} openNearBlocks={openNearBlocks}
			/>)
	});
	
	return (
		<section className={classes.GameScreen}>
			{ blocks }
		</section>
	)
};

export default GameScreen;
