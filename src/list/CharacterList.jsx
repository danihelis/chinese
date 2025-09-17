import { useState, useRef, useEffect } from 'react';
import { CharacterLink } from './CharacterLink.jsx';

export function CharacterList({database}) {
  const list = database.values()
    .filter(e => e.hsk)
    .toArray()
    .sort((a, b) => b.frequency.value - a.frequency.value);

  return (
    <div className="flex flex-col gap-10 items-center justify-center mt-5">
      <h1 className="text-3xl font-bold">Characters</h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {list.map(e => <CharacterLink key={e.key} value={e} />)}
      </div>
    </div>
  );
}
