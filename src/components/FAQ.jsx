import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import BackgroundElements from './BackgroundElements';
import styles from './FAQ.module.css';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const questions = [
    { q: "What is Ottawa Blockchain?", a: "We are a community-driven organization focused on connecting blockchain enthusiasts, professionals, and businesses in Ottawa." },
    { q: "How can I join?", a: <>You can join by attending our events, applying to be featured in our network directory, or joining our <a href="https://discord.gg/5M8EwYTAZY" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Discord</a>.</> },
    { q: "Are events free?", a: "All of our meetups are free to attend." },
    { q: "Can I speak at an event?", a: <>Yes! We are always looking for speakers. Please contact us at <a href="mailto:info@ottawablockchain.ca" style={{ textDecoration: 'underline', color: 'inherit' }}>info@ottawablockchain.ca</a> with your proposal.</> },
    { q: "Do you offer training?", a: <>We host workshops and are looking to partner with organizations and/or institutions to provide blockchain info sessions. Contact <a href="mailto:info@ottawablockchain.ca" style={{ textDecoration: 'underline', color: 'inherit' }}>info@ottawablockchain.ca</a> for more.</> },
    { q: "How can my business get involved?", a: <>Businesses can sponsor events, join our network, or partner with us on initiatives. Reach out to <a href="mailto:info@ottawablockchain.ca" style={{ textDecoration: 'underline', color: 'inherit' }}>info@ottawablockchain.ca</a>.</> },
  ];

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.section} style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundElements />
      <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <h2 className={styles.heading}>FAQ</h2>
        </ScrollReveal>
        <div className={styles.accordion}>
          {questions.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className={styles.item}>
                <button 
                  className={styles.question}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={expandedIndex === index}
                >
                  {item.q}
                  <span className={styles.icon}>{expandedIndex === index ? '−' : '+'}</span>
                </button>
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={styles.answerWrapper}
                    >
                      <div className={styles.answer}>
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
