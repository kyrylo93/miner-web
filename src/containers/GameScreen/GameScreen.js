import React, {useEffect, useState} from "react";
import classes from './GameSrceen.module.css';

//  components
import GameBlock from "../../components/GameBlock/GameBlock";

//  functions
import { getRandomNumberInRange } from "../../utils/getRandomNumberInRange";

const GameScreen = ({ map, amount, setIsWin, setIsDefeat }) => {
	const [blocksMap, setBlocksMap] = useState(map);
	const [bombsStates, setBombsStates] = useState([]);
	const [isBombsShowed, setIsBombsShowed] = useState(false);
	
	useEffect(() => {
		// add bombs to map
		const newMap = [...blocksMap];
		const bombsList = [];
		
		for (let i = 0; i < amount; i++) {
			const x = getRandomNumberInRange(amount);
			const y = getRandomNumberInRange(amount);
			
			if (newMap[x][y].type === '-') {
				newMap[x][y].type = 'b';
				bombsList.push(newMap[x][y]);
			} else {
				i--
			}
		}
		
		setBombsStates(bombsList);
		setBlocksMap(newMap);
	}, []);
	
	const onBombClick = event => {
		if (isBombsShowed) return;
		setIsBombsShowed(true);
		setIsDefeat(true);
	};
	
	const onSetFlagClick = () => {
		// if flags less then amount return false
		const checked = bombsStates.filter(el => el.isFlagSet);
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
		
		const leftElement = getNextBlock(x, y, 1, 0, 0, 0);
		const rightElement = getNextBlock(x, y, 0, 1, 0, 0);
		const topElement = getNextBlock(x, y, 0, 0, 1, 0);
		const bottomElement = getNextBlock(x, y, 0, 0, 0, 1);
		
		const lefTopElement = getNextBlock(x, y, 1, 0, 1, 0);
		const rightTopElement = getNextBlock(x, y, 0, 1, 1, 0);
		const lefBottomElement = getNextBlock(x, y, 1, 0, 0, 1);
		const rightBottomElement = getNextBlock(x, y, 0, 1, 0, 1);
		
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
				x={rowIndex} y={elIndex} isBombsShowed={isBombsShowed} getCloseBombsAmount={getCloseBombsAmount} blocksMap={blocksMap}
				element={el} key={`${rowIndex}_${elIndex}`} onBombClick={onBombClick} onSetFlagClick={onSetFlagClick} openNearBlocks={openNearBlocks}
			/>)
	});
	
	return (
		<section className={classes.GameScreen}>
			{ blocks }
		</section>
	)
};

export default GameScreen;
