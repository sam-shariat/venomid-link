import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface AnimateOpacityProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimateOpacity = ({ children, delay }: AnimateOpacityProps) => (
  <AnimatePresence mode="popLayout">
    <motion.div
      style={{width: '100%' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      transition={{ duration: 0.5, delay, delayChildren: delay }}      
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default AnimateOpacity;