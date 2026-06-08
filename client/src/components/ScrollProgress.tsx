import { useScroll, motion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: '0%',
      }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 to-amber-400 z-50"
    />
  );
}
