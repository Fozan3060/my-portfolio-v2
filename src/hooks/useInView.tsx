'use client';
import { useEffect, useRef, useState } from 'react';
import { whenSiteReady } from '@/lib/siteReady';

function useInView<T extends HTMLElement>(
  threshold = 0.1,
  once = true
) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let observer: IntersectionObserver | undefined;

    // Start observing only once the preloader lifts, so sections already on screen
    // (like the hero) play their entrance animation where visitors can see it.
    const cancel = whenSiteReady(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (once && hasAnimated) {
            return;
          }

          if (entry.isIntersecting) {
            setIsInView(true);
            if (once) {
              setHasAnimated(true);
              observer?.disconnect();
            }
          } else {
            if (!once && isInView) {
              setIsInView(false);
            }
          }
        },
        { threshold }
      );
      observer.observe(element);
    });

    return () => {
      cancel();
      observer?.disconnect();
    };
  }, [threshold, once, hasAnimated, isInView]);

  return { ref, isInView };
}

export default useInView;
