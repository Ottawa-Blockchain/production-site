import { motion, useReducedMotion } from 'framer-motion';

const Blobs = () => {
  const shouldReduceMotion = useReducedMotion();

  const animateBlob1 = shouldReduceMotion ? {} : {
    y: [0, -50, 0],
    x: [0, 30, 0],
    scale: [1, 1.1, 1],
  };

  const animateBlob2 = shouldReduceMotion ? {} : {
    y: [0, 60, 0],
    x: [0, -40, 0],
    scale: [1, 1.2, 1],
  };

  const animateBlob3 = shouldReduceMotion ? {} : {
    scale: [1, 1.3, 1],
    opacity: [0.5, 0.8, 0.5],
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      {/* Blob 1 - Crimson */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(206,57,55,0.4) 0%, rgba(206,57,55,0) 70%)',
          filter: 'blur(40px)',
        }}
        animate={animateBlob1}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Blob 2 - Gold */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,164,76,0.3) 0%, rgba(200,164,76,0) 70%)',
          filter: 'blur(50px)',
        }}
        animate={animateBlob2}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Blob 3 - Mixed */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(206,57,55,0.2) 0%, rgba(200,164,76,0.2) 100%)',
          filter: 'blur(30px)',
          transform: 'translate(-50%, -50%)'
        }}
        animate={animateBlob3}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default Blobs;
