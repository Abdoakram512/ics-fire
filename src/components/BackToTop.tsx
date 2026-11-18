"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { lang } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label={lang === "ar" ? "العودة إلى الأعلى" : "Scroll to top"}
          className={`fixed bottom-6 z-40 p-3 rounded-full bg-neutral-900/90 dark:bg-white/90 text-white dark:text-neutral-900 shadow-xl border border-white/10 dark:border-neutral-200/20 backdrop-blur-md hover:bg-[#D32F2F] dark:hover:bg-[#D32F2F] dark:hover:text-white transition-colors duration-200 group flex items-center justify-center ${
            lang === "ar" ? "left-6" : "right-6"
          }`}
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

