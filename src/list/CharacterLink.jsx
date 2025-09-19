import { useState, useRef, useEffect } from 'react';


export function CharacterLink({entry, onClick}) {

  return (
    <div
      className="flex flex-col p-4 items-center bg-green-100 rounded-xl hover:bg-green-200 cursor-pointer"
      onClick={onClick}
    >
      <h1 className="text-5xl text-green-800">{entry.key}</h1>
      <h2 className="text-gray-700 mt-2">{entry.pinyin}</h2>
      <p className="text-gray-500 text-sm">{entry.hsk?.[0].meaning}</p>
    </div>
  )
}
