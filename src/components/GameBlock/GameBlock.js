import React, {useEffect, useState} from "react";
import classes from './GameBlock.module.css';

const GameBlock = ({x, y, element, isBombsShowed, onBombClick, onSetFlagClick, getCloseBombsAmount, blocksMap, openNearBlocks, amount, flagsAmount}) => {
	const isBomb = element.type === 'b';
	const [bombsAmount, setAmount] = useState(element.bombsAround);
	const [clicked, setClicked] = useState(element.isClicked);
	const [isFlagSet, setIsFlagSet] = useState(element.isFlagSet);
	const [isBoomed, setIsBoomed] = useState(false);
	
	useEffect(() => {
		const aroundBombsAmount = getCloseBombsAmount(x, y);
		element.bombsAround = aroundBombsAmount;
		setAmount(aroundBombsAmount);
	}, [element.type, getCloseBombsAmount]);
	
	useEffect(() => {
		setClicked(element.isClicked);
		
		if (isBombsShowed) {
			element.isClicked = true;
			setClicked(element.isClicked);
		}
	}, [blocksMap]);
	
	
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
		if (flagsAmount >= amount) return;
		if (isBombsShowed) return;
		if (clicked) return;
		
		element.isFlagSet = !isFlagSet;
		setIsFlagSet(!isFlagSet);
		onSetFlagClick(element.isFlagSet);
	};
	
	const bombIcon = isBomb ? <div className={classes.Bomb} /> : null;
	const flagIcon = <div className={classes.Flag} />;
	const amountParagraph = <span>{bombsAmount}</span>;
	const flagAndBombIcon = <span className={classes.FlagAndBombIcon}>&#10003;</span>;
	const mistakeIcon = <span className={classes.FalseFlag}>&#215;</span>;
	
	let backgroundColor = clicked ? '' : '#e1e1e5';
	backgroundColor = isBoomed ? 'red' : backgroundColor;
	
	return (
		<section className={classes.GameBlock} onClick={onBlockClick} onContextMenu={onContextBlockClick} style={{backgroundColor}}>
			{isBombsShowed && !isFlagSet && bombIcon}
			{isFlagSet && !isBombsShowed && flagIcon}
			{isBombsShowed && isFlagSet && isBomb && flagAndBombIcon}
			{isBombsShowed && isFlagSet && !isBomb && mistakeIcon}
			{clicked && !isBoomed && !isFlagSet && !isBomb && bombsAmount !== 0 && amountParagraph}
		</section>
	)
};

export default GameBlock;
