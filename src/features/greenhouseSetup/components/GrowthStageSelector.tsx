import { useState } from 'react';
import styles from './GrowthStageSelector.module.css';

const stages = [
  'Seed Stage',
  'Germination',
  'Seedling Stage',
  'Vegetative Stage',
  'Flowering Stage',
  'Fruiting',
];

type Props = {
  selectedStage: string | null;
  onSelect: (stage: string) => void;
};

const GrowthStageSelector = ({ selectedStage, onSelect }: Props) => {
  const [dragging, setDragging] = useState(false);

  const handleDrop = (stage: string) => {
    onSelect(stage);
    setDragging(false);
  };

  return (
    <div className={styles.selectorContainer}>
      <div
        className={`${styles.emoji} ${dragging ? styles.dragging : ''}`}
        draggable
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
      >
        🌿
      </div>

      <div className={styles.grid}>
        {stages.map((stage) => (
          <div
            key={stage}
            className={`${styles.pot} ${
              selectedStage === stage ? styles.selected : ''
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(stage)}
          >
            {stage}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrowthStageSelector;
