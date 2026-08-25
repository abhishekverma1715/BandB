import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  itemSelector?: string;
  start?: string;
  stagger?: number;
  y?: number;
  rotateX?: number;
  duration?: number;
}

export const useScrollReveal = ({
  itemSelector = '.reveal-item',
  start = 'top 82%',
  stagger = 0.12,
  y = 46,
  rotateX = -8,
  duration = 0.8,
}: ScrollRevealOptions = {}): RefObject<HTMLDivElement | null> => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(container.querySelectorAll(itemSelector));
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
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: start,
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            markers: false,
          },
        }
      );
    }, container);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [itemSelector, start, stagger, y, rotateX, duration]);

  return containerRef;
};

export default useScrollReveal;
