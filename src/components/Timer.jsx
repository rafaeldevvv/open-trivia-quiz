import React, { useEffect, useRef } from "react";
import ConicGradientFillAnimation from "../classes/ConicGradientFillAnimation.js";

export default function Timer({
  duration,
  size,
  fillColor,
  innerColor,
  onFinish,
}) {
  const divRef = useRef(null);
  const finishHandler = useRef(onFinish);

  // i know this isn't good, but i don't want the effect to re-run everytime
  // a different function is passed
  if (onFinish !== finishHandler.current) {
    finishHandler.current = onFinish;
  }

  useEffect(() => {
    const conicGradientFillAnimation = new ConicGradientFillAnimation(
      divRef.current,
      { duration, fillColor, innerColor },() => {},
      () => {
        finishHandler.current();
      }
    );

    conicGradientFillAnimation.start();
    return () => conicGradientFillAnimation.stop();
  }, [duration, fillColor, innerColor]);

  return (
    <span
      style={{
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
        display: "inline-block",
        flexShrink: 0
      }}
      ref={divRef}
    ></span>
  );
}
