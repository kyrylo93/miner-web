import React, {useEffect, useState} from "react";
import classes from './GameBlock.module.css';

const GameBlock = ({x, y, type, isBombsShowed, onBombClick, onSetFlagClick, getCloseBombsAmount}) => {
	const isBomb = type === 'b';
	const [amount, setAmount] = useState(0);
	const [clicked, setClicked] = useState(false);
	const [isFlagSet, setIsFlagSet] = useState(false);
	const [isBoomed, setIsBoomed] = useState(false);
	
	useEffect(() => {
		setAmount(getCloseBombsAmount(x, y));
	}, [type, getCloseBombsAmount]);
	
	const onBlockClick = event => {
		if (isBombsShowed) return;
		if (isFlagSet) return;
		
		setClicked(true);
		event.target.style.backgroundColor = '#bfbfbf';
		
		if (isBomb) {
			setIsBoomed(true);
			onBombClick(event);
		}
	};
	
	const onContextBlockClick = event => {
		setIsFlagSet(!isFlagSet);
		onSetFlagClick(event);
	};
	
	const bombIcon = isBomb ? <div className={classes.Bomb} /> : null;
	const flagIcon = isFlagSet ? <div className={classes.Flag} /> : null;
	const amountParagraph = <span>{amount}</span>;
	
	return (
		<section className={classes.GameBlock} onClick={onBlockClick} onContextMenu={onContextBlockClick}>
			{isBombsShowed && bombIcon}
			{isFlagSet && flagIcon}
			{clicked && !isBoomed && amount !== 0 && amountParagraph}
		</section>
	)
};

export default GameBlock;
