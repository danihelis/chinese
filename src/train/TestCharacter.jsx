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


function Answer({selected, answer, className}) {
  const correct = selected === answer;
  return (
    <div className={className}>
      <div className={`bg-gray-700 text-white rounded flex gap-3 p-2 items-center`}>
        <div className={`bg-white text-black w-5 h-5 rounded flex justify-center items-center shrink-0`}>{correct ? '✓' : '✗'}</div>
        <span className="">{selected}</span>
      </div>
      {!correct ? (
        <div className={`bg-gray-300 text-black rounded flex gap-3 p-2 items-center`}>
          <div className={`bg-white text-black w-5 h-5 rounded flex justify-center items-center shrink-0`}>{'✓'}</div>
          <span className="">{answer}</span>
        </div>
      ) : null}
    </div>
  );
}


function List({title, entry, getOptions, className, onSelect, showAnswer, answerClassName}) {
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const [options, answer] = getOptions(entry);
    setOptions(options);
    setAnswer(answer);
    setSelected(null);
  }, [entry]);

  const handleClick = (option) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <span className="font-bold">{title}</span>
      {showAnswer ? (
        <Answer selected={selected} answer={answer} className={answerClassName} />
      ) : (
        <div className={className}>
          {options.map(o => (
            <Option key={o} option={o} selected={selected === o} onClick={() => handleClick(o)} />
          ))}
        </div>
      )}
    </div>
  );
}


function Pronounce({entry, onSelect, showAnswer}) {

  const getOptions = (entry) => {
    const others = database
      .values()
      .filter(e => e !== entry && e.hsk && e.ethym &&
          e.ethym[0].phonetic !== entry.ethym[0].phonetic)
      .map(e => e.ethym[0].pinyin)
      .toArray();

    const options = shuffle(others).slice(0, 8);
    const answer = entry.ethym[0].pinyin;
    options.push(answer);
    options.sort((a, b) => a.localeCompare(b));
    return [options, answer];
  };

  return (
    <List
      title="Pinyin pronunciation"
      className="grid grid-cols-3 gap-2"
      entry={entry}
      onSelect={onSelect}
      getOptions={getOptions}
      showAnswer={showAnswer}
      answerClassName="flex gap-2"
    />
  );
}


function Meaning({entry, onSelect, showAnswer}) {

  const getOptions = (entry) => {
    const others = database
      .values()
      .filter(e => e !== entry && e.hsk && e.frequency)
      .map(e => e.frequency.meaning)
      .toArray();

    const options = shuffle(others).slice(0, 5);
    const answer = entry.frequency.meaning;
    options.push(answer);
    shuffle(options);
    return [options, answer];
  };

  return (
    <List
      title="Meaning"
      className="flex flex-col gap-2 items-stretch"
      entry={entry}
      onSelect={onSelect}
      getOptions={getOptions}
      showAnswer={showAnswer}
      answerClassName="flex flex-col gap-2 items-stretch"
    />
  );
}


function Button({children, onClick, disabled, className}) {
  const style = disabled ? 'bg-gray-300 text-gray-400' :
    'bg-gray-500 text-white active:bg-gray-400 cursor-pointer';

  return (
    <button
      className={`${style} p-2 px-4 rounded ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}


export function TestCharacter({entry, onNext}) {
  const [pronounce, setPronounce] = useState();
  const [meaning, setMeaning] = useState();
  const [showAnswer, setShowAnswer] = useState();

  useEffect(() => {
    setPronounce(null);
    setMeaning(null);
    setShowAnswer(false);
  }, [entry]);

  const validateAnswer = () => {
    setShowAnswer(true);
  };

  return (
    <Page title="Training">
      <div className="flex flex-col gap-6 items-center justify-center w-full max-w-sm justify-self-center">
        <div className="text-gray-800 bg-gray-200 text-9xl rounded-xl p-2 h-40 flex justify-center items-center">
          {entry.key}
        </div>
        <Pronounce entry={entry} onSelect={setPronounce} showAnswer={showAnswer} />
        <Meaning entry={entry} onSelect={setMeaning} showAnswer={showAnswer} />
        {showAnswer ? (
          <Button onClick={onNext} className="mt-4">
            <span>Next character</span>
          </Button>
        ) : (
          <Button onClick={validateAnswer} disabled={!pronounce || !meaning} className="mt-4">
            <span>Check answer</span>
          </Button>
        )}
      </div>
    </Page>
  );
}
