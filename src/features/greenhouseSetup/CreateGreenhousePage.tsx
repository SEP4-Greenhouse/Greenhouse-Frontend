import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './createGreenhouse.module.css';
import GrowthStageSelector from './components/GrowthStageSelector';
import { useGreenhouse } from './GreenhouseContext';
import { useCreateGreenhouse } from './useCreateGreenhouse';

const CreateGreenhousePage = () => {
  const [greenhouseName, setGreenhouseName] = useState('');
  const [plantType, setPlantType] = useState('');
  const [plantSpecies, setPlantSpecies] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const { setGreenhouse } = useGreenhouse();
  const { createFullGreenhouse, loading, error } = useCreateGreenhouse();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!greenhouseName || !plantType || !plantSpecies || !plantingDate || !selectedStage) {
      alert("Please fill all fields and select a growth stage.");
      return;
    }

    const userIdRaw = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const userId = userIdRaw ? Number(userIdRaw) : null;

    if (!userId || !username || isNaN(userId)) {
      alert("User not logged in or user ID invalid.");
      return;
    }

    const greenhouse = {
      name: greenhouseName,
      plantType,
      userId,
    };

    const plant = {
      species: plantSpecies,
      plantingDate: new Date(plantingDate).toISOString(),
      growthStage: selectedStage,
    };

    try {
  // ✅ Destructure both returned IDs
  const { greenhouseId, plantId } = await createFullGreenhouse(greenhouse, plant);

  const greenhouseData = {
    greenhouseId,
    greenhouseName,
    plantType,
    plantSpecies,
    plantingDate,
    growthStage: selectedStage,
  };

  // ✅ Save in global state
  setGreenhouse(greenhouseData);

  // ✅ Save in localStorage
  localStorage.setItem("greenhouseId", greenhouseId.toString());
  localStorage.setItem("plantId", plantId.toString()); // 👈 This is critical
  localStorage.setItem("plantSpecies", plantSpecies);
  localStorage.setItem(`greenhouse-${username}`, JSON.stringify(greenhouseData));

  console.log("🧪 Final localStorage check:", {
  greenhouseId: localStorage.getItem("greenhouseId"),
  plantId: localStorage.getItem("plantId"),
});

  // ✅ DELAY navigation so storage is guaranteed
setTimeout(() => {
    navigate("/app/dashboard");
  }, 50);
} catch (e) {
  console.error("❌ Greenhouse creation failed:", e);
  alert("Failed to create greenhouse.");
}

  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>🌿 Create Your New Greenhouse</h1>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <label>Greenhouse Name</label>
            <input type="text" value={greenhouseName} onChange={(e) => setGreenhouseName(e.target.value)} placeholder="e.g., My Greenhouse" />
          </div>
          <div className={styles.inputGroup}>
            <label>Type of Plant</label>
            <input type="text" value={plantType} onChange={(e) => setPlantType(e.target.value)} placeholder="e.g., Vegetable" />
          </div>
          <div className={styles.inputGroup}>
            <label>Plant Species</label>
            <input type="text" value={plantSpecies} onChange={(e) => setPlantSpecies(e.target.value)} placeholder="e.g., Tomato" />
          </div>
          <div className={styles.inputGroup}>
            <label>Planting Date</label>
            <input type="date" value={plantingDate} onChange={(e) => setPlantingDate(e.target.value)} />
          </div>
        </div>

        <div className={styles.stageContainer}>
          <h2 className={styles.stageTitle}>Select Growth Stage</h2>
          <GrowthStageSelector selectedStage={selectedStage} onSelect={setSelectedStage} />
        </div>
      </div>

      <button className={styles.submitButton} onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create Greenhouse"}
      </button>

      {error && <p className={styles.errorText}>❌ {error}</p>}
    </div>
  );
};

export default CreateGreenhousePage;
