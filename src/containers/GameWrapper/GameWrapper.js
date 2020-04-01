import React from "react";
import GameScreen from "../GameScreen/GameScreen";
import { getMap } from "../../utils/getMap";

const GameWrapper = () => {
	const bombsAmount = 10;
	const map = getMap(bombsAmount);
	return (
		<section style={{marginTop: '2%'}}>
			<section><span>Bombs: {bombsAmount}</span></section>
			<GameScreen map={map} amount={bombsAmount} />
		</section>
		)
};

export default GameWrapper;
