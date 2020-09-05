import React, { useState, useEffect, useRef } from 'react';

import useElementOffset from './use-element-offset';
import useHumanTime from './use-human-time';
import ModeButtons from '../mode-buttons/mode-buttons';
import Wheel from '../wheel/wheel';
import Point from '../point/point';
import Time from '../time/time';

export default function App() {
  // Step for intervals, 45 degrees = 1.5 hours
  const step = 45;
  const wheelContainerRef = useRef();

  // The angle of the first point (fall asleep)
  const [start, setStart] = useState(315);
  // The angle of the second point (wake up)
  const [end, setEnd] = useState(180);

  // Active point ('sleep', 'wake')
  const [mode, setMode] = useState('sleep');
  // What point is pressed now
  const [isPressed, setIsPressed] = useState('');

  // The point does not stand at a rounded hour every time.
  // It could be 11:35, so we need to remember 5 minutes for calculations
  const [stepOffset, setStepOffset] = useState(0);

  const { xOffset, yOffset } = useElementOffset(wheelContainerRef);
  const { diffTime, startTime, endTime, diffTimeFormatted } = useHumanTime({
    start,
    end
  });

  useEffect(
    function calculateStepOffset() {
      const diff = Math.abs(mode === 'sleep' ? start % step : end % step);
      const toMin = diff < step / 2;
      setStepOffset(toMin ? -diff : step - diff);
    },
    [start, end, mode]
  );

  useEffect(
    function moveConnectedPoint() {
      // After moving one point, another one will move
      // to the position where diff. in time is 7.5 hours. 7.5 hours = 225deg
      const bestAmountSleepTimeDeg = 225;
      if (mode === 'sleep' && isPressed === 'sleep') setEnd(start + bestAmountSleepTimeDeg);
      if (mode === 'wake' && isPressed === 'wake') setStart(end - bestAmountSleepTimeDeg);
    },
    [start, end, isPressed, mode]
  );

  return (
    <div className="container">
      <h1>I am going to</h1>
      <ModeButtons value={mode} onChange={setMode} />
      <Time startTime={startTime} endTime={endTime} />
      <div ref={wheelContainerRef} className="app">
        <Wheel start={start} end={end} diffTime={diffTime} diffTimeFormatted={diffTimeFormatted} />
        <Point
          value={start}
          onChange={setStart}
          xOffset={xOffset}
          yOffset={yOffset}
          stepOffset={stepOffset}
          step={step}
          active={mode === 'sleep'}
          setIsPressed={() => setIsPressed('sleep')}
        >
          <img src="./assets/moon.svg" alt="Fall asleep icon" />
        </Point>
        <Point
          value={end}
          onChange={setEnd}
          xOffset={xOffset}
          yOffset={yOffset}
          stepOffset={stepOffset}
          step={step}
          active={mode === 'wake'}
          setIsPressed={() => setIsPressed('wake')}
        >
          <img src="./assets/sun.svg" alt="Wake up icon" />
        </Point>
      </div>
    </div>
  );
}
