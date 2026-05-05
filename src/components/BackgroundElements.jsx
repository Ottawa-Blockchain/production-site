import { motion } from 'framer-motion';
import styles from './BackgroundElements.module.css';

const BackgroundElements = () => {
  return (
    <>
      <div className={styles.pattern} />
      
      {/* Floating Geometric Shapes */}
      <motion.div 
        className={styles.floatingShape}
        style={{ top: '10%', left: '5%', width: '120px', height: '120px', borderRadius: '20px', borderWidth: '4px' }}
        animate={{ 
          rotate: 360, 
          y: [0, 60, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className={styles.floatingShape}
        style={{ bottom: '20%', right: '10%', width: '180px', height: '180px', borderColor: 'var(--ocb-secondary)', borderRadius: '50%', borderWidth: '4px' }}
        animate={{ 
          rotate: -360, 
          y: [0, -80, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className={styles.floatingShape}
        style={{ top: '40%', right: '25%', width: '80px', height: '80px', borderColor: 'var(--ocb-dark)', borderWidth: '4px' }}
        animate={{ 
          rotate: 180, 
          y: [0, 100, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Crypto Symbols */}
      <motion.div
        className={styles.cryptoSymbol}
        style={{ top: '15%', right: '15%', fontSize: '8rem' }}
        animate={{ y: [0, -40, 0], opacity: [0.1, 0.25, 0.1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        ₿
      </motion.div>
      <motion.div
        className={styles.cryptoSymbol}
        style={{ bottom: '30%', left: '10%', fontSize: '6rem', color: 'var(--ocb-secondary)' }}
        animate={{ y: [0, 50, 0], opacity: [0.1, 0.25, 0.1], rotate: [0, -15, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        Ξ
      </motion.div>
    </>
  );
};

export default BackgroundElements;
