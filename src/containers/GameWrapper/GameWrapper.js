import React from "react";
import GameScreen from "../GameScreen/GameScreen";
import { getMap } from "../../utils/utils";

const GameWrapper = () => {
	const map = getMap(10);
	return <GameScreen map={map} />
};

export default GameWrapper;
