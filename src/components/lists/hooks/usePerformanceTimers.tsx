import { useEffect, useLayoutEffect, useRef, useState } from "react";
import OptionApiModel from "../../../models/OptionApiModel";

const usePerformanceTimers = (options: Array<OptionApiModel>) => {
  const [layoutTime, setLayoutTime] = useState("");
  const [renderTime, setRenderTime] = useState("");

  const timerLayoutRef = useRef<number | null>(null);
  const timerRenderRef = useRef<number | null>(null);

  /*****************************************************************/
  /* Timers for layout before rendering
       /*****************************************************************/
  useLayoutEffect(() => {
    if (timerLayoutRef.current !== null) {
      const endTime = performance.now();
      const time = `Layout time: ${(endTime - timerLayoutRef.current).toFixed(2)}ms`;
      setLayoutTime(time);
      timerLayoutRef.current = null;
    }
  }, [options]);

  /*****************************************************************/
  /* Timers for layout after rendering to browser
      /*****************************************************************/
  useEffect(() => {
    if (timerRenderRef.current !== null) {
      const endTime = performance.now();
      const time = `Render time: ${(endTime - timerRenderRef.current).toFixed(2)}ms`;
      setRenderTime(time);
      timerRenderRef.current = null;
    }
  }, [options]);

  /*****************************************************************/
  /* Start Timers
     /*****************************************************************/
  const timerStart = () => {
    timerLayoutRef.current = performance.now();
    timerRenderRef.current = performance.now();
  };

  return {
    timerStart,
    layoutTime,
    renderTime,
  };
};

export default usePerformanceTimers;
