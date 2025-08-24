"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, CheckCircle2, Clock9, XCircle } from "lucide-react";

type Tone = "neutral" | "indigo" | "blue" | "teal" | "amber" | "red";

type Props = {
  title: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  tone?: Tone;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  className?: string;
  "aria-label"?: string;
};

// EVEN LIGHTER, enterprise-muted palette (dark @ top-right → light @ bottom-left)
const surface: Record<Tone, string> = {
  neutral:
    "bg-[radial-gradient(140%_180%_at_100%_0%,#4a6278_0%,#c9d6e2_48%,#fafcfe_98%)] " +
    "dark:bg-[radial-gradient(140%_180%_at_100%_0%,#122133_0%,#213040_50%,#0b121a_98%)]",
  indigo:
    "bg-[radial-gradient(140%_180%_at_100%_0%,#415b8d_0%,#c9d3f4_46%,#f7f9ff_98%)] " +
    "dark:bg-[radial-gradient(140%_180%_at_100%_0%,#111f40_0%,#324379_50%,#0b121a_98%)]",
  blue:
    "bg-[radial-gradient(140%_180%_at_100%_0%,#3a6886_0%,#cfeafd_48%,#fbfdff_98%)] " +
    "dark:bg-[radial-gradient(140%_180%_at_100%_0%,#0e2a3f_0%,#215279_50%,#0b121a_98%)]",
  teal:
    "bg-[radial-gradient(140%_180%_at_100%_0%,#2e766d_0%,#c8f3ec_46%,#f7fdfa_98%)] " +
    "dark:bg-[radial-gradient(140%_180%_at_100%_0%,#0d3530_0%,#1e6c64_50%,#0b121a_98%)]",
  amber:
    "bg-[radial-gradient(140%_180%_at_100%_0%,#9b7c2b_0%,#f6e6b8_46%,#fffbef_98%)] " +
    "dark:bg-[radial-gradient(140%_180%_at_100%_0%,#553f10_0%,#7f6a2e_50%,#0b121a_98%)]",
  red:
    "bg-[radial-gradient(140%_180%_at_100%_0%,#8d5560_0%,#f6c6cf_46%,#fff4f7_98%)] " +
    "dark:bg-[radial-gradient(140%_180%_at_100%_0%,#4a232a_0%,#7f4a55_50%,#0b121a_98%)]",
};

// stronger soft-light veil to lift brightness without blowing out text
const lightenVeil =
  "after:pointer-events-none after:absolute after:inset-0 after:bg-white/32 " +
  "dark:after:bg-white/10 after:mix-blend-soft-light";

export function MetricSelectCardV4({
  title,
  value,
  subtext,
  icon,
  tone = "neutral",
  selected = false,
  disabled = false,
  onSelect,
  className,
  ...aria
}: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={onSelect}
      data-selected={selected}
      className={cn(
        "group relative w-full overflow-hidden rounded-lg py-2 px-4 text-left",
        surface[tone],
        lightenVeil,
        // softer depth; borderless at rest
        "shadow-[0_1px_1px_rgba(2,6,23,0.02),0_6px_14px_rgba(2,6,23,0.05)] " +
          "dark:shadow-[0_1px_1px_rgba(0,0,0,0.35),0_6px_14px_rgba(0,0,0,0.45)] " +
          "transition-all duration-200 outline-none",
        // light hover ring
        "hover:ring-[1.5px] hover:ring-indigo-100/70 hover:ring-offset-2 " +
          "ring-offset-white dark:ring-offset-slate-900",
        // selected = indigo-200 ring + mild glow
        "data-[selected=true]:ring-4 data-[selected=true]:ring-[#D0E1F5] " +
          "data-[selected=true]:ring-offset-0" +
          "data-[selected=true]:shadow-[0_6px_18px_rgba(2,6,23,0.05)] " +
          "dark:data-[selected=true]:shadow-[0_8px_18px_rgba(0,0,0,0.5)]",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      {...aria}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium text-slate-800 dark:text-slate-300/90">
            {title}
          </div>
          <div className="mt-1 text-[36px] leading-none font-semibold text-slate-700 dark:text-slate-50">
            {value}
          </div>
          {subtext ? (
            <div className="mt-2 text-xs text-slate-800 dark:text-slate-400/80">
              {subtext}
            </div>
          ) : null}
        </div>
        {/* bare icon */}
        {icon ? (
          <div className="shrink-0 text-gray-200 dark:text-slate-300/80 group-hover:text-slate-600/90 dark:group-hover:text-slate-200/90 transition-colors">
            {icon}
          </div>
        ) : null}
      </div>
    </button>
  );
}

export const CardIcons = {
  total: <TrendingUp className="size-8" />,
  pending: <Clock9 className="size-8" />,
  approved: <CheckCircle2 className="size-8" />,
  rejected: <XCircle className="size-8" />,
};
