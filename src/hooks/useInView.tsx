// useInView.js (or .tsx)
'use client';
import { useEffect, useRef, useState } from 'react';

function useInView<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // --- MODIFICATION HERE ---
        // Set isInView based on whether the element is currently intersecting.
        setIsInView(entry.isIntersecting);
        // Do NOT disconnect the observer here if you want it to re-trigger.
        // The observer should remain active to detect changes.
        // --- END MODIFICATION ---
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Clean up function: Disconnect when the component unmounts
    return () => {
      if (ref.current) { // Check if ref.current exists before disconnecting
        observer.unobserve(ref.current); // Use unobserve for specific element
      }
      observer.disconnect(); // Disconnect the observer completely
    };
  }, [threshold]); // Depend on threshold

  return { ref, isInView };
}

export default useInView;