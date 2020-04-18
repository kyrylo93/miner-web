import React, {useState, useContext, useEffect} from "react";
import {difficultContext} from "../../context/DifficultContext";

const Timer = ({ isTimerContinue }) => {
    const [time, setTime] = useState(0)
    const { sessionTimeStamp } = useContext(difficultContext);

    useEffect(() => {
        let timer = null;

        if (isTimerContinue) {
            timer = setTimeout(() => { setTime(time + 1) }, 1000);
        }
        return () => clearTimeout(timer)
    }, [time])

    useEffect(() => {
        setTime(0)
    }, [sessionTimeStamp])

    return (
        <section style={{marginTop: '3%'}}>
            <span>Seconds: { time } </span>
        </section>
    )
}

export default Timer
