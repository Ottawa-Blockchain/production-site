import ScrollReveal from './ScrollReveal';
import styles from './About.module.css';

const About = () => {
  return (
    <section id="about" className={styles.section}>
      <ScrollReveal>
        <h2 className={styles.heading}>About Us</h2>
        <p className={styles.text}>
          Our mission is to be the leading community to unify the capital’s blockchain scene into one trusted hub where anyone curious about, working in, or building with blockchain can connect. Ottawa Blockchain aims to help people confidently adopt this technology, support real projects,  and stay actively involved in the public and policy conversations that will shape its mainstream impact in Canada.
        </p>
      </ScrollReveal>
    </section>
  );
};

export default About;
