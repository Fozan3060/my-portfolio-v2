'use client';
import { useEffect, useRef, useState } from 'react';

function useInView<T extends HTMLElement>(
  threshold = 0.1,
  once = true
) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (once && hasAnimated) {
          return;
        }

        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            setHasAnimated(true);
            observer.disconnect();
          }
        } else {
          if (!once && isInView) {
            setIsInView(false);
          }
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [threshold, once, hasAnimated, isInView]);

  return { ref, isInView };
}

export default useInView;