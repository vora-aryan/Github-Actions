import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slidesData = [
  "#ff5733",
  "#33b5ff",
  "#8e44ad",
  "#16a085",
  "#f39c12",
  "#2c3e50",
];

const CardStackScroll = () => {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);

  // Scroll handler
  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnimating.current) return;

      const scrollingDown = e.deltaY > 0;
      const atFirst = currentIndex === 0;
      const atLast = currentIndex === slidesData.length - 1;

      if ((scrollingDown && atLast) || (!scrollingDown && atFirst)) {
        return; // Let the page scroll only after last slide
      }

      e.preventDefault();
      isAnimating.current = true;

      const nextIndex = scrollingDown
        ? Math.min(currentIndex + 1, slidesData.length - 1)
        : Math.max(currentIndex - 1, 0);

      animateSlideChange(currentIndex, nextIndex);
      setCurrentIndex(nextIndex);

      setTimeout(() => {
        isAnimating.current = false;
      }, 1000);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIndex]);

  // Animate between slides
  const animateSlideChange = (from, to) => {
    const fromSlide = slidesRef.current[from];
    const toSlide = slidesRef.current[to];

    gsap.fromTo(
      toSlide,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.7, ease: "power2.inOut" }
    );
    gsap.to(fromSlide, {
      autoAlpha: 0,
      duration: 0.7,
      ease: "power2.inOut",
    });
  };

  return (
    <div>
      {/* Slide container */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        {slidesData.map((color, index) => (
          <div
            key={index}
            ref={(el) => (slidesRef.current[index] = el)}
            style={{
              backgroundColor: color,
              position: "absolute",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "3rem",
              opacity: index === 0 ? 1 : 0,
              pointerEvents: index === currentIndex ? "auto" : "none",
            }}
          >
            Slide {index + 1}
          </div>
        ))}
      </div>

      {/* Main page content */}
      {currentIndex === slidesData.length - 1 && (
        <div
          style={{
            height: "200vh",
            background: "#eee",
            paddingTop: "100vh",
            textAlign: "center",
            fontSize: "2rem",
          }}
        >
          🎉 You reached the end of slides. Keep scrolling!
        </div>
      )}
    </div>
  );
};

export default CardStackScroll;
