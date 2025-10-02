import { useState, useRef, useEffect, Fragment } from 'react';
import { database } from '../data/database.js';
import { Panel } from './Panel.jsx';


const characterColor = 'text-green-800';
const componentColor = 'text-red-800';


function Character({character, entry, handlePage}) {
  let cEntry = entry.key === character ? null : database.get(character);
  if (!cEntry) return <span className="">{character}</span>;
  return (
    <span
      className={`${cEntry.ethym ? characterColor : componentColor} cursor-pointer`}
      onClick={() => handlePage('detail', cEntry)}
    >{cEntry.key}</span>
  );
}


function CharacterSequence({sequence, entry, handlePage}) {
    return [...sequence].map((char, i) => (
      <Character key={[char, i]} character={char} handlePage={handlePage} entry={entry} />
    ));
}


function MixedCharacterText({text, entry, handlePage}) {
  let chunks = [];
  let currentChunk = '';

  const pushChunk = () => {
    if (currentChunk.length === 0) return;
    chunks.push(<span key={['span', chunks.length]}>{currentChunk}</span>);
    currentChunk = '';
  };

  for (const character of [...text]) {
    if (database.has(character)) {
      pushChunk();
      chunks.push(<Character key={[character, chunks.length]} character={character} entry={entry} handlePage={handlePage} />);
    } else {
      currentChunk += character;
    }
  }
  pushChunk();

  return chunks;
}


function Attribute({name, tooltip, children}) {
  return (
    <div className="inline-flex">
      <div className="relative">
        <span className="text-xs text-center text-gray-600 cursor-help peer border-b border-dashed inline-block w-8">
          {name}:
        </span>
        <span className="absolute right-full -top-1 px-3 py-1.5 mr-2 bg-gray-700 text-white text-sm rounded-md whitespace-nowrap opacity-0 peer-hover:opacity-100 transition-opacity duration-300">
          {tooltip}
        </span>
      </div>
      <div className="ml-2 inline-flex gap-1 flex-wrap">
        {children}
      </div>
    </div>
  );
}


function Block({title, children, padding = true}) {

  return (
    <div className="self-stretch flex flex-col gap-4">
      <p className="text-sm font-semibold uppercase">{title}</p>
      <div className={padding ? 'pl-6' : ''}>
        {children}
      </div>
    </div>
  );
}


function Word({word, entry, handlePage}) {
  return (
    <>
      <div>
        <CharacterSequence sequence={word.entry} entry={entry} handlePage={handlePage} />
      </div>
      <span className="text-gray-600">{word.pinyin}</span>
      <p className="text-sm italic ">{word.meaning}</p>
    </>
  );
}


function WordList({entry, handlePage}) {
  const collapsable = entry.words.size > 3;
  const [collapse, setCollapse] = useState(collapsable);

  let list = [...entry.words];
  list.sort((a, b) => {
    if (a.level !== b.level) a.level - b.level;
    return a.pinyin.localeCompare(b.pinyin);
  });
  if (collapse) list = list.slice(0, 2);

  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-1 items-center">
        {list.map(w => <Word key={w.entry} word={w} entry={entry} handlePage={handlePage} />)}
      </div>
      {collapsable ? (
        <div className="text-green-800 cursor-pointer" onClick={() => setCollapse(!collapse)}>
          <span className="underline text-sm">show {collapse ? 'more' : 'less'} words</span>
        </div>
      ) : null}
    </div>
  );
}


function Definition({definition, index}) {
  return (
    <div className="flex gap-1">
      <span className="text-gray-600">{index + 1}.</span>
      <p>{definition}</p>
    </div>
  );
}


function DefinitionList({ethym}) {
  const collapsable = ethym.definitions.length > 3;
  const [collapse, setCollapse] = useState(collapsable);

  const list = collapse ? ethym.definitions.slice(0, 2) : ethym.definitions;

  return (
    <div className="flex flex-col gap-1">
      {list.map((d, i) => (
        <Definition key={`definition-${i}`} definition={d} index={i} />
      ))}
      {collapsable ? (
        <div className="text-green-800 cursor-pointer" onClick={() => setCollapse(!collapse)}>
          <span className="underline text-sm">show {collapse ? 'more' : 'less'} definitions</span>
        </div>
      ) : null}
    </div>
  );
}


