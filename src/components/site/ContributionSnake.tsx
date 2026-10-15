"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ContributionCalendar } from "@/types/github";

const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT = 30; // room for weekday labels
const TOP = 18; // room for month labels
const LEVEL_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const EATEN_COLOR = "#0b0c10";

/** Quiet days get a dim indigo-to-plum sweep across the year instead of flat grey. */
function emptyColor(col: number, cols: number) {
  const t = col / Math.max(cols - 1, 1);
  return `hsl(${245 + t * 75}, 38%, ${19 + Math.sin(t * Math.PI) * 4}%)`;
}
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const TICK_MS = 85;
const BASE_LENGTH = 4;
const MAX_LENGTH = 22;

type Pos = [col: number, row: number];

/**
 * Plan the snake's route: from the top-left corner, greedily head for the
 * nearest uneaten contribution, walking one cell at a time (columns first).
 * Returns every position visited and the step at which each cell is eaten.
 */
function planRoute(cal: ContributionCalendar) {
  const targets: Pos[] = [];
  cal.weeks.forEach((week, c) =>
    week.forEach((day, r) => {
      if (day && day.count > 0) targets.push([c, r]);
    })
  );

  const path: Pos[] = [[0, 0]];
  const eatenAt = new Map<string, number>();
  let [c, r] = path[0];
  const left = [...targets];

  while (left.length) {
    let best = 0;
    let bestDist = Infinity;
    left.forEach(([tc, tr], i) => {
      const d = Math.abs(tc - c) + Math.abs(tr - r);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    const [tc, tr] = left.splice(best, 1)[0];
    while (c !== tc) {
      c += Math.sign(tc - c);
      path.push([c, r]);
    }
    while (r !== tr) {
      r += Math.sign(tr - r);
      path.push([c, r]);
    }
    eatenAt.set(`${tc}-${tr}`, path.length - 1);
  }
  // Exit stage right so the snake leaves the grid before the loop restarts
  for (let i = 0; i < MAX_LENGTH; i++) path.push([c + i + 1, r]);

  return { path, eatenAt, targets: targets.length };
}

function monthLabels(cal: ContributionCalendar) {
  const labels: { col: number; text: string }[] = [];
  let last = -1;
  cal.weeks.forEach((week, col) => {
    const first = week.find(Boolean);
    if (!first) return;
    const m = new Date(`${first.date}T00:00:00`).getMonth();
    if (m !== last) {
      // Skip a label that would collide with the previous one
      if (!labels.length || col - labels[labels.length - 1].col > 2) {
        labels.push({ col, text: MONTHS[m] });
      }
      last = m;
    }
  });
  return labels;
}

export default function ContributionSnake({ calendar }: { calendar: ContributionCalendar }) {
  const { path, eatenAt, targets } = useMemo(() => planRoute(calendar), [calendar]);
  const months = useMemo(() => monthLabels(calendar), [calendar]);
  const [step, setStep] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // On narrow screens the graph scrolls sideways; start at the latest weeks
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  // Advance only while visible, and never for reduced-motion users
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let visible = false;

    const tick = () => {
      if (!visible) return;
      setStep((s) => (s + 1 >= path.length ? 0 : s + 1));
      timer = setTimeout(tick, TICK_MS);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      clearTimeout(timer);
      if (visible) timer = setTimeout(tick, TICK_MS);
    });
    if (wrapRef.current) io.observe(wrapRef.current);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [path.length]);

  let eaten = 0;
  eatenAt.forEach((at) => {
    if (at <= step) eaten++;
  });
  const length = Math.min(BASE_LENGTH + eaten, MAX_LENGTH);
  const body = path.slice(Math.max(0, step - length + 1), step + 1).reverse();

  const cols = calendar.weeks.length;
  const width = LEFT + cols * STEP;
  const height = TOP + 7 * STEP;

  return (
    <div ref={wrapRef} className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <p className="text-left">
          <span className="font-display text-3xl md:text-4xl text-white">
            {calendar.total.toLocaleString()}
          </span>
          <span className="text-sm md:text-base text-white/80 ml-2">
            contributions in the last year
          </span>
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-2)]" aria-hidden="true">
          Snake ate {eaten}/{targets}
        </p>
      </div>

      <div ref={scrollRef} className="overflow-x-auto -mx-1 px-1" data-lenis-prevent-wheel>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[640px] h-auto"
          role="img"
          aria-label={`GitHub contribution graph: ${calendar.total} contributions in the last year`}
        >
          {months.map((m) => (
            <text key={`${m.col}-${m.text}`} x={LEFT + m.col * STEP} y={11} fontSize={10} fill="#d6d3cd">
              {m.text}
            </text>
          ))}
          {[
            ["Mon", 1],
            ["Wed", 3],
            ["Fri", 5],
          ].map(([label, row]) => (
            <text key={label} x={0} y={TOP + (row as number) * STEP + 9} fontSize={10} fill="#d6d3cd">
              {label}
            </text>
          ))}

          {calendar.weeks.map((week, c) =>
            week.map((day, r) => {
              if (!day) return null;
              const isEaten = (eatenAt.get(`${c}-${r}`) ?? Infinity) <= step;
              return (
                <rect
                  key={day.date}
                  x={LEFT + c * STEP}
                  y={TOP + r * STEP}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill={isEaten ? EATEN_COLOR : day.level === 0 ? emptyColor(c, cols) : LEVEL_COLORS[day.level]}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={0.6}
                >
                  <title>{`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}</title>
                </rect>
              );
            })
          )}

          {body.map(([c, r], i) => {
            if (c >= cols) return null;
            const t = i / Math.max(body.length - 1, 1);
            return (
              <rect
                key={i}
                x={LEFT + c * STEP + (i === 0 ? 0 : 1)}
                y={TOP + r * STEP + (i === 0 ? 0 : 1)}
                width={i === 0 ? CELL : CELL - 2}
                height={i === 0 ? CELL : CELL - 2}
                rx={i === 0 ? 3 : 2}
                fill={i === 0 ? "#ffd27a" : `hsl(${30 - t * 50}, 90%, ${62 - t * 12}%)`}
                opacity={1 - t * 0.45}
                aria-hidden="true"
              />
            );
          })}
        </svg>
      </div>

      <div className="flex items-center justify-end gap-1.5 mt-3 text-xs text-white/75" aria-hidden="true">
        <span className="mr-1">Less</span>
        {LEVEL_COLORS.map((c, i) => (
          <span
            key={c}
            className="w-3 h-3 rounded-[3px] border border-white/10"
            style={{ background: i === 0 ? emptyColor(1, 2) : c }}
          />
        ))}
        <span className="ml-1">More</span>
      </div>
    </div>
  );
}
