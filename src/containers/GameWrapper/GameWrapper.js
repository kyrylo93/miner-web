import React, {useEffect, useState} from "react";
import GameScreen from "../GameScreen/GameScreen";
import { getMap } from "../../utils/getMap";
import {getMapWithBombs} from "../../utils/getMapWithBombs";

const GameWrapper = ({difficult}) => {
	const [isWin, setIsWin] = useState(false);
	const [isDefeat, setIsDefeat] = useState(false);
	const [map, setMap] = useState([]);
	const [bombsList, setBombsList] = useState([]);

	const { width, height, bombs } = difficult;

	useEffect(() => {
		const createdMap = getMap(width, height);
		const [bombsList, newMap] = getMapWithBombs(createdMap, bombs, height, width);

		setMap(newMap);
		setBombsList(bombsList);
	}, [ difficult ]);

	return (
		<section style={{marginTop: '2%'}}>
			<section><span>Bombs: {bombs}</span></section>
			<GameScreen map={map} amount={bombs}
						width={width} height={height}
						setIsWin={setIsWin} setIsDefeat={setIsDefeat}
						bombsList={bombsList} />
			{ isWin && <h2>You are win!</h2>}
			{ isDefeat && <h2>You are looseeeeeerrrr HAHAHAHAHHAHAH H@!PLLSD!</h2>}
		</section>
		)
};

export default GameWrapper;
