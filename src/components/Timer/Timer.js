import React, {useState, useContext, useEffect} from "react";
import {difficultContext} from "../../context/DifficultContext";

const Timer = ({ isTimerContinue }) => {
    const { sessionsTimeStamp } = useContext(difficultContext);

    const [time, setTime] = useState(0)

    useEffect(() => {
        let timer = null;

        if (isTimerContinue) {
            timer = setTimeout(() => { setTime(time + 1) }, 1000);
        }
        return () => clearTimeout(timer)
    }, [time])

    useEffect(() => {
        setTime(0)
    }, [ sessionsTimeStamp ])

    return (
        <section style={{marginTop: '3%'}}>
            <span>Seconds: { time } </span>
        </section>
    )
}

export default Timer
