"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const useLoop = (delay = 3000) => {
  const [key, setKey] = useState(0);

  const incrementKey = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const interval = setInterval(incrementKey, delay);
    return () => clearInterval(interval);
  }, [delay, incrementKey]);

  return { key };
};

interface AnimatedSubtitleProps {
  texts: string[];
  delay?: number;
  className?: string;
}

export function AnimatedSubtitle({ texts, delay = 3000, className }: AnimatedSubtitleProps) {
  const { key } = useLoop(delay);

  const currentItem = useMemo(() => {
    return texts[key % texts.length];
  }, [texts, key]);

  return (
    <div className={cn("relative overflow-hidden flex items-center justify-center", className)}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="whitespace-nowrap text-center absolute w-full"
        >
          {currentItem}
        </motion.div>
      </AnimatePresence>
      {/* Invisible placeholder to maintain height */}
      <div className="opacity-0 pointer-events-none whitespace-nowrap">
        {/* We use the longest string or just the first string to maintain a consistent minimum height */}
        {texts[0]}
      </div>
    </div>
  );
}
