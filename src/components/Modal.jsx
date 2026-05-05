import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, children, maxWidth, fullScreen = false }) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={`${styles.modalContainer} ${fullScreen ? styles.fullScreen : ''}`}
            style={maxWidth && !fullScreen ? { maxWidth } : undefined}
            initial={fullScreen ? { opacity: 0, scale: 0.98 } : { opacity: 0, scale: 0.9, y: 20 }}
            animate={fullScreen ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={fullScreen ? { opacity: 0, scale: 0.98 } : { opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button className={styles.closeButton} onClick={onClose}>
              &times;
            </button>
            <div className={styles.content}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
