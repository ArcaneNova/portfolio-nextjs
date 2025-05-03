// This file provides named exports for framer-motion
// to avoid the "export *" error in Next.js client boundaries

import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useCycle,
  stagger,
  animate,
  m,
  LazyMotion,
  domAnimation,
  MotionConfig,
  useMotionTemplate,
  useReducedMotion,
  useTime,
  useVelocity,
  useWillChange,
  LayoutGroup,
  useIsPresent,
  usePresence,
  MotionValue,
  type AnimationProps
} from 'framer-motion';

// Re-export all individually to avoid "export *"
export {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useCycle,
  stagger,
  animate,
  m,
  LazyMotion,
  domAnimation,
  MotionConfig,
  useMotionTemplate,
  useReducedMotion,
  useTime,
  useVelocity,
  useWillChange,
  LayoutGroup,
  useIsPresent,
  usePresence,
  MotionValue,
};

// Export types separately
export type { AnimationProps };

// Common variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const popIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25
    }
  }
};

export const slideUp = {
  hidden: { y: 100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

export const slideIn = {
  hidden: { x: "100%" },
  visible: { 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    x: "100%",
    transition: {
      ease: "easeInOut"
    }
  }
};

export const zoomIn = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}; 