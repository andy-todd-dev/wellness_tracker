import React, { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import TimerDisplay from "./TimerDisplay";
import useSound from "use-sound";
import { Button } from "semantic-ui-react";
import { useTimer } from "@andy-todd-dev/use-timer";

import timerFinishedSfx from "../sounds/singingxbowl.wav";

const MeditationTimer = ({
  onPause,
  onPlay,
  onComplete,
  onReset,
  enableEditTimerButtons,
}) => {
  const [play] = useSound(timerFinishedSfx);

  const [initialTime, setInitialTime] = useLocalStorage(
    "timer-initial-time",
    1200
  );

  const { time, start, pause, reset, status } = useTimer({
    initialTime,
    timerType: "DECREMENTAL",
    endTime: 0,
    onTimeOver: () => {
      play();
      onComplete();
    },
  });

  useEffect(() => {
    reset();
  }, [initialTime, reset]);

  const isRunning = status === "RUNNING";
  const isPaused = status === "PAUSED";
  const isStopped = status === "STOPPED";

  return (
    <div className="meditation-timer">
      <TimerDisplay duration={time} />

      <div
        className={
          enableEditTimerButtons && isStopped && time > 0
            ? "timerButtons"
            : "timerButtonsRunning"
        }
      >
        {enableEditTimerButtons && isStopped && time > 0 && (
          <div className="backButtons">
            <Button
              icon="fast backward"
              circular={true}
              onClick={() => {
                setInitialTime(initialTime - 600);
              }}
              disabled={time <= 600}
            />
            <Button
              icon="step backward"
              circular={true}
              onClick={() => {
                setInitialTime(initialTime - 60);
              }}
              disabled={time <= 60}
            />
          </div>
        )}

        <div className="mainButtons">
          {!isRunning && time > 0 && (
            <Button
              icon="play"
              circular={true}
              onClick={() => {
                start();
                onPlay && onPlay();
              }}
            />
          )}
          {isRunning && (
            <Button
              icon="pause"
              circular={true}
              onClick={() => {
                pause();
                onPause && onPause();
              }}
            />
          )}
          {(isPaused || (isStopped && time === 0)) && (
            <Button
              onClick={() => {
                onReset && onReset();
                reset();
              }}
              icon="redo"
              circular={true}
            />
          )}
        </div>

        {enableEditTimerButtons && isStopped && time > 0 && (
          <div className="forwardButtons">
            <Button
              icon="step forward"
              circular={true}
              onClick={() => {
                setInitialTime(initialTime + 60);
              }}
              disabled={time >= 99 * 60}
            />

            <Button
              icon="fast forward"
              circular={true}
              onClick={() => {
                setInitialTime(initialTime + 600);
              }}
              disabled={time >= 90 * 60}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MeditationTimer;
