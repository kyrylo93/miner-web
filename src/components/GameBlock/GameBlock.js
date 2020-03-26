import React from "react";
import classes from './GameBlock.module.css';

const GameBlock = ({x, y, type}) => {
	
	return (
		<section className={classes.GameBlock}>
			<span>{x}/{y}, {type}</span>
		</section>
	)
};

export default GameBlock;
