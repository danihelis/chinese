import { useState, useRef, useEffect } from 'react';
import { Select } from '@headlessui/react';

import database from '../data/database.js';
import { Page } from '../Page.jsx';
import { Link } from './Link.jsx';


export function WordLink({word, showIndex, onClick}) {
  const entry = database.words[word];
  const index = showIndex && entry.head.index ?
    `${entry.head.index < 0 ? '-' : '+'}${entry.head.index[1]}` : null;

  // <div className="grid grid-cols-[5em_9em_1fr] p-2 bg-gray-200 hover:bg-gray-100 cursor-pointer rounded rounded-xl">
  return (
    <div className="flex gap-4 p-2 bg-gray-200 hover:bg-gray-100 cursor-pointer rounded rounded-xl items-baseline relative">
      <div className="whitespace-nowrap text-xl">
        {word}
      </div>
      <div className="whitespace-nowrap">
        {entry.pinyin}
      </div>
      <div className="text-gray-500 text-sm truncate">
        {entry.meaning}
      </div>
      {index && <div className="absolute top-0 right-0 p-1 px-2 bg-gray-300 text-gray-600 text-xs rounded rounded-tr-xl self-stretch flex items-center">{index}</div>}
    </div>
  );
}

function Section({label, list, method, handlePage, asWords}) {
  const index = database.words[label]?.root?.[0];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex bg-gray-600 rounded p-1 px-2 text-white">
        {label}
        {index ? (
          <>
            <span className="flex-grow" />
            <span className="text-gray-300">{index}</span>
          </>
        ) : null}
      </div>
      {asWords ? (
        list.map(w => (
            <WordLink
              key={w.key}
              word={w.key}
              onClick={() => handlePage('detail', w.key)}
              showIndex={method === 'stroke'}
            />
        ))
      ) : (
        <div className="flex flex-wrap gap-2 justify-center">
          {list.map(w => (
            <Link
              key={w.key}
              word={w.key}
              onClick={() => handlePage('detail', w.key)}
              showIndex={method === 'stroke'}
            />
          ))}
        </div>
      )}
    </div>
  );
}


function Selector({method, setMethod}) {
  const selectedStyle = '';
  const notSelectedStyle = '';

  const createMethod = (value, icon, label) => {
    const selected = value === method;
    const style = selected ? 'bg-gray-600 text-white' : 'bg-gray-200 cursor-pointer';
    return (
      <div
        className={`flex gap-2 p-1 px-2 items-baseline rounded-lg ${style}`}
        onClick={() => setMethod(value)}
      >
        <span className="text-lg font-semibold">{icon}</span>
        <span className="">{label}</span>
      </div>
    );
  };

  return (
    <div className="flex gap-3 justify-center items-baseline">
      <span className="">Sort by</span>
      {createMethod('pinyin', 'Ab', 'Pinyin')}
      {createMethod('stroke', '字', 'Strokes')}
    </div>
  );
}


export function CharacterList({handlePage, asWords = false}) {
  const [sortMethod, setSortMethod] = useState('pinyin');
  const groups = new Map();

  if (sortMethod === 'pinyin') {
    const list = asWords ?
      Object.values(database.words).filter(w => w.hsk && !w.isGlyph) :
      database.glyphs.map(g => database.words[g]).filter(w => w.hsk);
    list.forEach(w => {
      const head = w.pinyin.normalize('NFD')[0].toUpperCase();
      if (!groups.has(head)) groups.set(head, []);
      groups.get(head).push(w);
    });

    groups.values().forEach(l => l.sort((a, b) =>
      a.pinyin.toLowerCase().normalize('NFD').localeCompare(
        b.pinyin.toLowerCase().normalize('NFD')
      )
    ));
  }
  else if (sortMethod === 'stroke') {
    const list = !asWords ?
      Object.values(database.words).filter(w => w.index) :
      Object.values(database.words).filter(
          w => w.hsk && !w.isGlyph && w.head.index);
    list.forEach(w => {
      const head = w.head.index[0];
      if (!groups.has(head)) groups.set(head, []);
      groups.get(head).push(w);
    });

    groups.keys().filter(k =>
      groups.get(k).every(w => !w.entries)
    ).toArray().forEach(k => groups.delete(k));

    groups.values().forEach(l => l.sort((a, b) => {
      if (a.head.index[1] === b.head.index[1]) {
        return a.pinyin?.toLowerCase().normalize('NFD').localeCompare(
          (b.pinyin ?? a.pinyin).toLowerCase().normalize('NFD')
        ) ?? 0;
      }
      return a.head.index[1] - b.head.index[1];
    }));
  }

  const sections = groups.keys().toArray();
  if (sortMethod === 'pinyin') {
    sections.sort((a, b) => a.localeCompare(b));
  } else if (sortMethod === 'stroke') {
    sections.sort((a, b) => {
      const wa = database.words[a], wb = database.words[b];
      if (!wa || !wb) return wa ? -1 : wb ? 1 : 0;
      return wa.root[0] - wb.root[0];
    });
  }

  return (
    <Page title={`List of ${asWords ? 'Words' : 'Characters'}`} className="flex flex-col gap-5">
      <Selector method={sortMethod} setMethod={setSortMethod} />
      <div className="flex flex-col gap-3 justify-center">
        {sections?.map(s => (
          <Section
            key={s}
            label={s}
            list={groups.get(s)}
            handlePage={handlePage}
            method={sortMethod}
            asWords={asWords}
          />
        ))}
      </div>
    </Page>
  );
}
