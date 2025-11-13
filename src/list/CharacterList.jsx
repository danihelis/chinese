import { useState, useRef, useEffect } from 'react';
import database from '../data/database.js';
import { Page } from '../Page.jsx';


function Link({word, onClick}) {
  const entry = database.words[word];

  return (
    <div
      className="w-25 flex flex-col p-4 px-2 items-center bg-gray-200 rounded-xl hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <h1 className="text-5xl text-gray-800">{word}</h1>
      <h2 className="text-gray-700 mt-2">{entry.pinyin}</h2>
      <div className="text-gray-500 text-sm truncate w-full text-center">{entry.meaning}</div>
    </div>
  );
}


export function CharacterList({handlePage}) {
  const list = database.glyphs.filter(g => database.words[g].hsk);

  return (
    <Page title="List of Characters">
      <div className="flex flex-wrap gap-3 justify-center">
        {list.map(e => (
          <Link key={e} word={e} onClick={() => handlePage('detail', e)} />
        ))}
      </div>
    </Page>
  );
}