export function CharacterDetail({entry, handlePage}) {
  const [ethymIndex, setEthymIndex] = useState(0);
  const [collapseDefinitions, setCollapseDefinitions] = useState(true);
  const [collapseWords, setCollapseWords] = useState(true);

  const ethym = entry.ethym?.[ethymIndex];
  const hsk = entry.hsk?.[ethymIndex] ?? entry.hsk?.[0];
  const pronouncing = ethym ?? (entry.pinyin ? entry : null);

  const textColor = entry.frequency ? characterColor : componentColor;
  const bgLightColor = entry.frequency ? 'bg-green-100' : 'bg-red-100';
  const bgHeavyColor = entry.frequency ? 'bg-green-200' : 'bg-red-200';

  const changeEthym = (index) => {
    if (index === ethymIndex) return;
    setCollapseDefinitions(true);
    setEthymIndex(index);
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center mt-5 max-w-sm justify-self-center">
      <div className="grid grid-cols-2 gap-4">
        <div className={`${textColor} ${bgLightColor} text-9xl rounded-xl p-2 h-40 flex justify-center items-center`}>
          {entry.key}
        </div>
        <div className="flex flex-col gap-1">
          {pronouncing ? (
            <>
              <div className="flex">
                <p className="flex-1 text-3xl">{pronouncing.pinyin}</p>
                {entry.ethym?.length > 1 ? (
                  <div className="flex gap-1 items-center">
                    {entry.ethym.map((e, i) => (
                      <div key={e.pinyin} className={`${i === ethymIndex ? 'inset-ring-1 inset-ring-green-800 text-green-800' : 'bg-green-800 text-white cursor-pointer'} w-5 h-5 text-xs flex items-center justify-center select-none`} onClick={() => changeEthym(i)}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <p className="text-gray-800">/{pronouncing.phonetic}/</p>
            </>
          ) : null}
          <span className="flex-1" />
          <Attribute name="IDX" tooltip="Index">
            <Character character={entry.index[0]} entry={entry} handlePage={handlePage} />
            <span>{`${entry.index < 0 ? '-' : '+'}${entry.index[1]}`}</span>
          </Attribute>
          <Attribute name="STR" tooltip="Strokes">{entry.strokes}</Attribute>
          {!entry.composition ? null : (
            <Attribute name="CMP" tooltip="Composition">
              <CharacterSequence sequence={entry.composition} entry={entry} handlePage={handlePage} />
            </Attribute>
          )}
        </div>
      </div>
      <div className={`${textColor} text-xl text-center`}>
        {hsk?.meaningx ?? entry.frequency?.meaning ?? entry.radical}
      </div>
      <div className="text-sm self-stretch">
        <div className={`${bgHeavyColor} ${ethym ? 'rounded-t-md' : 'rounded-md'} p-4 text-center`}>
          <div className="flex gap-2 items-center">
            <span className="font-mashan text-4xl">
              {entry.key}
            </span>
            <div className="flex-1">
              <span className="text-xs font-semibold uppercase">Origin </span>
              <MixedCharacterText text={entry.origin} entry={entry} handlePage={handlePage} />
            </div>
          </div>
        </div>
        {ethym ? (
          <div className="bg-green-800 text-white rounded-b-md flex p-2 px-4">
            <div className="flex-auto">
              <span className="text-xs font-semibold uppercase mr-2">Freq Perc</span>
              {entry.frequency.percentile}%
            </div>
            <div className="flex-auto text-right">
              <span className="text-xs font-semibold uppercase mr-2">HSK Level</span>
              {hsk?.level ?? <span>&ndash;</span>}
            </div>
          </div>
        ) : null}
      </div>
      {ethym ? (
        <Block title="Definitions">
          <DefinitionList ethym={ethym} />
        </Block>
      ) : (
        <p className="text-center italic">Not a character on its own</p>
      )}
      {entry.words ? (
        <Block title="Compounded words">
          <WordList entry={entry} handlePage={handlePage} />
        </Block>
      ) : null}
      <Block title="Pratice writing" padding={false}>
        <Panel entry={entry} />
      </Block>
    </div>
  )
}
