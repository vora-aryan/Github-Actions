import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const MotionBasics = () => {
  const [show, setShow] = useState(true);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "12rem",
        backgroundColor: "lightgray",
      }}
    >
      <motion.button
        onClick={() => {
          setShow(!show);
        }}
        layout
      >
        Show/Hide
      </motion.button>
      <AnimatePresence>
        {show && (
          <motion.div
            animate={{
              opacity: [0, 0.5, 1],
              transition: { duration: 4 },
              y: [-100, 200, 0],
              x: [-450, -550, 0],
            }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            whileTap={{ scale: 0.8, transition: { duration: 0.3 } }}
            whileHover={{ scale: 1.5, transition: { duration: 0.3 } }}
            whileFocus={{
              backgroundColor: "red",
              transition: { duration: 1.5 },
            }}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "lightseagreen",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            Box
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default MotionBasics;
