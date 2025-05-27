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

  const handleContinue = () => {
    const usernameRaw = localStorage.getItem('username');

    if (!usernameRaw) {
      alert("You're not logged in.");
      return;
    }
    
    const username = localStorage.getItem("username")?.toLowerCase().trim();
const key = `greenhouse-${username}`;
const saved = localStorage.getItem(key);

console.log("Searching for:", key);
console.log("Found:", saved);


    if (!saved) {
      alert("No greenhouse data found for your account.");
      return;
    }

    try {
      const parsed = JSON.parse(saved);

      setGreenhouse({
        greenhouseName: parsed.greenhouseName,
        plantType: parsed.plantType,
        plantSpecies: parsed.plantSpecies,
        plantingDate: parsed.plantingDate,
        growthStage: parsed.growthStage
      });

      localStorage.setItem("greenhouseId", parsed.greenhouseId.toString());
      localStorage.setItem("plantSpecies", parsed.plantSpecies);

      navigate('/app/dashboard');
    } catch (err) {
      console.error("❌ Failed to parse saved greenhouse:", err);
      alert("Something went wrong loading your greenhouse.");
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
