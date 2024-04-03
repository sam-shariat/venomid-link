import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface AnimateOpacityProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimateScale = ({ children, delay }: AnimateOpacityProps) => (
  <AnimatePresence mode="popLayout">
    <motion.div
      initial={{ opacity:0, scale: 0 }}
      animate={{ opacity:1, scale: 1}}
      transition={{ duration: 0.5, delay, delayChildren: delay }}      
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default AnimateScale;