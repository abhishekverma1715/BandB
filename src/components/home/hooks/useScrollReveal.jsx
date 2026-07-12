import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = ({
  itemSelector = ".reveal-item",
  start = "top 82%",
  stagger = 0.12,
  y = 46,
  rotateX = -8,
  duration = 0.8,
} = {}) => {

  const containerRef = useRef(null);

  useEffect(() => {

    const container = containerRef.current;

    if (!container) return;


    const ctx = gsap.context(() => {

      const items = gsap.utils.toArray(
        container.querySelectorAll(itemSelector)
      );


      if (!items.length) return;


      gsap.fromTo(
        items,

        {
          opacity: 0,
          y,
          rotateX,
          scale: 0.95,
          transformPerspective: 1000,
        },

        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration,
          stagger,
          ease: "power3.out",

          scrollTrigger: {
            trigger: container,
            start: start,
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        }

      );


    }, container);


    // Important for dynamic React pages
    ScrollTrigger.refresh();


    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };


  }, [
    itemSelector,
    start,
    stagger,
    y,
    rotateX,
    duration
  ]);


  return containerRef;
};


export default useScrollReveal;