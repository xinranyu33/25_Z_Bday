import { useEffect, useState } from "react";
import Sparkle from "./Sparkle";

const SparkleGroup = ({ count = 5 }) => {
    const [sparkles, setSparkles] = useState([]);
    useEffect(() => {
        const newSparkles = Array.from({ length: count }, (_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 3,
        }));
        setSparkles(newSparkles);
    }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {sparkles.map((s, i) => (
        <Sparkle key={i} x={s.x} yOffset={s.y} delay={s.delay} />
      ))}
    </div>
  );
};

export default SparkleGroup;


