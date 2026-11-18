"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function ScrollProgress() {
  const { lang } = useApp();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-[3px] bg-[#D32F2F] z-[100] pointer-events-none shadow-[0_0_8px_rgba(211,47,47,0.6)] ${
        lang === "ar" ? "origin-right" : "origin-left"
      }`}
      style={{ scaleX }}
    />
  );
}

