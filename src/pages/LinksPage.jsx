import { Link, useNavigate } from 'react-router-dom';
import { FaDiscord, FaLinkedin, FaInstagram, FaGlobe, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiLightningBolt } from "react-icons/hi";
import logo from '../assets/logo.png'; 
import styles from './LinksPage.module.css';

const LinksPage = () => {
  const navigate = useNavigate();

  const handleApplicationClick = (e) => {
    e.preventDefault();
    navigate('/application');
  };


  const links = [
    {
        title: 'View our Events',
        url: 'https://luma.com/user/ottawabchain',
        icon: <FaCalendarAlt />,
        className: styles.luma
    },
    {
      title: 'Join our Discord Community',
      url: 'https://discord.gg/5M8EwYTAZY',
      icon: <FaDiscord />,
      className: styles.discord
    },
    {
      title: 'Follow us on X',
      url: 'https://x.com/ottawabchain',
      icon: <FaXTwitter />,
      className: styles.twitter
    },
    {
      title: 'Connect on LinkedIn',
      url: 'https://www.linkedin.com/company/ottawa-blockchain',
      icon: <FaLinkedin />,
      className: styles.linkedin
    },
    {
      title: 'Follow on Instagram',
      url: 'https://www.instagram.com/ottawablockchain/',
      icon: <FaInstagram />,
      className: styles.instagram
    },
    {
      title: 'Contact Us',
      url: 'mailto:info@ottawablockchain.ca',
      icon: <FaEnvelope />,
      className: styles.email
    },  ];

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="Ottawa Blockchain" className={styles.logoImage} />
        </div>
        <h1 className={styles.title}>Ottawa Blockchain</h1>
        <p className={styles.subtitle}>Building the decentralized future in the capital.</p>
      </div>

      <div className={styles.linksContainer}>
        <a
          href="https://forms.gle/xH2RANmKvQRFkDfKA"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.linkItem} ${styles.featuredLink}`}
        >
          <span className={styles.linkIcon}><HiLightningBolt /></span>
          Complimentary Toronto Futurist Ticket
        </a>

        {/* Featured Application Link */}
        <Link 
          to="/application" 
          onClick={handleApplicationClick}
          className={`${styles.linkItem} ${styles.featuredLink}`}
        >
          <span className={styles.linkIcon}><HiLightningBolt /></span>
          Apply to Join our Network
        </Link>

        {/* Social Links */}
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.linkItem} ${link.className}`}
          >
            <span className={styles.linkIcon}>{link.icon}</span>
            {link.title}
          </a>
        ))}

        {/* Home Link as Button */}
        <Link to="/" className={styles.linkItem}>
            <span className={styles.linkIcon}><FaGlobe /></span>
            Visit our Website
        </Link>
      </div>
      
      {/* Footer removed since link is now in main list */}
      <div className={styles.footer}>
         <p>&copy; {new Date().getFullYear()} Ottawa Blockchain.</p>
      </div>

    </div>
  );
};

export default LinksPage;
