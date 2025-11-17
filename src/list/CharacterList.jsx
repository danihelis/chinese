import { useState, useRef, useEffect } from 'react';
import { Select } from '@headlessui/react';

import database from '../data/database.js';
import { Page } from '../Page.jsx';
import { Link } from './Link.jsx';


function Section({label, list, method, handlePage}) {
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


export function CharacterList({handlePage}) {
  const [sortMethod, setSortMethod] = useState('pinyin');
  const groups = new Map();

  if (sortMethod === 'pinyin') {
    const list = database.glyphs.map(g => database.words[g]).filter(w => w.hsk);
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
    const list = Object.values(database.words).filter(w => w.index);
    list.forEach(w => {
      const head = w.index[0];
      if (!groups.has(head)) groups.set(head, []);
      groups.get(head).push(w);
    });

    groups.keys().filter(k =>
      groups.get(k).every(w => !w.entries)
    ).toArray().forEach(k => groups.delete(k));

    groups.values().forEach(l => l.sort((a, b) => {
      if (a.index[1] === b.index[1]) {
        return a.pinyin?.toLowerCase().normalize('NFD').localeCompare(
          b.pinyin?.toLowerCase().normalize('NFD') ?? ''
        );
      }
      return a.index[1] - b.index[1];
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
    <Page title="List of Characters" className="flex flex-col gap-5">
      <Selector method={sortMethod} setMethod={setSortMethod} />
      <div className="flex flex-col gap-3 justify-center">
        {sections?.map(s => (
          <Section
            key={s}
            label={s}
            list={groups.get(s)}
            handlePage={handlePage}
            method={sortMethod}
          />
        ))}
      </div>
    </Page>
  );
}
