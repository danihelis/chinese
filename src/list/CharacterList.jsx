import { useState, useRef, useEffect } from 'react';
import { database } from '../data/database.js';


function Link({entry, onClick}) {
  const hsk = entry.hsk[0];

  return (
    <div
      className="w-25 flex flex-col p-4 px-2 items-center bg-green-100 rounded-xl hover:bg-green-200 cursor-pointer"
      onClick={onClick}
    >
      <h1 className="text-5xl text-green-800">{entry.key}</h1>
      <h2 className="text-gray-700 mt-2">{hsk.pinyin}</h2>
      <div className="text-gray-500 text-sm truncate w-full text-center">{hsk.meaning}</div>
    </div>
  );
}


export function CharacterList({handlePage}) {
  const list = database.values()
    .filter(e => e.hsk)
    .toArray()
    .sort((a, b) => b.frequency.value - a.frequency.value);

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {list.map(e => <Link key={e.key} entry={e} onClick={() => handlePage('detail', e)} />)}
    </div>
  );
}
