import React, {useState} from "react";
import GameScreen from "../GameScreen/GameScreen";
import { getMap } from "../../utils/getMap";

const GameWrapper = () => {
	const bombsAmount = 10;
	const map = getMap(bombsAmount);
	const [isWin, setIsWin] = useState(false);
	const [isDefeat, setIsDefeat] = useState(false);
	return (
		<section style={{marginTop: '2%'}}>
			<section><span>Bombs: {bombsAmount}</span></section>
			{ isWin && <h2>You are win!</h2>}
			{ isDefeat && <h2>You are looseeeeeerrrr HAHAHAHAHHAHAH H@!PLLSD!</h2>}
			<GameScreen map={map} amount={bombsAmount} setIsWin={setIsWin} setIsDefeat={setIsDefeat} />
		</section>
		)
};

export default GameWrapper;
