import React from "react";
import classes from './GameBlock.module.css';

const GameBlock = ({x, y, type}) => {
	
	const icon = type === 'b' ? <div className={classes.Bomb} /> : null;
	
	return (
		<section className={classes.GameBlock}>
			{icon}
		</section>
	)
};

export default GameBlock;
