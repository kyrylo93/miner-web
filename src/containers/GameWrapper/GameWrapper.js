import React, {useEffect, useState} from "react";
import GameScreen from "../GameScreen/GameScreen";
import { getMap } from "../../utils/getMap";

const GameWrapper = ({difficult}) => {
	const [currentLevel, setCurrentLevel] = useState(difficult);
	
	useEffect(() => {
		setCurrentLevel(difficult)
	}, [difficult]);
	
	const map = getMap(currentLevel.width, currentLevel.height);
	const [isWin, setIsWin] = useState(false);
	const [isDefeat, setIsDefeat] = useState(false);
	return (
		<section style={{marginTop: '2%'}}>
			<section><span>Bombs: {currentLevel.bombs}</span></section>
			<GameScreen map={map} amount={currentLevel.bombs} width={currentLevel.width} height={currentLevel.height} setIsWin={setIsWin} setIsDefeat={setIsDefeat} />
			{ isWin && <h2>You are win!</h2>}
			{ isDefeat && <h2>You are looseeeeeerrrr HAHAHAHAHHAHAH H@!PLLSD!</h2>}
		</section>
		)
};

export default GameWrapper;
