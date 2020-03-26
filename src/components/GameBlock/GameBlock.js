import React, {useEffect, useState} from "react";
import classes from './GameBlock.module.css';

const GameBlock = ({x, y, type, isBombsShowed, onBombClick, onSetFlagClick, getCloseBombsAmount}) => {
	const isBomb = type === 'b';
	const icon = isBomb ? <div className={classes.Bomb} /> : null;
	const [amount, setAmount] = useState(0);
	
	useEffect(() => {
		setAmount(getCloseBombsAmount(x, y));
	}, [type, getCloseBombsAmount]);
	
	const onBlockClick = (event) => {
		
		if (isBomb) {
			onBombClick(event);
		}
	};
	
	return (
		<section className={classes.GameBlock} onClick={onBlockClick} onContextMenu={onSetFlagClick}>
			{isBombsShowed && icon}
			<span>{amount}</span>
		</section>
	)
};

export default GameBlock;
