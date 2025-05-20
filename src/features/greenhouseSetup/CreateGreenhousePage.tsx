import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './createGreenhouse.module.css';
import GrowthStageSelector from './components/GrowthStageSelector';
import { useGreenhouse } from './GreenhouseContext';

const CreateGreenhousePage = () => {
  const [greenhouseName, setGreenhouseName] = useState('');
  const [plantType, setPlantType] = useState('');
  const [plantSpecies, setPlantSpecies] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const { setGreenhouse } = useGreenhouse();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!greenhouseName || !plantType || !plantSpecies || !plantingDate || !selectedStage) {
      alert('Please fill all fields and select a growth stage.');
      return;
    }

    const newGreenhouse = {
      greenhouseName,
      plantType,
      plantSpecies,
      plantingDate,
      growthStage: selectedStage,
    };

    setGreenhouse(newGreenhouse);

    const user = localStorage.getItem('username'); // store this at login
    if (user) {
      localStorage.setItem(`greenhouse-${user}`, JSON.stringify(newGreenhouse));
    }

    navigate("/app/dashboard");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>🌿 Create Your New Greenhouse</h1>

      <div className={styles.content}>
        {/* left side */}
        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <label>Greenhouse Name</label>
            <input
              type="text"
              value={greenhouseName}
              onChange={(e) => setGreenhouseName(e.target.value)}
              placeholder="e.g., My Greenhouse"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Type of Plant</label>
            <input
              type="text"
              value={plantType}
              onChange={(e) => setPlantType(e.target.value)}
              placeholder="e.g., Vegetable"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Plant Species</label>
            <input
              type="text"
              value={plantSpecies}
              onChange={(e) => setPlantSpecies(e.target.value)}
              placeholder="e.g., Tomato"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Planting Date</label>
            <input
              type="date"
              value={plantingDate}
              onChange={(e) => setPlantingDate(e.target.value)}
            />
          </div>
        </div>

        {/* right side */}
        <div className={styles.stageContainer}>
          <h2 className={styles.stageTitle}>Select Growth Stage</h2>
          <GrowthStageSelector
            selectedStage={selectedStage}
            onSelect={setSelectedStage}
          />
        </div>
      </div>

      <button className={styles.submitButton} onClick={handleSubmit}>Create Greenhouse</button>
    </div>
  );
};

export default CreateGreenhousePage;
