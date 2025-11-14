import { useState, useRef, useEffect, Fragment } from 'react';
import database from '../data/database.js';
import { shuffle } from '../utils.js';
import { Panel } from './Panel.jsx';
import { Page } from '../Page.jsx';


const characterColor = 'text-gray-900';
const componentColor = 'text-gray-900';


function Character({character, handlePage}) {
  if (!(character in database.words)) {
    return <span className="text-gray-600">{character}</span>;
  }
  return (
    <span
      className={`text-gray-900 cursor-pointer`}
      onClick={() => handlePage('detail', character)}
    >{character}</span>
  );
}


function CharacterSequence({sequence, handlePage, word}) {
    return [...sequence].map((glyph, i) =>
      glyph == word ? (
        <span key={[glyph, i]} className="underline font-bold">{glyph}</span>
      ) : (
        <Character key={[glyph, i]} character={glyph} handlePage={handlePage} />
      ));
}


function MixedCharacterText({text, handlePage}) {
  if (!text) return null;

  let chunks = [];
  let currentChunk = '';

  const pushChunk = () => {
    if (currentChunk.length === 0) return;
    chunks.push(<span key={['span', chunks.length]}>{currentChunk}</span>);
    currentChunk = '';
  };

  for (const character of [...text]) {
    if (character in database.words) {
      pushChunk();
      chunks.push(<Character key={[character, chunks.length]} character={character} handlePage={handlePage} />);
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


function Word({word, handlePage}) {
  return (
    <>
      <div className="flex items-baseline gap-2">
        {word.hsk ? (
          <div className="bg-gray-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {word.hsk}
          </div>
        ) : <div className="w-4 h-4" />}
        <p><CharacterSequence sequence={word.key} handlePage={handlePage} /></p>
      </div>
      <span className="text-black">{word.pinyin}</span>
      <p className="text-sm italic text-gray-800">{word.meaning}</p>
    </>
  );
}


function WordList({words, handlePage}) {
  const list = words.map(w => database.words[w]).filter(w => !!w);
  list.sort((a, b) => {
    if (a.hsk !== b.hsk) return (b.hsk ?? 0) - (a.hsk ?? 0);
    return a.pinyin.localeCompare(b.pinyin);
  });

  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-1 items-centerx">
        {list.map(w => (
          <Word key={w.key} word={w} handlePage={handlePage} />
        ))}
      </div>
    </div>
  );
}


function Definition({definition, index}) {
  return (
    <div className="flex gap-1">
      <span className="text-gray-600">{index}.</span>
      <p>{definition}</p>
    </div>
  );
}


function DefinitionList({definitions}) {
  return (
    <div className="flex flex-col gap-1">
      {definitions.map((d, i) => (
        <Definition key={`definition-${i}`} definition={d} index={i + 1} />
      ))}
    </div>
  );
}


function Sentence({sentence, word, handlePage}) {
  return (
    <div className="">
      <p>
        <CharacterSequence sequence={sentence.phrase} handlePage={handlePage} word={word} />
      </p>
      <p>
        {sentence.pinyin}
      </p>
      <p className="text-gray-800 italic">
        {sentence.translation}
      </p>
    </div>
  );
}


function SentenceList({sentences, word, handlePage}) {
  const list = shuffle(sentences).slice(0, 3).map(s => database.sentences[s]);

  return (
    <div className="flex flex-col gap-4">
      {list.map(s => (
        <Sentence key={s.phrase} sentence={s} word={word} handlePage={handlePage} />
      ))}
    </div>
  );
}


export function CharacterDetail({word, handlePage}) {
  const [ethymIndex, setEthymIndex] = useState(0);

  useEffect(() => {
    setEthymIndex(0);
  }, [word]);

  const entry = database.words[word];
  let ethymologies = Object.keys(entry.entries ?? []);
  ethymologies.sort((a, b) => a.localeCompare(b));
  if (ethymologies.includes(entry.pinyin)) {
    ethymologies = ethymologies.filter(p => p != entry.pinyin);
    ethymologies.unshift(entry.pinyin);
  }

  const pinyin = ethymologies[ethymIndex] ?? entry.pinyin;
  const data = entry.entries?.[ethymologies[ethymIndex]];
  const phonetic = data?.phonetic || entry.phonetic;

  const textColor = entry.frequency ? characterColor : componentColor;
  const bgLightColor = entry.frequency ? 'bg-gray-200' : 'bg-gray-200';
  const bgHeavyColor = entry.frequency ? 'bg-gray-200' : 'bg-gray-200';

  const changeEthym = (index) => {
    if (index === ethymIndex) return;
    setEthymIndex(index);
  };

  return (
    <Page key={word} title="Character">
      <div className="flex flex-col gap-6 items-center justify-center max-w-sm justify-self-center">
        <div className="grid grid-cols-[auto_1fr] gap-4 gap-y-2">
          {Object.keys(entry.entries ?? {}).length > 1 ? (
            <>
              <div className="flex gap-1 items-center justify-center relative">
                {Object.keys(entry.entries).map((e, i) => (
                  <div
                    key={e}
                    className={`${i === ethymIndex ? 'inset-ring-1 inset-ring-gray-800 text-gray-800' : 'bg-gray-600 text-white cursor-pointer'} w-5 h-5 text-xs flex items-center justify-center select-none z-1`}
                    onClick={() => changeEthym(i)}
                  >{i + 1}</div>
                ))}
              </div>
              <div />
            </>
          ) : null}

          <div>
            <div className={`${textColor} ${bgLightColor} text-9xl rounded-xl p-2 h-40 w-40 flex justify-center items-center`}>
              {word}
            </div>
          </div>
          <div className="flex flex-col gap-1 min-w-40">
            {pinyin ? (
              <>
                <div className="flex">
                  <p className="flex-1 text-3xl">{pinyin}</p>
                </div>
                {phonetic ? (
                  <p className="text-gray-800">/{phonetic}/</p>
                ) : null}
              </>
            ) : null}
            <span className="flex-1" />
            {entry.index ? (
              <>
                <Attribute name="IDX" tooltip="Index">
                  <Character character={entry.index[0]} handlePage={handlePage} />
                  <span>{`${entry.index < 0 ? '-' : '+'}${entry.index[1]}`}</span>
                </Attribute>
                <Attribute name="STR" tooltip="Strokes">{entry.strokes}</Attribute>
                {!entry.composition ? null : (
                  <Attribute name="CMP" tooltip="Composition">
                    <CharacterSequence sequence={entry.composition} handlePage={handlePage} />
                  </Attribute>
                )}
              </>
            ) : null}
          </div>
        </div>

        <div className="text-sm self-stretch">
          {entry.origin ? (
            <div className={`${bgHeavyColor} ${entry.percentile ? 'rounded-t-md' : 'rounded-md'} p-4 text-center`}>
              <div className="flex gap-2 items-center">
                <span className="font-mashan text-4xl">
                  {word}
                </span>
                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase">Origin </span>
                  <MixedCharacterText text={entry.origin} handlePage={handlePage} />
                </div>
              </div>
            </div>
          ) : null}
          {entry.percentile ? (
            <div className={`${entry.origin ? 'rounded-b-md' : 'rounded-md'} bg-gray-600 text-white flex p-2 px-4`}>
              <div className="flex-auto">
                <span className="text-xs font-semibold uppercase mr-2">Freq Perc</span>
                {entry.percentile.toFixed(0)}%
              </div>
              <div className="flex-auto text-right">
                <span className="text-xs font-semibold uppercase mr-2">HSK Level</span>
                {entry.hsk || <span>&ndash;</span>}
              </div>
            </div>
          ) : null}
        </div>

        {data ? (
          <Block title="Definitions">
            <DefinitionList definitions={data.definitions} />
          </Block>
        ) : (
          <p className="text-center italic">Not a character on its own</p>
        )}

        {entry.words?.length ? (
          <Block title="Compounded words">
            <WordList words={entry.words} handlePage={handlePage} />
          </Block>
        ) : null}

        {entry.sentences?.length ? (
          <Block title="Example Sentences">
            <SentenceList sentences={entry.sentences} word={word} handlePage={handlePage} />
          </Block>
        ) : null}

        <Block title="Practice writing" padding={false}>
          <Panel word={word} />
        </Block>
      </div>
    </Page>
  )
}
