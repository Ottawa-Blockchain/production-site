import styles from './Footer.module.css';
import logo from '../assets/logo.png';
import { FaDiscord, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.columnLocked}>
            <div className={styles.brand}>
              <div className={styles.logoContainer}>
                <img src={logo} alt="Ottawa Blockchain Logo" className={styles.logoImage} />
                <h3>Ottawa <span className={styles.brandAccent}>Blockchain</span></h3>
              </div>
              <p className={styles.mission}>Building the decentralized future in the capital.</p>
            </div>
          </div>

          {/* Links Column */}
          <div className={styles.column}>
            <h4>Menu</h4>
            <div className={styles.links}>
              <a href="#about">About</a>
              <a href="#network">Network</a>
              <a href="#events">Events</a>
              <a href="#team">Team</a>
            </div>
          </div>

          {/* Socials Column */}
          <div className={styles.column}>
            <h4>Connect</h4>
            <div className={styles.socials}>
              <a href="https://discord.gg/5M8EwYTAZY" aria-label="Discord">
                <FaDiscord /> <span>Discord</span>
              </a>
              <a href="https://x.com/ottawabchain" aria-label="X">
                <FaXTwitter /> <span>X</span>
              </a>
              <a href="https://www.linkedin.com/company/ottawa-blockchain" aria-label="LinkedIn">
                <FaLinkedin /> <span>LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/ottawablockchain/" aria-label="Instagram">
                <FaInstagram /> <span>Instagram</span>
              </a>
              <a href="mailto:info@ottawablockchain.ca" aria-label="Email">
                <FaEnvelope /> <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Ottawa Blockchain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
