import React, { useState } from "react";
import classes from './GameSrceen.module.css';

//  components
import GameBlock from "../../components/GameBlock/GameBlock";

const GameScreen = ({ map, amount, setIsWin, setIsDefeat, width, height, bombsList }) => {
	const [blocksMap, setBlocksMap] = useState(map);
	const [flagsAmount, setFlagsAmount] = useState(0);
	const [isBombsShowed, setIsBombsShowed] = useState(false);

	const onBombClick = () => {
		if (isBombsShowed) return;
		setIsBombsShowed(true);
		setIsDefeat(true);
	};
	
	const onSetFlagClick = (isPlusOne) => {
		isPlusOne ? setFlagsAmount(flagsAmount + 1) : setFlagsAmount(flagsAmount - 1);
		
		if (flagsAmount < amount -1) return;
		
		const checked = bombsList.filter(el => el.isFlagSet);
		if (checked.length === amount) {
			setIsBombsShowed(true);
			setIsWin(true);
		}
	};
	
	const getNextBlock = (x, y, left = 0, right = 0, top = 0, bottom = 0) => {
		return blocksMap?.[x - top + bottom]?.[y - left + right]
	};
	
	const getCloseBombsAmount = (x, y) => {
		const leftElement = getNextBlock(x, y, 1, 0, 0, 0)?.type;
		const rightElement = getNextBlock(x, y, 0, 1, 0, 0)?.type;
		const topElement = getNextBlock(x, y, 0, 0, 1, 0)?.type;
		const bottomElement = getNextBlock(x, y, 0, 0, 0, 1)?.type;
		
		const lefTopElement = getNextBlock(x, y, 1, 0, 1, 0)?.type;
		const rightTopElement = getNextBlock(x, y, 0, 1, 1, 0)?.type;
		const lefBottomElement = getNextBlock(x, y, 1, 0, 0, 1)?.type;
		const rightBottomElement = getNextBlock(x, y, 0, 1, 0, 1)?.type;
		
		const elements = [leftElement, rightElement, topElement, bottomElement, lefTopElement, rightTopElement, lefBottomElement, rightBottomElement];
		return elements.reduce((acc, curr) => curr === 'b' ? acc + 1 : acc, 0);
	};
	
	const openNearBlocks = (x, y, map) => {
		const newMap = map ? [...map] : [...blocksMap];
		
		const currElement = getNextBlock(x, y, 0, 0, 0, 0);
		const leftElement = getNextBlock(x, y, 1, 0, 0, 0);
		const rightElement = getNextBlock(x, y, 0, 1, 0, 0);
		const topElement = getNextBlock(x, y, 0, 0, 1, 0);
		const bottomElement = getNextBlock(x, y, 0, 0, 0, 1);
		
		const lefTopElement = getNextBlock(x, y, 1, 0, 1, 0);
		const rightTopElement = getNextBlock(x, y, 0, 1, 1, 0);
		const lefBottomElement = getNextBlock(x, y, 1, 0, 0, 1);
		const rightBottomElement = getNextBlock(x, y, 0, 1, 0, 1);
		
		if (currElement.bombsAround > 0) {
			currElement.isClicked = true;
			return;
		}
		
		const elements = [leftElement, rightElement, topElement, bottomElement, lefTopElement, rightTopElement, lefBottomElement, rightBottomElement];
		
		elements.forEach(el => {
			if (el) {
				if (el.isClicked || el.isFlagSet) return;
				if (el.type === 'b') return;
			
				if (el.bombsAround > 0) {
					el.isClicked = true;
					return;
				}
				
				el.isClicked = true;
				openNearBlocks(el.x, el.y, newMap)
			}
		});
		
		setBlocksMap(newMap);
	};
	
	const blocks = blocksMap.map((row, rowIndex) => {
		return row.map((el, elIndex) =>
			<GameBlock
				x={rowIndex} y={elIndex} isBombsShowed={isBombsShowed} getCloseBombsAmount={getCloseBombsAmount}
				amount={amount} blocksMap={blocksMap} flagsAmount={flagsAmount} openNearBlocks={openNearBlocks}
				element={el} key={`${rowIndex}_${elIndex}`} onBombClick={onBombClick} onSetFlagClick={onSetFlagClick}
			/>)
	});
	
	return (
		<section>
			<p>flags : {flagsAmount}</p>
			<section className={classes.GameScreen} style={{width: `${width * 20}px`, height: `${height * 20}px`}}>
				{ blocks }
			</section>
		</section>
	)
};

export default GameScreen;
