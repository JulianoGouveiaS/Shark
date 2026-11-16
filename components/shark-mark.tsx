"use client";

import { motion, useReducedMotion } from "motion/react";

const CORPO =
  "M122 33c-12-9-30-13-44-11L64 6l-6 17c-8 2-14 5-16 7L26 14l12 18L24 50l20-14c10 6 22 7 28 6l-8 12 22-11c16 1 28-3 36-10z";

const TRACOS = ["M18 28H2", "M16 34H6", "M12 40H4"];

export function SharkMark({
  animate = false,
  className,
}: {
  animate?: boolean;
  className?: string;
}) {
  const reduzir = useReducedMotion();
  const desenha = animate && !reduzir;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 64"
      fill="none"
      role="img"
      aria-label="Shark"
      className={className}
    >
      <g stroke="#E85D04" strokeWidth="2.5" strokeLinecap="round">
        {TRACOS.map((d, indice) =>
          desenha ? (
            <motion.path
              key={d}
              className="shark-speed"
              d={d}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: indice * 0.08, ease: "easeOut" }}
            />
          ) : (
            <path key={d} className="shark-speed" d={d} />
          ),
        )}
      </g>
      <path fill="currentColor" d={CORPO} />
    </svg>
  );
}
