import { motion } from "framer-motion";

const Sparkle = ({ x, yOffset, delay }) => (
  <motion.div
    className="absolute w-3 h-3 sparkle z-10"
    style={{ left: `${x}%`, bottom: `${yOffset}%` }}
    initial={{ y: 0, opacity: 0, scale: 0.5 }}
    animate={{ y: -100, opacity: [0, 1, 0.5], scale: [0.5, 1.2, 0.8] }}
    transition={{
      delay,
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1,
    }}
  />
);

export default Sparkle;