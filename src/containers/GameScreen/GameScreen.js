import React from "react";
import classes from './GameSrceen.module.css';

import GameBlock from "../../components/GameBlock/GameBlock";

const GameScreen = () => {
	const BLOCKS_LINE_AMOUNT = 10;
	const blocks = [];
	
	for (let x = 0; x < BLOCKS_LINE_AMOUNT; x++) {
		for (let y = 0; y < BLOCKS_LINE_AMOUNT; y++) {
			blocks.push(<GameBlock key={`${x}_${y}`} x={x} y={y} />)
		}
	}
	
	
	return (
		<section className={classes.GameScreen}>
			{blocks}
		</section>
	)
};

export default GameScreen;
