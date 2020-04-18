import React, { useState, useContext } from "react";
import classes from './Game.module.css';
import GameWrapper from "../GameWrapper/GameWrapper";
import { difficultContext } from "../../context/DifficultContext";
import Timer from "../../components/Timer/Timer";

const Game = () => {
	const { difficult, setDifficult, LEVELS, setSessionTimestamp, setRestartStamp } = useContext(difficultContext);
	const [isTimerContinue, setIsTimerContinue] = useState(true)
	const [selectValue, setSelectValue] = useState(LEVELS[difficult]);
	const localDiff = localStorage.getItem('difficult')

	const changeLevel = event => {
		const value = event.target.value;

		setSelectValue(LEVELS[value]);
		setDifficult(value);

		localStorage.setItem('difficult', value);
		setIsTimerContinue(true);
	};

	const restartGame = () => {
		setSelectValue(LEVELS[difficult]);
		setIsTimerContinue(true);
		setSessionTimestamp(Date.now())
		setRestartStamp(Date.now())
		setDifficult(difficult);
	};

	return (
		<section className={classes.Game}>
			<Timer isTimerContinue={isTimerContinue} />
			<section className={classes.TopElements}>
				<select defaultValue={localDiff ? localDiff : 'beginner'} onChange={changeLevel} >
					<option value="beginner">beginner</option>
					<option value="middle">middle</option>
					<option value="hard">hard</option>
				</select>
				<button onClick={restartGame}>Restart</button>
			</section>
			<GameWrapper setIsTimerContinue={setIsTimerContinue} difficult={selectValue} />
		</section>
	)
};

export default Game;
