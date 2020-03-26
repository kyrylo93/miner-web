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
	
	const [isBombsShowed, setIsBombsShowed] = useState(true);
	
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
	
	const onBombClick = () => {
		console.log('onBombClick')
		setIsBombsShowed(true);
	};
	
	const blocks = blocksMap.map((row, rowIndex) => {
		return row.map((el, elIndex) =>
			<GameBlock
				x={rowIndex} y={elIndex} isBombsShowed={isBombsShowed}
				type={el} key={`${rowIndex}_${elIndex}`} onBombClick={onBombClick}
			/>)
	});
	
	return (
		<section className={classes.GameScreen}>
			{ blocks }
		</section>
	)
};

export default GameScreen;
