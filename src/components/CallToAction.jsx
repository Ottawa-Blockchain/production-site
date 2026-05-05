import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import styles from './CallToAction.module.css';

const CallToAction = () => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <ScrollReveal>
          <h2 className={styles.heading}>What are you waiting for?</h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <motion.button
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://discord.gg/5M8EwYTAZY', '_blank')}
          >
            Join the Community
          </motion.button>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CallToAction;
