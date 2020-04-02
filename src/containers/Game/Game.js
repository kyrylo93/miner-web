import React, {useState} from "react";
import GameWrapper from "../GameWrapper/GameWrapper";

const Game = () => {
	const LEVELS = {
		beginner: {
			bombs: 10,
			width: 9,
			height: 9
		},
		middle: {
			bombs: 40,
			width: 16,
			height: 16
		},
		hard: {
			bombs: 99,
			width: 30,
			height: 16
		}
	};
	
	const [selectValue, setSelectValue] = useState(LEVELS.beginner);
	return (
		<section>
			<select onChange={(event) => setSelectValue(LEVELS[event.target.value])} style={{marginTop: '2%'}}>
				<option value="beginner">beginner</option>
				<option value="middle">middle</option>
				<option value="hard">hard</option>
			</select>
			<GameWrapper difficult={selectValue} />
		</section>
	)
};

export default Game;
