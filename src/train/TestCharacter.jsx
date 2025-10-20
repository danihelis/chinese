import { useState, useEffect } from 'react';
import { database } from '../data/database.js';
import { shuffle } from '../utils.js';
import { Page } from '../Page.jsx';


function Option({option, selected, onClick}) {
  const div = selected ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black';
  const icon = selected ? 'bg-white text-black' : 'border-1 border-gray-400';
  return (
    <div className={`${div} rounded flex gap-3 p-2 items-center cursor-pointer`} onClick={onClick}>
      <div className={`${icon} w-5 h-5 rounded-full flex justify-center items-center shrink-0`}>{selected ? '✓' : ''}</div>
      <span className="">{option}</span>
    </div>
  );
}


function List({title, entry, getOptions, className, onSelect}) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setOptions(getOptions(entry));
    setSelected(null);
  }, [entry]);

  const handleClick = (option) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="font-bold">{title}</span>
      <div className={className}>
        {options.map(o => (
          <Option key={o} option={o} selected={selected === o} onClick={() => handleClick(o)} />
        ))}
      </div>
    </div>
  );
}


function Pronounce({entry, onSelect}) {

  const getOptions = (entry) => {
    const others = database
      .values()
      .filter(e => e !== entry && e.hsk && e.ethym &&
          e.ethym[0].phonetic !== entry.ethym[0].phonetic)
      .map(e => e.ethym[0].pinyin)
      .toArray();

    const options = shuffle(others).slice(0, 8);
    options.push(entry.ethym[0].pinyin);
    options.sort((a, b) => a.localeCompare(b));
    return options;
  };

  return (
    <List
      title="Pinyin pronunciation"
      className="grid grid-cols-3 gap-2"
      entry={entry}
      onSelect={onSelect}
      getOptions={getOptions}
    />
  );
}


function Meaning({entry, onSelect}) {

  const getOptions = (entry) => {
    const others = database
      .values()
      .filter(e => e !== entry && e.hsk && e.frequency)
      .map(e => e.frequency.meaning)
      .toArray();

    const options = shuffle(others).slice(0, 5);
    options.push(entry.frequency.meaning);
    shuffle(options);
    return options;
  };

  return (
    <List
      title="Meaning"
      className="flex flex-col gap-2 items-stretch"
      entry={entry}
      onSelect={onSelect}
      getOptions={getOptions}
    />
  );
}


export function TestCharacter({entry}) {
  const [pronounce, setPronounce] = useState(null);
  const [meaning, setMeaning] = useState(null);

  return (
    <Page title="Training">
      <div className="flex flex-col gap-6 items-center justify-center max-w-sm justify-self-center">
        <div className="text-gray-800 bg-gray-200 text-9xl rounded-xl p-2 h-40 flex justify-center items-center">
          {entry.key}
        </div>
        <Pronounce entry={entry} onSelect={setPronounce} />
        <Meaning entry={entry} onSelect={setMeaning} />
      </div>
    </Page>
  );
}
