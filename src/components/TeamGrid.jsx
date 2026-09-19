import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import BackgroundElements from './BackgroundElements';
import styles from './TeamGrid.module.css';

// Team rosters by academic year. The first entry is the current team and is
// shown by default; earlier years can be viewed with the toggle.
const teamsByYear = {
  '2026-2027': [
    {
      id: 1,
      name: 'Michael Barbeau',
      role: 'Advisor',
      bio: '',
      // TODO: confirm LinkedIn URL
      linkedin: '',
    },
    {
      id: 2,
      name: 'Nolan Druid',
      role: 'Operations',
      bio: '',
      linkedin: 'https://www.linkedin.com/in/nolandruid/',
    },
    {
      id: 3,
      name: 'Gregory Sandstrom',
      role: 'Communications',
      bio: '',
      linkedin: 'https://www.linkedin.com/in/gregory-sandstrom/',
    },
    {
      id: 4,
      name: 'Brad Stewart',
      role: 'Branding & Promotions',
      bio: '',
      // TODO: confirm LinkedIn URL
      linkedin: '',
    },
  ],
  '2025-2026': [
    {
      id: 1,
      name: 'Nolan Druid',
      role: 'Operations',
      bio: '',
      linkedin: 'https://www.linkedin.com/in/nolandruid/',
    },
    {
      id: 2,
      name: 'Aivan Bolambao',
      role: 'Strategy & Growth',
      bio: '',
      linkedin: 'https://www.linkedin.com/in/ambassadoraivan/',
    },
    {
      id: 4,
      name: 'Karim Saadeh',
      role: 'Advisor',
      bio: '',
      linkedin: 'https://www.linkedin.com/in/karimsaadeh/',
    },
    {
      id: 5,
      name: 'Nathan Tan',
      role: 'Technology',
      bio: '',
      linkedin: 'https://www.linkedin.com/in/nathantann/',
    },
    {
      id: 6,
      name: 'Adrian Tu',
      role: 'Marketing',
      bio: '',
      linkedin: 'https://www.linkedin.com/in/adriantu323/',
    },
    {
      id: 7,
      name: 'Aiden Dupuis',
      role: 'Art & Design',
      bio: '',
      linkedin: 'https://www.linkedin.com/in/aiden-dupuis-3b8354244/',
    },
    {
      id: 8,
      name: 'Noah Bender',
      role: 'Strategy & Marketing',
      bio: '',
      linkedin: 'https://www.linkedin.com/in/noah-bender-730a47278/',
    },
  ],
};

// Newest year first — index 0 is the default (current) team.
const teamYears = Object.keys(teamsByYear);

const TeamGrid = () => {
  const [activeYear, setActiveYear] = useState(teamYears[0]);
  const teamMembers = teamsByYear[activeYear];

  return (
    <section id="team" className={styles.section} style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundElements />
      <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <h2 className={styles.heading}>Team</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className={styles.toggle} role="tablist" aria-label="Team by year">
            {teamYears.map((year) => {
              const isActive = year === activeYear;
              return (
                <button
                  key={year}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.toggleButton} ${isActive ? styles.toggleButtonActive : ''}`}
                  onClick={() => setActiveYear(year)}
                >
                  {year.replace('-', '–')}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            className={styles.grid}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className={styles.card}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className={styles.topAccent}></div>
                <div className={styles.cardHeader}>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.bio}>{member.bio}</p>
                </div>

                <div className={styles.cardFooter}>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkedinButton}
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <FaLinkedinIn />
                      <span className={styles.label}>LinkedIn</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TeamGrid;
