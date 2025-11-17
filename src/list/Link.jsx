import { useState, useRef, useEffect } from 'react';
import database from '../data/database.js';


export function Link({word, showIndex, onClick}) {
  const entry = database.words[word];
  const index = showIndex && entry.index ?
    `${entry.index < 0 ? '-' : '+'}${entry.index[1]}` : null;

  return (
    <div
      className="w-25 flex flex-col p-4 px-2 items-center bg-gray-200 rounded-xl hover:bg-gray-100 cursor-pointer relative"
      onClick={onClick}
    >
      <h1 className="text-5xl text-gray-800">{word}</h1>
      <h2 className="text-gray-700 mt-2">{entry.pinyin}</h2>
      <div className="text-gray-500 text-sm truncate w-full text-center">{entry.meaning}</div>
      {index && <div className="absolute top-0 right-0 p-1 bg-gray-300 text-gray-600 text-xs rounded rounded-tr-xl">{index}</div>}
    </div>
  );
}
