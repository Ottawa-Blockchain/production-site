import { motion } from 'framer-motion';
import styles from './Marquee.module.css';

const Marquee = () => {
  const items = [
    "DECENTRALIZATION", "WEB3", "OTTAWA", "BLOCKCHAIN", "COMMUNITY", "INNOVATION", "ETHEREUM", "BITCOIN", "SMART CONTRACTS", "NFT", "DAO", "BUILDERS", "CREATIVES"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
    >
      <div className={styles.marqueeContainer}>
        <motion.div 
          className={styles.track}
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear"
          }}
        >
          {/* Repeat items enough times to fill screen and loop smoothly */}
          {[...items, ...items, ...items, ...items].map((item, index) => (
            <span key={index} className={styles.item}>
              {item} <span className={styles.separator}>•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Marquee;
