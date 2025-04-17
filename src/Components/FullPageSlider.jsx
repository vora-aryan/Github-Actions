/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const slides = [
  {
    id: 1,
    headingLeft: "Heading Left 1",
    descriptionLeft: "Description Left 1",
    headingRight: "Heading Right 1",
    descriptionRight: "Description Right 1",
    color: "#ffadad",
  },
  {
    id: 2,
    headingLeft: "Heading Left 2",
    descriptionLeft: "Description Left 2",
    headingRight: "Heading Right 2",
    descriptionRight: "Description Right 2",
    color: "#ffd6a5",
  },
  {
    id: 3,
    headingLeft: "Heading Left 3",
    descriptionLeft: "Description Left 3",
    headingRight: "Heading Right 3",
    descriptionRight: "Description Right 3",
    color: "#fdffb6",
  },
  {
    id: 4,
    headingLeft: "Heading Left 4",
    descriptionLeft: "Description Left 4",
    headingRight: "Heading Right 4",
    descriptionRight: "Description Right 4",
    color: "#caffbf",
  },
];

// Slide component
const Slide = ({
  slide,
  leftHeadingRef,
  leftDescRef,
  rightHeadingRef,
  rightDescRef,
}) => {
  return (
    <>
      {/* Left Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <h1
          ref={leftHeadingRef}
          style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
        >
          {slide.headingLeft}
        </h1>
        <p
          ref={leftDescRef}
          style={{
            fontSize: "1.2rem",
            maxWidth: "500px",
            lineHeight: "1.6",
          }}
        >
          {slide.descriptionLeft}
        </p>
      </div>

      {/* Right Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <h1
          ref={rightHeadingRef}
          style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
        >
          {slide.headingRight}
        </h1>
        <p
          ref={rightDescRef}
          style={{
            fontSize: "1.2rem",
            maxWidth: "500px",
            lineHeight: "1.6",
          }}
        >
          {slide.descriptionRight}
        </p>
      </div>
    </>
  );
};

// SlideContainer component
export default function FullPageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);

  const leftHeadingRef = useRef(null);
  const leftDescRef = useRef(null);
  const rightHeadingRef = useRef(null);
  const rightDescRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling.current) return;

      isScrolling.current = true;

      // Animate content out
      gsap.to(
        [
          leftHeadingRef.current,
          leftDescRef.current,
          rightHeadingRef.current,
          rightDescRef.current,
        ],
        {
          opacity: 0,
          y: 50,
          rotationX: 90,
          duration: 0.5,
          ease: "power2.out",
        }
      );

      setTimeout(() => {
        if (e.deltaY > 0) {
          setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
        } else {
          setCurrentSlide((prev) => Math.max(prev - 1, 0));
        }
      }, 500);

      setTimeout(() => {
        // Animate content in
        gsap.fromTo(
          [leftHeadingRef.current, rightHeadingRef.current],
          { opacity: 0, y: -50, rotationX: -90 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2,
          }
        );

        gsap.fromTo(
          [leftDescRef.current, rightDescRef.current],
          { opacity: 0, y: -50, rotationX: -90 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.4,
          }
        );
      }, 600);

      setTimeout(() => {
        isScrolling.current = false;
      }, 1800);
    };

    const container = containerRef.current;
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const slide = slides[currentSlide];

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        backgroundColor: slide.color,
        transition: "background-color 0.5s ease",
      }}
    >
      <Slide
        slide={slide}
        leftHeadingRef={leftHeadingRef}
        leftDescRef={leftDescRef}
        rightHeadingRef={rightHeadingRef}
        rightDescRef={rightDescRef}
      />
    </div>
  );
}
