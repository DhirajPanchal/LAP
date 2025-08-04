"use client";

import * as React from "react";
import { cssValue } from "./helpers/unitConverter";
import { LoaderSizeProps } from "./helpers/props";
import { createAnimation } from "./helpers/animation";

const skew = createAnimation(
  "SkewLoader",
  `25% {transform: perspective(100px) rotateX(180deg) rotateY(0)}
   50% {transform: perspective(100px) rotateX(180deg) rotateY(180deg)}
   75% {transform: perspective(100px) rotateX(0) rotateY(180deg)}
   100% {transform: perspective(100px) rotateX(0) rotateY(0)}`,
  "skew"
);

export default function BankLoader({
  color = "#5E6584",
  loading = true,
  size = 12,
  speedMultiplier = 1,
  cssOverride = {},
  ...props
}: LoaderSizeProps) {
  const s = cssValue(size);
  //const colorT = "#5E6584";
  const animDuration = `${2 / speedMultiplier}s`;

  const triangleBase: React.CSSProperties = {
    width: 0,
    height: 0,
    position: "absolute",
    transformOrigin: "center center",
  };

  const triangleAnimated: React.CSSProperties = {
    animation: `${skew} ${animDuration} 0s infinite cubic-bezier(0.09, 0.57, 0.49, 0.9)`,
  };

  return (
    <div
      style={{
        position: "relative",
        width: `calc(${s} * 4)`,
        height: `calc(${s} * 2)`,
        display: "inline-block",
        ...cssOverride,
      }}
      {...props}
    >
      {/* Top */}
      <span
        style={{
          ...triangleBase,
          ...(loading ? triangleAnimated : {}),
          borderLeft: `${s} solid transparent`,
          borderRight: `${s} solid transparent`,
          borderTop: `${s} solid ${color}`,
          top: 0,
          left: s,
        }}
      />

      {/* Right */}
      <span
        style={{
          ...triangleBase,
          ...(loading ? triangleAnimated : {}),
          borderTop: `${s} solid transparent`,
          borderBottom: `${s} solid transparent`,
          borderLeft: `${s} solid ${color}`,
          top: 0,
          left: `calc(${s} * 3)`,
        }}
      />

      {/* Bottom */}
      <span
        style={{
          ...triangleBase,
          ...(loading ? triangleAnimated : {}),
          borderLeft: `${s} solid transparent`,
          borderRight: `${s} solid transparent`,
          borderBottom: `${s} solid ${color}`,
          top: s,
          left: s,
        }}
      />

      {/* Left */}
      <span
        style={{
          ...triangleBase,
          ...(loading ? triangleAnimated : {}),
          borderTop: `${s} solid transparent`,
          borderBottom: `${s} solid transparent`,
          borderRight: `${s} solid ${color}`,
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}
