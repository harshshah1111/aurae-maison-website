import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CursorState {
  visible: boolean;
  text: string;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const [cursor, setCursor] = useState<CursorState>({
    visible: false,
    text: 'VIEW',
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const viewElement = target?.closest('[data-cursor="view"]') || target?.closest('.cursor-view-trigger');

      if (viewElement) {
        setCursor({
          visible: true,
          text: (viewElement.getAttribute('data-cursor-text') as string) || 'VIEW',
          x: e.clientX,
          y: e.clientY,
        });
      } else {
        setCursor((prev) => (prev.visible ? { ...prev, visible: false } : prev));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <AnimatePresence>
      {cursor.visible && (
        <motion.div
          id="custom-luxury-cursor"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            x: cursor.x - 36,
            y: cursor.y - 36,
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300,
            mass: 0.5,
          }}
          className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center w-[72px] h-[72px] rounded-full bg-[#E8A7B8] text-[#5A2738] shadow-2xl backdrop-blur-sm tracking-widest text-[10px] uppercase font-sans-refined font-bold select-none border border-[#FFF9FA]/30"
        >
          {cursor.text}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
