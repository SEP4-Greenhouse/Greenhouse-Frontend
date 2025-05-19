import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGreenhouse } from './GreenhouseContext';
import styles from './postLogin.module.css';

const PostLoginPage = () => {
  const navigate = useNavigate();
  const { setGreenhouse } = useGreenhouse();

  useEffect(() => {
    const root = document.getElementById('post-login-root');
    if (root) {
      root.classList.add(styles.fadeIn);
    }
  }, []);

  // continue button logic
  const handleContinue = () => {
    const user = localStorage.getItem('username');
    if (user) {
      const saved = localStorage.getItem(`greenhouse-${user}`);
      if (saved) {
        setGreenhouse(JSON.parse(saved));
        navigate('/app/dashboard');
      } else {
        alert("No greenhouse data found for your account.");
      }
    } else {
      alert("You're not logged in.");
    }
  };

  return (
    <div className={styles.container} id="post-login-root">
      <h1 className={styles.title}>🌿 Greenhouse</h1>
      <div className={styles.buttons}>
        <div className={styles.buttonBlock}>
          <button className={styles.button} onClick={handleContinue}>
            Continue
          </button>
          <p className={styles.subtext}>Load your last Greenhouse</p>
        </div>
        <div className={styles.buttonBlock}>
          <button className={styles.button} onClick={() => navigate('/create-greenhouse')}>
            Create
          </button>
          <p className={styles.subtext}>Start with a new Greenhouse</p>
        </div>
      </div>
    </div>
  );
};

export default PostLoginPage;
