"use client";
import React, { useState, useEffect } from "react"; // Removed useRef

import { motion } from "motion/react"; // Using motion/react as specified
import { cn } from "@/lib/utils"; // Adjusted path

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM:
      "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  };

  const highlight =
    "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)"; // Default highlight is blueish

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]); // Added duration and clockwise to dependency array
  return (
    <Tag
      onMouseEnter={() => {
        // Removed _event parameter
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
        containerClassName
      )}
      {...props}>
      <div
        className={cn(
          "w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]",
          className
        )}>
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      {/* The following div creates the "border" effect by masking the blurred gradient */}
      {/* For rounded-xl on container (0.75rem), inset-[2px] means inner radius should be slightly less.
          Using rounded-lg (0.5rem) as an approximation. Or, ideally, this would be calc(var(--radius-xl) - 2px) if CSS vars are available.
          For simplicity and to match common use with rounded-xl, let's use rounded-lg for the mask.
          If container is rounded-full, then this should be rounded-full too.
          We can make this more dynamic if needed, but for now, this is a common case.
          A more robust solution would be to pass the mask's borderRadius as a prop or derive it.
          Given the component's default is rounded-full, rounded-[100px] was fine.
          If we expect varied border radii, this part needs to be more flexible.
          Let's assume for now the parent will mostly use rounded-xl or rounded-full.
          If containerClassName has rounded-full, this should be rounded-full. Otherwise, rounded-lg.
          This logic is getting complex for a simple replacement.
          The original component uses rounded-[inherit] for the motion.div and the children's wrapper.
          The mask div is `inset-[2px] rounded-[100px]`. This `100px` is effectively `rounded-full`.
          If the main container is `rounded-xl`, the mask should be `rounded-lg` (approx `rounded-xl` minus `2px`).
          I will change it to `rounded-[calc(var(--radius-xl)-2px)]` if I can rely on CSS vars, or just `rounded-lg`.
          Let's use `rounded-lg` as a sensible default for non-circular.
          The component's default `containerClassName` has `rounded-full`.
          The mask is `rounded-[100px]` which is effectively `rounded-full`.
          If `containerClassName` overrides to `rounded-xl`, then the mask should be `rounded-lg`.
          This is tricky. I will make the mask `rounded-[inherit]` and adjust its inset slightly if needed, or make its background transparent.
          The user wants the card transparent. The mask's `bg-black` is the problem.
          I will make the mask's background transparent.
      */}
      {/* Reverting to bg-black for the mask as it's essential for the border effect.
          The "transparent card" likely refers to the container/wrapper, not the content area background needed by this effect.
      */}
      <div className="bg-black absolute z-1 flex-none inset-[2px] rounded-[inherit]" />
    </Tag>
  );
}
