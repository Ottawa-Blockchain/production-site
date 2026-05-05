import { motion } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import BackgroundElements from './BackgroundElements';
import styles from './TeamGrid.module.css';

const TeamGrid = () => {
  const teamMembers = [
    { 
      id: 1, 
      name: 'Nolan Druid', 
      role: 'Operations', 
      bio: '',
      linkedin: 'https://www.linkedin.com/in/nolandruid/'
    },
    { 
      id: 2, 
      name: 'Aivan Bolambao', 
      role: 'Strategy & Growth', 
      bio: '',
      linkedin: 'https://www.linkedin.com/in/ambassadoraivan/'
    },
    { 
      id: 3, 
      name: 'Michael Weatherhead', 
      role: 'Strategic Advisor', 
      bio: '',
      linkedin: 'https://www.linkedin.com/in/managementconsultant/'
    },
    {
      id: 4, 
      name: 'Karim Saadeh', 
      role: 'Event Planning Advisor', 
      bio: '',
      linkedin: 'https://www.linkedin.com/in/karimsaadeh/'
    },
    { 
      id: 5, 
      name: 'Nathan Tan', 
      role: 'Technology', 
      bio: '',
      linkedin: 'https://www.linkedin.com/in/nathantann/'
    },
    { 
      id: 6, 
      name: 'Adrian Tu', 
      role: 'Marketing', 
      bio: '',
      linkedin: 'https://www.linkedin.com/in/adriantu323/'
    },
    { 
      id: 7, 
      name: 'Aiden Dupuis', 
      role: 'Art & Design', 
      bio: '',
      linkedin: 'https://www.linkedin.com/in/aiden-dupuis-3b8354244/'
    },
    { 
      id: 8, 
      name: 'Noah Bender', 
      role: 'Strategy & Marketing', 
      bio: '',
      linkedin: 'https://www.linkedin.com/in/noah-bender-730a47278/'
    },
  ];

  return (
    <section id="team" className={styles.section} style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundElements />
      <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <h2 className={styles.heading}>Team</h2>
        </ScrollReveal>
        <div className={styles.grid}>
          {teamMembers.map((member, index) => (
            <ScrollReveal key={member.id} delay={index * 0.05}>
              <motion.div 
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TeamGrid;
