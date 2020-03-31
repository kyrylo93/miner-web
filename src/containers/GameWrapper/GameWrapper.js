import React from "react";
import GameScreen from "../GameScreen/GameScreen";
import { getMap } from "../../utils/getMap";

const GameWrapper = () => {
	const map = getMap(10);
	return <GameScreen map={map} amount={10} />
};

export default GameWrapper;
