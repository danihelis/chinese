import { useState, useRef, useEffect, Fragment } from 'react';
import { database } from '../data/database.js';


const characterColor = 'text-green-800';
const componentColor = 'text-red-800';


function Character({character, entry, handlePage}) {
  let cEntry = entry.key === character ? null : database.get(character);
  if (!cEntry) return <span>{character}</span>;
  return (
    <span
      className={`${cEntry.hasDefinition ? characterColor : componentColor} cursor-pointer`}
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
    <div className="relative inline-block">
      <span className="text-xs text-center text-gray-600 cursor-help peer border-b border-dashed inline-block w-8">
        {name}:
      </span>
      <span className="absolute right-full -top-1 px-3 py-1.5 mr-2 bg-gray-700 text-white text-sm rounded-md whitespace-nowrap opacity-0 peer-hover:opacity-100 transition-opacity duration-300">
        {tooltip}
      </span>
      <div className="ml-2 inline-flex gap-1">
        {children}
      </div>
    </div>
  );
}


function Block({title, children}) {
  return (
    <div className="self-stretch flex flex-col gap-4">
      <p className="text-sm font-semibold uppercase">{title}</p>
      <div className="flex flex-col gap-1 pl-6">
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
  return (
    <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-1 items-center">
      {[...entry.words].map(w => <Word key={w.entry }word={w} entry={entry} handlePage={handlePage} />)}
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


export function CharacterDetail({entry, handlePage}) {
  const textColor = entry.frequency ? characterColor : componentColor;
  const bgLightColor = entry.frequency ? 'bg-green-100' : 'bg-red-100';
  const bgHeavyColor = entry.frequency ? 'bg-green-200' : 'bg-red-200';

  return (
    <div className="flex flex-col gap-6 items-center justify-center mt-5 max-w-sm justify-self-center">
      <div className="grid grid-cols-2 gap-4">
        <h1 className={`${textColor} ${bgLightColor} text-9xl rounded-xl p-2`}>
          {entry.key}
        </h1>
        <div className="flex flex-col gap-1">
          <p className="text-3xl">{entry.pinyin}</p>
          <p className="text-gray-800">/{entry.phonetic}/</p>
          <Attribute name="IDX" tooltip="Index">
            <Character character={entry.index.charAt(0)} entry={entry} handlePage={handlePage} />
            <span>{entry.index.substr(1)}</span>
          </Attribute>
          <Attribute name="STR" tooltip="Strokes">{entry.strokes}</Attribute>
          {!entry.composition ? null : (
            <Attribute name="CMP" tooltip="Composition">
              <CharacterSequence sequence={entry.composition} entry={entry} handlePage={handlePage} />
            </Attribute>
          )}
        </div>
      </div>
      <div className={`${textColor} text-xl`}>
        {entry.hsk?.[0].meaning ?? entry.frequency?.meaning ?? entry.radical}
      </div>
      <div className="text-sm self-stretch">
        <div className={`${bgHeavyColor} ${entry.hasDefinition ? 'rounded-t-md' : 'rounded-md'} p-4 text-center`}>
          <span className="text-xs font-semibold uppercase">Origin </span>
          <MixedCharacterText text={entry.origin} entry={entry} handlePage={handlePage} />
        </div>
        {entry.hasDefinition ? (
          <div className="bg-green-800 text-white rounded-b-md flex p-2 px-4">
            <div className="flex-auto">
              <span className="text-xs font-semibold uppercase mr-2">Freq Perc</span>
              {entry.frequency.percentile}%
            </div>
            <div className="flex-auto text-right">
              <span className="text-xs font-semibold uppercase mr-2">HSK Level</span>
              {entry.hsk?.[0].level ?? <span>&ndash;</span>}
            </div>
          </div>
        ) : null}
      </div>
      {entry.hasDefinition ? (
        <Block title={`Definition${entry.definitions.length > 1 ? 's' : ''}`}>
          {entry.definitions.map((d, i) => <Definition key={`definition-${i}`} definition={d} index={i} />)}
        </Block>
      ) : (
        <p className="text-center italic">Not a character on its own</p>
      )}
      {entry.words ? (
        <Block title={`Derived word${entry.words.size > 1 ? 's' : ''}`}>
          <WordList entry={entry} handlePage={handlePage} />
        </Block>
      ) : null}
    </div>
  )
}
