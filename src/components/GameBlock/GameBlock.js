import React, {useEffect, useState} from "react";
import classes from './GameBlock.module.css';

const GameBlock = ({x, y, element, isBombsShowed, onBombClick, onSetFlagClick, getCloseBombsAmount, blocksMap, openNearBlocks}) => {
	const isBomb = element.type === 'b';
	const [amount, setAmount] = useState(element.amount);
	const [clicked, setClicked] = useState(element.isClicked);
	const [isFlagSet, setIsFlagSet] = useState(element.isFlagSet);
	const [isBoomed, setIsBoomed] = useState(false);
	
	useEffect(() => {
		const aroundBombsAmount = getCloseBombsAmount(x, y);
		element.bombsAround = aroundBombsAmount;
		setAmount(aroundBombsAmount);
	}, [element.type, getCloseBombsAmount]);
	
	useEffect(() => {
		setClicked(element.isClicked)
	}, [ blocksMap ]);
	
	
	const onBlockClick = event => {
		if (isBombsShowed) return;
		if (isFlagSet) return;
		
		setClicked(true);
		element.isClicked = true;
		
		if (isBomb) {
			setIsBoomed(true);
			onBombClick(event);
		}
		
		openNearBlocks(x, y)
	};
	
	const onContextBlockClick = event => {
		event.preventDefault();
		if (isBombsShowed) return;
		if (clicked) return;
		
		element.isFlagSet = !isFlagSet;
		setIsFlagSet(!isFlagSet);
		onSetFlagClick(event, x, y);
	};
	
	const bombIcon = isBomb ? <div className={classes.Bomb} /> : null;
	const flagIcon = isFlagSet ? <div className={classes.Flag} /> : null;
	const amountParagraph = <span>{amount}</span>;
	
	let backgroundColor = clicked ? '' : '#dbdbdf';
	backgroundColor = isBoomed ? 'red' : backgroundColor;
	
	return (
		<section className={classes.GameBlock} onClick={onBlockClick} onContextMenu={onContextBlockClick} style={{backgroundColor}}>
			{isBombsShowed && bombIcon}
			{isFlagSet && flagIcon}
			{clicked && !isBoomed && amount !== 0 && amountParagraph}
		</section>
	)
};

export default GameBlock;
