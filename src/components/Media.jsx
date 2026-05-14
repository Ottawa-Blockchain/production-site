import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import styles from './Media.module.css';

import img1 from '../assets/gallery/1.png';
import img2 from '../assets/gallery/2.png';
import img3 from '../assets/gallery/3.png';
import img4 from '../assets/gallery/4.png';
import img5 from '../assets/gallery/5.png';

const Media = () => {
  const [width, setWidth] = useState(0);
  const outerRef = useRef();
  const innerRef = useRef();
  const x = useMotionValue(0);

  const updateWidth = () => {
    if (outerRef.current && innerRef.current) {
      const scrollWidth = innerRef.current.scrollWidth;
      const offsetWidth = outerRef.current.offsetWidth;
      // Calculate the maximum scroll distance
      // If content is smaller than viewport, width is 0 (no scrolling)
      const newWidth = scrollWidth - offsetWidth;
      setWidth(newWidth > 0 ? newWidth : 0);
    }
  };

  useEffect(() => {
    // Initial calculation
    updateWidth();
    
    // Recalculate on resize
    window.addEventListener('resize', updateWidth);
    
    // Recalculate after a short delay to ensure images/layout are stable
    const timeoutId = setTimeout(updateWidth, 100);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timeoutId);
    };
  }, []);
  // Handle wheel events with non-passive listener to properly prevent default scroll
  useEffect(() => {
    const element = outerRef.current;
    if (!element) return;

    const onWheel = (e) => {
      let delta = e.deltaX;
      if (delta === 0) delta = e.deltaY;
      
      // Sync the target with actual position if we were not already controlling the scroll.
      // This handles cases where user dragged/swiped and then uses the wheel.
      if (delta === 0) return;

      // Determine boundaries
      const currentX = x.get();
      const atRightEnd = currentX <= -width + 1;
      const atLeftEnd = currentX >= -1;
      
      const scrollingRight = delta > 0;
      const scrollingLeft = delta < 0;

      // Only scroll horizontally if we aren't at the boundary in that direction
      if ((scrollingRight && !atRightEnd) || (scrollingLeft && !atLeftEnd)) {
        e.preventDefault();
        
        const newX = currentX - delta;
        const clampedX = Math.max(-width, Math.min(0, newX));
        x.set(clampedX);
      }
    };

    // Passive: false is required to use preventDefault()
    element.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      element.removeEventListener('wheel', onWheel);
    };
  }, [width, x]); // Re-bind when width changes

  const images = [
    img1,
    img2,
    img3,
    img4,
    img5
  ];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Event Gallery</h2>
        <p className={styles.subheading}>Moments from our community meetups and workshops.</p>
      </div>
      
      <div 
        ref={outerRef} 
        className={styles.carousel}
      >
        <motion.div 
          ref={innerRef}
          className={styles.innerCarousel}
          style={{ x }}
          drag="x" 
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
          onLayoutAnimationComplete={updateWidth}
        >
          {images.map((src, index) => (
            <div key={index} className={styles.item}>
              <img 
                src={src} 
                alt={`Event ${index + 1}`} 
                className={styles.image} 
                draggable="false"
                onLoad={updateWidth}
              />
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className={styles.dragHint}>
        <span>← Drag to explore →</span>
      </div>
    </section>
  );
};

export default Media;
