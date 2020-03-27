import React, {useEffect, useState} from "react";
import classes from './GameSrceen.module.css';

//components
import GameBlock from "../../components/GameBlock/GameBlock";

//functions
import { getRandomNumberInRange } from "../../utils/utils";

const GameScreen = () => {
	const BLOCKS_LINE_AMOUNT = 10;
	const [blocksMap, setBlocksMap] = useState([
		["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
	]);
	
	const [isBombsShowed, setIsBombsShowed] = useState(false);
	
	useEffect(() => {
		// add bombs to map
		const newMap = [...blocksMap];
		for (let i = 0; i < BLOCKS_LINE_AMOUNT; i++) {
			const x = getRandomNumberInRange(BLOCKS_LINE_AMOUNT);
			const y = getRandomNumberInRange(BLOCKS_LINE_AMOUNT);
			
			if (newMap[x][y] === '-') {
				newMap[x][y] = 'b'
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
		event.target.style.backgroundColor = 'red';
	};
	
	const onSetFlagClick = event => {
		console.log('onContextClick')
	};
	
	const getCloseBombsAmount = (x, y) => {
		const leftElement = blocksMap?.[x]?.[y - 1];
		const rightElement = blocksMap?.[x]?.[y + 1];
		
		const topElement = blocksMap?.[x - 1]?.[y];
		const bottomElement = blocksMap?.[x + 1]?.[y];
		
		const lefTopElement = blocksMap?.[x - 1]?.[y - 1];
		const rightTopElement = blocksMap?.[x - 1]?.[y + 1];
		
		const lefBottomElement = blocksMap?.[x + 1]?.[y - 1];
		const rightBottomElement = blocksMap?.[x + 1]?.[y + 1];
		
		const elements = [leftElement, rightElement, topElement, bottomElement, lefTopElement, rightTopElement, lefBottomElement, rightBottomElement];
		return elements.reduce((acc, curr) => curr === 'b' ? acc + 1 : acc, 0);
	};
	
	const blocks = blocksMap.map((row, rowIndex) => {
		return row.map((el, elIndex) =>
			<GameBlock
				x={rowIndex} y={elIndex} isBombsShowed={isBombsShowed} getCloseBombsAmount={getCloseBombsAmount}
				type={el} key={`${rowIndex}_${elIndex}`} onBombClick={onBombClick} onSetFlagClick={onSetFlagClick}
			/>)
	});
	
	return (
		<section className={classes.GameScreen}>
			{ blocks }
		</section>
	)
};

export default GameScreen;
