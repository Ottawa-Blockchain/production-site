import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import BackgroundElements from './BackgroundElements';
import styles from './Events.module.css';
import eventImages from '../assets/events/imageLoader';
import eventsData from '../assets/events/events.json';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Map image filenames to imported images
  const upcomingEvents = eventsData.upcomingEvents.map(event => ({
    ...event,
    image: eventImages[event.image]
  }));

  const pastEvents = eventsData.pastEvents.map(event => ({
    ...event,
    image: eventImages[event.image]
  }));

  return (
    <section id="events" className={styles.section} style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundElements />
      <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <h2 className={styles.heading}>Events</h2>
        </ScrollReveal>
        
        <ScrollReveal>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'upcoming' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Events
              {activeTab === 'upcoming' && <motion.div className={styles.underline} layoutId="underline" />}
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'past' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('past')}
            >
              Past Events
              {activeTab === 'past' && <motion.div className={styles.underline} layoutId="underline" />}
            </button>
          </div>
        </ScrollReveal>

        <div className={styles.content}>
          <AnimatePresence mode="wait">
            {activeTab === 'upcoming' ? (
              <motion.div 
                key="upcoming"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={styles.upcomingGrid}
              >
                {upcomingEvents.map(event => (
                  <div key={`${event.title}-${event.date}-${event.image}`} className={styles.eventCard}>
                    {event.partnerEvent && (
                      <div className={styles.partnerBanner}>Partner Event</div>
                    )}
                    {event.image && <img src={event.image} alt={event.title} className={styles.eventImage} />}
                    <div className={styles.eventDetails}>
                      <span className={styles.eventDate}>{event.date}</span>
                      <h3 className={styles.eventTitle}>{event.title}</h3>
                      <p className={styles.eventBlurb}>{event.blurb}</p>
                      <button 
                        className={styles.rsvpButton}
                        onClick={() => event.rsvpLink && window.open(event.rsvpLink, '_blank')}
                        disabled={!event.rsvpLink}
                      >
                        {event.rsvpLink ? 'RSVP' : 'Details Coming Soon!'}
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="past"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={styles.pastGrid}
              >
                {pastEvents.map(event => (
                  <div key={`${event.title}-${event.date}-${event.image}`} className={styles.eventCard}>
                    {event.partnerEvent && (
                      <div className={styles.partnerBanner}>Partner Event</div>
                    )}
                    {event.image && <img src={event.image} alt={event.title} className={styles.eventImage} />}
                    <div className={styles.eventDetails}>
                      <span className={styles.eventDate}>{event.date}</span>
                      <h3 className={styles.eventTitle}>{event.title}</h3>
                      {event.blurb && <p className={styles.eventBlurb}>{event.blurb}</p>}
                      {(() => {
                        const eventUrl = event.link || event.rsvpLink;

                        return (
                      <button
                        className={styles.rsvpButton}
                        onClick={() => eventUrl && window.open(eventUrl, '_blank')}
                        disabled={!eventUrl}
                      >
                        View Recap
                      </button>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Events;
