import React, {useState} from "react";
export const difficultContext = React.createContext();

const DifficultContextProvider = ({ children }) => {
    const localDiff = localStorage.getItem('difficult')
    const [difficult, setDifficult] = useState(localDiff ? localDiff : 'beginner');
    const [sessionTimeStamp, setSessionTimestamp] = useState(Date.now())
    const [restartStamp, setRestartStamp] = useState(Date.now());

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

    return <difficultContext.Provider children={children} value={{ difficult, setDifficult, LEVELS, sessionTimeStamp, setSessionTimestamp, restartStamp, setRestartStamp }} />
};

export default DifficultContextProvider;
