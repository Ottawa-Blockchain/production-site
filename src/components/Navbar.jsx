import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaDiscord, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useScrollShrink } from '../hooks/useScrollShrink';
import styles from './Navbar.module.css';

import logo from '../assets/logo.png';

const Navbar = () => {
  const isShrunk = useScrollShrink(50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Network', href: '#network' },
    { name: 'Events', href: '#events' },
    { name: 'Team', href: '#team' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.nav
      className={`${styles.navbar} ${isShrunk ? styles.shrunk : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="Ottawa Blockchain Logo" className={styles.logoImage} />
          <span className={styles.logoText}>Ottawa <span className={styles.logoAccent}>Blockchain</span></span>
        </div>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={styles.navLink}>
              {link.name}
            </a>
          ))}
        </div>

        <div className={styles.actions}>
          {/* Socials visible when shrunk or on mobile */}
          <AnimatePresence>
            {(isShrunk || isMobile) && (
              <motion.div 
                className={styles.socials}
                initial={{ opacity: 0, width: 0, marginRight: 0 }}
                animate={{ opacity: 1, width: 'auto', marginRight: '1.5rem' }}
                exit={{ opacity: 0, width: 0, marginRight: 0 }}
                transition={{ duration: 0.3 }}
              >
                <a href="https://discord.gg/5M8EwYTAZY" target="_blank" rel="noopener noreferrer" aria-label="Discord"><FaDiscord /></a>
                <a href="https://x.com/ottawabchain" target="_blank" rel="noopener noreferrer" aria-label="X"><FaXTwitter /></a>
                <a href="https://www.linkedin.com/company/ottawa-blockchain" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="https://www.instagram.com/ottawablockchain/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            className={styles.joinButton}
            onClick={() => window.open('https://discord.gg/5M8EwYTAZY', '_blank')}
          >
            Join Now!
          </button>
          
          <button 
            className={styles.hamburger} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={styles.mobileNavLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
