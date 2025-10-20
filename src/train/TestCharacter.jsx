import { useState, useEffect } from 'react';
import { database } from '../data/database.js';
import { shuffle } from '../utils.js';


export function TestCharacter({entry}) {
  const [options, setOptions] = useState();

  useEffect(() => {
    const data = [
      ...database.values().filter(e => e.hsk && e.ethym && e !== entry)
    ];

    let definition = shuffle(data
      .map(e => e.frequency.meaning)
    ).slice(0, 4);
    definition.push(entry.frequency.meaning);
    shuffle(definition);

    let pronounce = shuffle(data
      .filter(e => e.ethym[0].phonetic !== entry.ethym[0].phonetic)
      .map(e => e.ethym[0].pinyin)
    );
    pronounce = pronounce.slice(0, 7);
    pronounce.push(entry.ethym[0].pinyin);
    pronounce.sort((a, b) => a.localeCompare(b));

    const options = {
      pronounce: pronounce,
    };
    setOptions({
      definition: definition,
      pronounce: pronounce,
    });
  }, [entry]);

  let pronounce = null;
  if (options) {
    pronounce = options.pronounce.map(p => (
      <div key={p}>{p}</div>
    ));
  }

  return (
    <div className="flex flex-col gap-6 items-center justify-center mt-5 max-w-sm justify-self-center">
      <div className="text-green-800 bg-green-100 text-9xl rounded-xl p-2 h-40 flex justify-center items-center">
        {entry.key}
      </div>
      {options && (
        <div className="grid grid-cols-4 gap-2">
          {options.pronounce.map(p => (
            <div key={p}>{p}</div>
          ))}
        </div>
      )}
      {options && (
        <div className="flex flex-col gap-2">
          {options.definition.map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>
      )}
    </div>
  );
}
