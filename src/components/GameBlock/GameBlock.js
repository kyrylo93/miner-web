import React from "react";
import classes from './GameBlock.module.css';

const GameBlock = ({x, y, type, isBombsShowed, onBombClick}) => {
	const isBomb = type === 'b';
	const icon = isBomb ? <div className={classes.Bomb} /> : null;
	
	const onBlockClick = () => {
		
		if (isBomb) {
			onBombClick();
		}
	};
	
	const onContextClick = event => {
		event.preventDefault();
		console.log('onContextClick')
	};
	
	return (
		<section className={classes.GameBlock} onClick={onBlockClick} onContextMenu={onContextClick}>
			{isBombsShowed && icon}
		</section>
	)
};

export default GameBlock;
