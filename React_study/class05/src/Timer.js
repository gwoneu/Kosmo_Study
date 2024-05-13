import React, {useState, useEffect} from "react";

function Timer() {
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalID;

        if(isRunning) {
        setStartTime(performance.now() - elapsedTime * 1000);

            intervalID = setInterval(() => {
                const currentTime = performance.now();
                setElapsedTime(Math.floor((currentTime - startTime)/1000));
            }, 1000)
        }

        return () => {
            clearInterval(intervalID);
        };
    }, [isRunning]);

    const handlePlay = () => {
        if(!isRunning) {
        setIsRunning(true);
        setStartTime(performance.now() - elapsedTime * 1000);
        }
    };

    const handlePause = () => {
        if(isRunning){
        setIsRunning(false);
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setStartTime(0); //초기화
        setElapsedTime(0);
    };

    return (
        <>
            <h1>타이머</h1>
            <div>시간 : {elapsedTime}초</div>

            <button onClick={handlePlay}>
                Start
            </button>
            <button onClick={handlePause}>
                Pause
            </button>
            <button onClick={handleReset}>
                Reset
            </button>
        </>
    )
}

export default Timer;