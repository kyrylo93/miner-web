import React, {useEffect, useState} from "react";
import { getMap } from "../../utils/getMap";
import GameScreen from "../GameScreen/GameScreen";
import {getMapWithBombs} from "../../utils/getMapWithBombs";

const GameWrapper = ({difficult, setIsTimerContinue}) => {
	const [map, setMap] = useState([]);
	const [isWin, setIsWin] = useState(false);
	const [bombsList, setBombsList] = useState([]);
	const [isDefeat, setIsDefeat] = useState(false);

	const { width, height, bombs } = difficult;

	useEffect(() => {
		const createdMap = getMap(width, height);
		const [bombsList, newMap] = getMapWithBombs(createdMap, bombs, height, width);

		setIsWin(false)
		setIsDefeat(false)
		setMap(newMap);
		setBombsList(bombsList);
	}, [ difficult ]);

	return (
		<section style={{marginTop: '2%'}}>
			<section><span>Bombs: {bombs}</span></section>
			<GameScreen map={map} amount={bombs}
						width={width} height={height}
						setIsWin={setIsWin} setIsDefeat={setIsDefeat}
						bombsList={bombsList} setIsTimerContinue={setIsTimerContinue} />
			{ isWin && <h2>You are win!</h2>}
			{ isDefeat && <h2>You are looseeeeeerrrr HAHAHAHAHHAHAH H@!PLLSD!</h2>}
		</section>
		)
};

export default GameWrapper;
