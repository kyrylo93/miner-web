import React from "react";
import classes from './GameSrceen.module.css';

//components
import GameBlock from "../../components/GameBlock/GameBlock";

//functions
import { getRandomNumberInRange } from "../../utils/utils";

const GameScreen = () => {
	const BLOCKS_LINE_AMOUNT = 10;
	const blocksMap = [];
	
	// create game map
	for (let x = 0; x < BLOCKS_LINE_AMOUNT; x++) {
		const row = [];
		for (let y = 0; y < BLOCKS_LINE_AMOUNT; y++) {
			row.push('-')
		}
		blocksMap.push(row);
	}
	// add bombs to map
	for (let i = 0; i < BLOCKS_LINE_AMOUNT; i++) {
		const x = getRandomNumberInRange(BLOCKS_LINE_AMOUNT);
		const y = getRandomNumberInRange(BLOCKS_LINE_AMOUNT);
		
		if (blocksMap[x][y] === '-') {
			blocksMap[x][y] = 'b'
		} else {
			i--
		}
	}
	
	const blocks = blocksMap.map((row, rowIndex) => {
		return row.map((el, elIndex) => <GameBlock x={rowIndex} y={elIndex} type={el} key={`${rowIndex}_${elIndex}`} />)
	});
	
	return (
		<section className={classes.GameScreen}>
			{ blocks }
		</section>
	)
};

export default GameScreen;
