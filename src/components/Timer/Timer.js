import React, {useState, useContext, useEffect} from "react";
import {difficultContext} from "../../context/DifficultContext";

const Timer = () => {
    const { sessionsTimeStamp } = useContext(difficultContext);
    const [time, setTime] = useState(0)

    let timer = null

    useEffect(() => {
        // clearTimeout(timer);
        timer = getTimeout(false)
    }, [ ])

    // useEffect(() => {
    //     console.log('start')
    //     timer = getTimeout(false)
    //
    // }, [time])



    const getTimeout = (newTime) => {
        return setTimeout(() => {
            let currTime = newTime ? 0 : time + 1;
            setTime(currTime);
        }, 1000)
    }

    return (
        <section style={{marginTop: '3%'}}>
            <span>Seconds: { time } </span>
        </section>
    )
}

export default Timer
