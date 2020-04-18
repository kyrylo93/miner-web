import React, { useState, useContext } from "react";
import GameWrapper from "../GameWrapper/GameWrapper";
import { difficultContext } from "../../context/DifficultContext";
import Timer from "../../components/Timer/Timer";

const Game = () => {
	const { difficult, setDifficult, LEVELS } = useContext(difficultContext);
	const [selectValue, setSelectValue] = useState(LEVELS[difficult]);
	const localDiff = localStorage.getItem('difficult')

	const changeLevel = event => {
		const value = event.target.value

		setSelectValue(LEVELS[value]);
		setDifficult(value);

		localStorage.setItem('difficult', value);
	};

	return (
		<section>
			<Timer />
			<select defaultValue={localDiff ? localDiff : 'beginner'} onChange={changeLevel} style={{ marginTop: '2%' }}>
				<option value="beginner">beginner</option>
				<option value="middle">middle</option>
				<option value="hard">hard</option>
			</select>
			<GameWrapper difficult={selectValue} />
		</section>
	)
};

export default Game;
