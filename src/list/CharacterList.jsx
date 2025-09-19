import { useState, useRef, useEffect } from 'react';
import { database } from '../data/database.js';
import { CharacterLink } from './CharacterLink.jsx';

export function CharacterList({handlePage}) {
  const list = database.values()
    .filter(e => e.hsk)
    .toArray()
    .sort((a, b) => b.frequency.value - a.frequency.value);

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {list.map(e => <CharacterLink key={e.key} entry={e} onClick={() => handlePage('detail', e)} />)}
    </div>
  );
}
