import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MouseFollower from '../components/MouseFollower';
import BackgroundElements from '../components/BackgroundElements';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className="app">
      <MouseFollower />
      <Navbar />
      <main className={styles.notFoundContainer}>
        <BackgroundElements />
        <div className={styles.content}>
          <h1 className={styles.errorCode}>404</h1>
          <h2 className={styles.errorMessage}>Block Not Found</h2>
          <p className={styles.errorDescription}>
            The requested resource could not be verified on the chain.
          </p>
          <Link to="/" className={styles.homeButton}>
            Return to Genesis Block
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
