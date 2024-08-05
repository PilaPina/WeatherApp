import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Initial state: set opacity to 0, making the background invisible
      animate={{ opacity: 1, scale: 1 }} // Animate state: set opacity to 1 and scale to 1, making the background visible and scaled up
      transition={{ duration: 1 }} // Transition settings: animate over a duration of 1 second
      style={{
        animation: "colorShift 20s linear infinite", // Set the animation property to "colorShift" with a duration of 20 seconds, repeating infinitely
        willChange: "background", // Optimize performance by indicating that the background will change
      }}
    ></motion.div>
  );
};

export default AnimatedBackground;
