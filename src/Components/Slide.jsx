import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Slide = ({ color, title, content, isActive }) => {
  const slideRef = useRef(null);
  const elementsRef = useRef([]);

  // Animate elements when slide becomes active
  useGSAP(
    () => {
      if (isActive && elementsRef.current.length > 0) {
        // Reset positions first
        gsap.set(elementsRef.current, {
          y: 30,
          opacity: 0,
        });

        // Animate in with stagger
        gsap.to(elementsRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.2,
        });
      }
    },
    { scope: slideRef, dependencies: [isActive] }
  );

  return (
    <div
      ref={slideRef}
      className="slide-content"
      style={{ backgroundColor: color }}
    >
      <div className="slide-inner">
        <h1 ref={(el) => (elementsRef.current[0] = el)}>{title}</h1>
        <p ref={(el) => (elementsRef.current[1] = el)}>{content}</p>
        <button ref={(el) => (elementsRef.current[2] = el)}>Learn More</button>
      </div>
    </div>
  );
};

export default Slide;
