import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [second, setSecond] = useState(0);
  const [miliSecond, setMiliSecond] = useState(0);
  const [stop, setStop] = useState(true);

  const onStart = () => {
    setStop(false);
  };

  const onStop = () => {
    setStop(true);
  };

  const onReset = () => {
    setStop(true);
    setHour(0);
    setMin(0);
    setSecond(0);
    setMiliSecond(0);
  };

  useEffect(() => {
    let interval = null;

    const incrementTime = () => {
      if (!stop) {
        setMiliSecond((prevMiliSecond) => {
          if (prevMiliSecond >= 99) {
            setSecond((prevSecond) => {
              if (prevSecond >= 59) {
                setMin((prevMin) => {
                  if (prevMin >= 59) {
                    setHour((prevHour) => prevHour + 1);
                    return 0;
                  }
                  return prevMin + 1;
                });
                return 0;
              }
              return prevSecond + 1;
            });
            return 0;
          }
          return prevMiliSecond + 1;
        });
      }
    };

    if (!stop) {
      interval = setInterval(incrementTime, 10);
    }

    return () => clearInterval(interval);
  }, [stop]);

  return (
    <div className="container">
      <div className="stopwatch">
        <h1>
          {hour}: {min} : {second} : {miliSecond}
        </h1>
        <div className="buttons-container">
          {stop ? (
            <button onClick={onStart}>Start</button>
          ) : (
            <button onClick={onStop} className="red-button">
              Stop
            </button>
          )}
          <button onClick={onReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default App;
