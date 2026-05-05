import { motion } from 'framer-motion';
import { FaLinkedin, FaDiscord, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Blobs from './Blobs';
import BlockchainCube from './BlockchainCube';
import styles from './Hero.module.css';
import silhouette from '../assets/silhouette.svg';
import logo from '../assets/logo.png';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.clippedBg}>
        <Blobs />
        {/* Grid Texture Overlay */}
        <div className={styles.gridOverlay} />
      </div>
      
      {/* Skyline Silhouette Placeholder */}
      <motion.div 
        className={styles.skyline}
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img src={silhouette} alt="Ottawa Skyline" className={styles.skylineSvg} />
      </motion.div>

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src={logo} alt="Ottawa Blockchain Logo" className={styles.logo} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className={styles.title}>
            Welcome to <br />
            <span className={styles.highlight}>Ottawa Blockchain</span>
          </h1>
        </motion.div>
        
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Canada’s capital community of businesses, builders, and creatives.
        </motion.p>

        <motion.button
          className={styles.joinButton}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://discord.gg/5M8EwYTAZY', '_blank')}
        >
          Join the Community
        </motion.button>
      </div>

      {/* Left Side Social/Info Bar */}
      <motion.div 
        className={styles.leftSidebar}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className={styles.sidebarLine}></div>
        <div className={styles.socialLinks}>
          <a href="https://discord.gg/5M8EwYTAZY" className={styles.socialLink} aria-label="Discord"><FaDiscord /></a>
          <a href="https://x.com/ottawabchain" className={styles.socialLink} aria-label="X"><FaXTwitter /></a>
          <a href="https://www.linkedin.com/company/ottawa-blockchain" className={styles.socialLink} aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://www.instagram.com/ottawablockchain/" className={styles.socialLink} aria-label="Instagram"><FaInstagram /></a>
        </div>
        <div className={styles.sidebarText}>EST. 2025</div>
      </motion.div>

      {/* Creative HUD Element */}
      <motion.div 
        className={styles.locationHud}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <div className={styles.hudRingOuter}></div>
        <div className={styles.hudRingInner}></div>
        <div className={styles.hudDot}></div>
        <div className={styles.hudContent}>
          <div className={styles.hudLabel}>REGION</div>
          <div className={styles.hudValue}>OTTAWA_CA</div>
          <div className={styles.hudCoords}>45.42°N . 75.69°W</div>
        </div>
      </motion.div>

      {/* 3D Blockchain Cube Animation */}
      <div className={styles.cubeWrapper}>
        <BlockchainCube />
      </div>
    </section>
  );
};

export default Hero;
