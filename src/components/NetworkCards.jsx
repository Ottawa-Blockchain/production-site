import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';
import ScrollReveal from './ScrollReveal';
import BackgroundElements from './BackgroundElements';
import styles from './NetworkCards.module.css';
import alexComeauPhoto from '../assets/network/alexcomeau.jpg';

const NetworkCards = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  useEffect(() => {
    if (isJoinModalOpen) {
      const d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}else{v();}
    }
  }, [isJoinModalOpen]);

  const categories = [
    {
      id: 'businesses',
      title: 'Businesses',
      description: 'Entrepreneurs and enterprises integrating blockchain solutions.',
      icon: <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
    },
    {
      id: 'builders',
      title: 'Builders',
      description: 'Developers, engineers, and architects constructing the protocols of tomorrow.',
      icon: <path d="M2 22h20V2L2 22zm18-2H4.83L19 5.83V20zM8 12h3v3H8zm5 0h3v3h-3z" />
    },
    {
      id: 'creators',
      title: 'Creators',
      description: 'Creators and visionaries defining the aesthetic of the digital renaissance.',
      icon: <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    }
  ];

  const handleOpenList = (category) => {
    setSelectedCategory(category);
    setIsListModalOpen(true);
  };

  const partnerBusinesses = [
    {
      id: 'aurora-ledger',
      name: 'Happy Fish Elgin',
      ownerName: 'Alex Comeau',
      location: '330 Elgin St, Ottawa, ON K2P 1M6',
      shortDescription: 'Happy Fish is Ottawa\'s trendiest spot, and as soon as you walk in, you\'ll understand why.',
      ownerBio: 'Alex has built reputation as a go-to host for blockchain and crypto events, welcomoing countless communitied through the doors over the years.',
      ownerInitials: 'AC',
      bannerImageSrc: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAweqYa3lRcrlAety36GSKVUWy0fKicvm0_DDZT7AuWVqkzdlnjjLY7oC0WGfnGcKkH7WjwCNPRO64j6V2DoWZ4gcbbeuN6Dj-bVPpixslQV2_hhE2nCL90pjH0XoiFmSmOrcya2uk=s1360-w1360-h1020-rw',
      ownerPhotoSrc: alexComeauPhoto,
    },
  ];

  const openBusinessProfile = (business) => {
    setSelectedBusiness(business);
    setIsBusinessModalOpen(true);
  };

  return (
    <section id="network" className={styles.section} style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundElements />
      <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <h2 className={styles.heading}>Our Network</h2>
        </ScrollReveal>
        <div className={styles.grid}>
          {categories.map((cat, index) => (
            <ScrollReveal key={cat.id} delay={index * 0.1}>
              <motion.div
                className={styles.card}
                whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(206, 57, 55, 0.15)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className={styles.icon}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                    {cat.icon}
                  </svg>
                </div>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
                <p className={styles.cardDesc}>{cat.description}</p>
                <button 
                  className={styles.ctaButton}
                  onClick={() => handleOpenList(cat)}
                >
                  View our {cat.title}
                </button>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal>
          <div className={styles.joinContainer}>
            <button 
              className={styles.joinButton}
              onClick={() => setIsJoinModalOpen(true)}
            >
              Join our network
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Join Modal */}
      <Modal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)}>
        <div className={styles.modalContent}>
          <h3>Join the Network</h3>
          <p>Fill out the form below to join Ottawa Blockchain.</p>
          <div className={styles.typeformPlaceholder}>
            <iframe data-tally-src="https://tally.so/embed/EklNol?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="100" frameBorder="0" marginHeight="0" marginWidth="0" title="Network Application"></iframe>
          </div>
        </div>
      </Modal>

      {/* List Filter Modal */}
      <Modal isOpen={isListModalOpen} onClose={() => setIsListModalOpen(false)} maxWidth="1200px">
        <div className={styles.largeModalContent}>
          <div className={styles.listHeader}>
             <h3>Viewing: <span className={styles.highlight}>{selectedCategory?.title}</span></h3>
             <p>Explore our community of {selectedCategory?.title.toLowerCase()}.</p>
          </div>
          
          <div className={styles.filterTabs}>
             {categories.map((cat) => (
               <button 
                 key={cat.id}
                 className={`${styles.filterTab} ${selectedCategory?.id === cat.id ? styles.activeFilter : ''}`}
                 onClick={() => handleOpenList(cat)}
               >
                 {cat.title}
               </button>
             ))}
          </div>

          <div className={styles.listContainer}>
             {selectedCategory?.id === 'businesses' ? (
               <div className={styles.businessList}>
                   {partnerBusinesses.map((business, index) => (
                     <ScrollReveal key={business.id} delay={index * 0.08}>
                       <motion.button
                         type="button"
                         className={styles.businessCard}
                         whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(13, 17, 23, 0.08)' }}
                         transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                         onClick={() => openBusinessProfile(business)}
                       >
                         <div className={styles.businessThumbnail} aria-hidden="true">
                           <span className={styles.thumbnailText}>Tap to open</span>
                         </div>

                         <div className={styles.businessCardBody}>
                           <h4 className={styles.businessName}>{business.name}</h4>
                           <p className={styles.businessDescription}>{business.location}</p>
                           <div className={styles.cardFooterRow}>
                             <span className={styles.cardOwner}>{business.ownerName}</span>
                             <span className={styles.cardArrow} aria-hidden="true">+</span>
                           </div>
                         </div>
                       </motion.button>
                     </ScrollReveal>
                   ))}
               </div>
             ) : (
               <div className={styles.emptyState}>
                 <div className={styles.emptyIcon}>
                   <svg viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
                     {selectedCategory?.icon}
                   </svg>
                 </div>
                 <p>No {selectedCategory?.title.toLowerCase()} listed yet.</p>
                 <button 
                   className={styles.smallJoinButton}
                   onClick={() => {
                     setIsListModalOpen(false);
                     setIsJoinModalOpen(true);
                   }}
                 >
                   Be the first to join!
                 </button>
               </div>
             )}
          </div>
        </div>
      </Modal>

      <Modal isOpen={isBusinessModalOpen} onClose={() => setIsBusinessModalOpen(false)} fullScreen>
        {selectedBusiness && (
          <div className={styles.fullScreenBusinessView}>
            <div className={styles.businessModalHeader}>
              <div>
                <h3 className={styles.businessModalTitle}>{selectedBusiness.name}</h3>
                <p className={styles.businessModalSubtitle}>{selectedBusiness.location}</p>
              </div>
            </div>

            <div className={styles.fullScreenLayout}>
              <div className={styles.businessImageFrame}>
                <img
                  className={styles.businessImageMedia}
                  src={selectedBusiness.bannerImageSrc}
                  alt={`${selectedBusiness.name} banner`}
                />
                <div className={styles.imageCaption}>{selectedBusiness.shortDescription}</div>
              </div>

              <div className={styles.ownerPanel}>
                <div className={styles.ownerAvatar}>
                  <img
                    className={styles.ownerPhoto}
                    src={selectedBusiness.ownerPhotoSrc}
                    alt={`${selectedBusiness.ownerName} profile`}
                  />
                </div>
                <div>
                  <p className={styles.ownerLabel}>Owner</p>
                  <h4 className={styles.ownerName}>{selectedBusiness.ownerName}</h4>
                  <p className={styles.ownerBio}>{selectedBusiness.ownerBio}</p>
                </div>

                <div className={styles.detailGrid}>
                  <div className={styles.detailPanel}>
                    <span className={styles.detailLabel}>Business location</span>
                    <p className={styles.detailValue}>{selectedBusiness.location}</p>
                  </div>
                  <div className={styles.detailPanel}>
                    <span className={styles.detailLabel}>Owner name</span>
                    <p className={styles.detailValue}>{selectedBusiness.ownerName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default NetworkCards;
