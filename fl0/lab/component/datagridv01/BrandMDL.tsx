"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  x?: string; // the brand color (hex/rgb/hsl). e.g. "#68bdf2"
  className?: string; // extra classes (e.g., to place it)
  size?: "xs" | "sm" | "md" | "lg";
  srLabel?: string; // accessible label
};

export default function BrandMDL({
  x = "#2563eb", // default indigo-600-ish
  className,
  size = "md",
  srLabel = "Grade MDL",
}: Props) {
  const pad =
    size === "xs"
      ? "text-xs px-1 py-0"
      : size === "sm"
      ? "text-sm px-1 py-0"
      : size === "md"
      ? "text-md px-1 py-0"
      : "text-lg px-1 py-0";

  return (
    <div
      style={{ ["--x" as any]: x } as React.CSSProperties}
      className={cn(
        "inline-flex select-none items-center overflow-hidden rounded-none",
        "border border-2 border-[var(--x)] shadow-sm",
        "bg-white", // container bg shows on rounded edge
        className
      )}
      aria-label={srLabel}
    >
      {/* Left: Grade (white bg, colored text) */}
      <span className={cn(pad, "font-semibold text-white bg-[var(--x)]")}>
        GRADE
      </span>

      {/* Right: MDL (colored bg, white text) */}
      <span className={cn(pad, "font-semibold text-[var(--x)] bg-white")}>
        Model Defaul List
      </span>
    </div>
  );
}
