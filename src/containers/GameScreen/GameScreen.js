import React, {useEffect, useState} from "react";
import classes from './GameSrceen.module.css';
import GameBlock from "../../components/GameBlock/GameBlock";

const GameScreen = ({ map, amount, setIsWin, setIsDefeat, width, height, bombsList, setIsTimerContinue }) => {
	const [blocksMap, setBlocksMap] = useState(map);
	const [flagsAmount, setFlagsAmount] = useState(0);
	const [isBombsShowed, setIsBombsShowed] = useState(false);

	useEffect(() => {
		setFlagsAmount(0);
		setIsBombsShowed(false);
		setBlocksMap(map);
	}, [map]);

	const onBombClick = () => {
		if (isBombsShowed) return;
		setIsTimerContinue(false);
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

		const leftBlock = getNextBlock(x, y, 1, 0, 0, 0);
		const rightBlock = getNextBlock(x, y, 0, 1, 0, 0);
		const topBlock = getNextBlock(x, y, 0, 0, 1, 0);
		const bottomBlock = getNextBlock(x, y, 0, 0, 0, 1);

		const lefTopBlock = getNextBlock(x, y, 1, 0, 1, 0);
		const rightTopBlock = getNextBlock(x, y, 0, 1, 1, 0);
		const lefBottomBlock = getNextBlock(x, y, 1, 0, 0, 1);
		const rightBottomBlock = getNextBlock(x, y, 0, 1, 0, 1);

		const currElement = getNextBlock(x, y, 0, 0, 0, 0);

		if (currElement.bombsAround > 0) {
			currElement.isClicked = true;
			return;
		}

		const blocks = [leftBlock, rightBlock, topBlock, bottomBlock, lefTopBlock, rightTopBlock, lefBottomBlock, rightBottomBlock];

		blocks.forEach(block => {
			if (block) {
				if (block.isClicked || block.isFlagSet) return;
				if (block.type === 'b') return;

				if (block.bombsAround > 0) {
					block.isClicked = true;
					return;
				}

				block.isClicked = true;
				openNearBlocks(block.x, block.y, newMap)
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
