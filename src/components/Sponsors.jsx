import ScrollReveal from './ScrollReveal';
import BackgroundElements from './BackgroundElements';
import styles from './Sponsors.module.css';

import bafLogo from '../assets/sponsors/baflogo.png';
import ambassadorsLogo from '../assets/sponsors/ambassadorslogo.png';
import nearLogo from '../assets/sponsors/nearlogo.png';
import jackalLogo from '../assets/sponsors/jackallogo.png';
import coinbaseLogo from '../assets/sponsors/coinbaselogo.png';
import swcLogo from '../assets/sponsors/swclogo.png';
import unblockedLogo from '../assets/sponsors/unblockedlogo.png';

const sponsors = [
  {
    id: 1,
    name: 'Coinbase',
    logo: coinbaseLogo,
    url: 'https://www.coinbase.com/',
  },
  {
    id: 2,
    name: 'Stand With Crypto',
    logo: swcLogo,
    url: 'https://www.standwithcrypto.org/',
  },
  {
    id: 3,
    name: 'Jackal',
    logo: jackalLogo,
    url: 'https://www.jackalprotocol.com/',
  },
  {
    id: 4,
    name: 'Near AI',
    logo: nearLogo,
    url: 'https://near.ai/',
  },
  {
    id: 5,
    name: 'Ambassadors',
    logo: ambassadorsLogo,
    url: '',
  },
  {
    id: 6,
    name: 'Blockchain Acceleration Foundation',
    logo: bafLogo,
    url: 'https://www.blockchainacceleration.org/',
  },
  {
    id: 7,
    name: 'Unblocked Consulting',
    logo: unblockedLogo,
    url: 'https://www.unblockedconsulting.com/',
  },
];

const Sponsors = () => {
  return (
    <section id="sponsors" className={styles.section} style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundElements />
      <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <h2 className={styles.heading}>Our Sponsors & Partners</h2>
          <p className={styles.subheading}>
            Organizations helping Ottawa Blockchain create practical education, stronger networks, and better onchain opportunities.
          </p>
        </ScrollReveal>

        <div className={styles.grid}>
          {sponsors.map((sponsor, index) => (
            <ScrollReveal key={sponsor.id} delay={index * 0.06} width="auto">
              <div className={styles.logoCell}>
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.logoLink}
                >
                  <img src={sponsor.logo} alt={`${sponsor.name} logo`} className={styles.logo} />
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Sponsors;