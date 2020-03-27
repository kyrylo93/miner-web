import React, {useEffect, useState} from "react";
import classes from './GameBlock.module.css';

const GameBlock = ({x, y, type, isBombsShowed, onBombClick, onSetFlagClick, getCloseBombsAmount}) => {
	const isBomb = type === 'b';
	const icon = isBomb ? <div className={classes.Bomb} /> : null;
	const [amount, setAmount] = useState(0);
	const [clicked, setClicked] = useState(false);
	const [isBoomed, setIsBoomed] = useState(false);
	
	useEffect(() => {
		setAmount(getCloseBombsAmount(x, y));
	}, [type, getCloseBombsAmount]);
	
	const onBlockClick = (event) => {
		if (isBombsShowed) return;
		
		setClicked(true);
		event.target.style.backgroundColor = '#bfbfbf';
		
		if (isBomb) {
			setIsBoomed(true);
			onBombClick(event);
		}
	};
	
	const amountParagraph = <span>{amount}</span>;
	
	return (
		<section className={classes.GameBlock} onClick={onBlockClick} onContextMenu={onSetFlagClick}>
			{isBombsShowed && icon}
			{clicked && !isBoomed && amount !== 0 && amountParagraph}
		</section>
	)
};

export default GameBlock;
