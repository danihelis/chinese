import { useState, useEffect } from 'react';
import database from '../data/database.js';
import { choice } from '../utils.js';
import { TestCharacter } from './TestCharacter.jsx';

const available = [];


export function Train() {
  const [entry, setEntry] = useState();

  useEffect(() => {
    handleNext();
  }, []);

  const handleNext = () => {
    const entry = choice(available);
    setEntry(entry);
  };

  return entry && <TestCharacter entry={entry} onNext={handleNext} />;
}
