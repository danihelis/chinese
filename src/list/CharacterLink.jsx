import { useState, useRef, useEffect } from 'react';


export function CharacterLink({value}) {
  return (
    <div className="flex flex-col p-4 items-center bg-green-100 rounded-xl hover:bg-green-200">
      <h1 className="text-5xl text-green-800">{value.key}</h1>
      <h2 className="text-gray-700 mt-2">{value.pinyin}</h2>
      <p className="text-gray-500 text-sm">{value.hsk?.[0].meaning}</p>
    </div>
  )
}
