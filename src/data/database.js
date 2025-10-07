import entries from './entries.js';
import frequencyRaw from './frequency.txt?raw';
import hsk1Raw from './hsk3-b1.txt?raw';

const percentileSize = 300;

function loadHsk(content, level, base) {
  const hsk = content
    .split('\n')
    .map(line => line.split('\t'))
    .filter(row => row.length === 4)
    .reduce((hsk, row) => {
      const data = {
        entry: row[1],
        pinyin: row[2],
        meaning: row[3],
        level: level,
      };
      const key = data.entry.replace(/[（｜].*/, '');
      if (!hsk.entries.has(key)) hsk.entries.set(key, []);
      hsk.entries.get(key).push(data);
      hsk.counter++;

      const characters = [...key];
      if (characters.length > 1) {
        data.characters = characters;
        hsk.words.set(key, data);
      }
      characters.forEach(c => hsk.characters.add(c));
      return hsk;
    }, {
      entries: new Map(),
      characters: new Set(),
      words: new Map(),
      counter: 0,
    });

  console.log(
    "Loaded %d rows for HSK3 (level %d): %d entries, %d words, %s characters",
    hsk.counter, level, hsk.entries.size, hsk.words.size, hsk.characters.size);

  if (base) {
    hsk.entries = new Map([...hsk.entries, ...base.entries]);
    hsk.words = new Map([...hsk.words, ...base.words]);
    hsk.characters = new Set([...hsk.characters, ...base.characters]);
    hsk.counter += base.counter;
  }
  return hsk;
}

export const database = Object.entries(entries)
  .reduce((map, [key, value]) => {
    map.set(key, {key: key, ...value});
    return map;
  }, new Map());
console.log("Loaded database with %d entries", database.size);

database.values().forEach(data => {
  if (data.root) data.index = [data.key, 0];
  const index = data.root ? data : database.get(data.index[0]);
  if (!index) console.log('index not found for %s: %s', data.key, data.index[0]);
  else data.strokes = index.root[1] + (data.index?.[1] ?? 0);
});

export const frequency = frequencyRaw
  .split('\n')
  .map(line => line.split('\t'))
  .filter(row => row.length >= 5)
  .reduce((map, row, index, array) => {
    const percentile = 100 * (1 - index / (percentileSize || array.length));
    map.set(row[1], {
      value: parseInt(row[2]),
      percentile: Math.max(0, Math.floor(percentile)),
      pinyin: row[4],
      meaning: row[5].replace(/,/g, ';').replace(/\//g, ', '),
    });
    return map;
  }, new Map());
console.log("Loaded frequency data with %d entries", frequency.size);

frequency.entries()
  .filter(([key, entry]) => database.has(key))
  .map(([key, entry]) => [key, entry, database.get(key)])
  .forEach(([key, entry, data]) => {
    data.frequency = entry;
    data.hasDefinition = true;
    for (const e of data.ethym) {
      if (!entry.pinyin.split('/').includes(e.pinyin)) {
        console.log("warning: different pinyin: %s %s != %s", key, e.pinyin,
            entry.pinyin);
      }
    }
  });

export const hsk = loadHsk(hsk1Raw, 1);
console.log(
  "Total HSK3 database: %d rows, %d entries, %d words, %s characters",
  hsk.counter, hsk.entries.size, hsk.words.size, hsk.characters.size);

hsk.entries.entries()
  .filter(([key, entry]) => database.has(key))
  .forEach(([key, entry]) => {
    database.get(key).hsk = entry;
  });

hsk.words.values()
  .forEach(entry => entry.characters
    .filter(c => database.has(c))
    .map(c => [c, database.get(c)])
    .forEach(([c, data]) => {
      if (!data.words) data.words = new Set();
      data.words.add(entry);
    })
  );

export function whichNextToInput() {
  let [next, freq] = hsk.characters.values()
    .filter(c => !database.has(c) && frequency.has(c))
    .map(c => [c, frequency.get(c).value])
    .reduce((next, current) => next[1] > current[1] ? next : current, [null, 0]);
  console.log("Next character: %s (frequency == %d)", next, freq);
  return next;
}

const tones = {
  'a': 'āáǎà',
  'e': 'ēéěè',
  'i': 'īíǐì',
  'o': 'ōóǒò',
  'u': 'ūúǔù',
  'ü': 'ǖǘǚǜ',
};
const pattern = '([^aeiouü]*)([iuü]?)([aeiouüø]+[ngr]*)([1-4])?';

export function correctPinyinAccent(pinyin) {
  const match = pinyin.match(new RegExp(pattern));
  if (!match[4]) return pinyin;
  let nucleus = tones[match[3].charAt(0)].charAt(match[4] - 1);
  return match[1] + match[2] + nucleus + match[3].substr(1);
}

const consonants = {
  'b': 'p',
  'p': 'pʰ',
  'm': 'm',
  'f': 'f',
  'd': 't',
  't': 'tʰ',
  'n': 'n',
  'l': 'l',
  'g': 'k',
  'k': 'kʰ',
  'h': 'h',
  'z': 'ts',
  'c': 'tsʰ',
  's': 's',
  'zh': 'tʃ',
  'ch': 'tʃʰ',
  'sh': 'ʃ',
  'j': 'tɕ',
  'q': 'tɕʰ',
  'x': 'ɕ',
  'r': 'ɹ',
  'w': 'w',
  'y': 'j',
  'ng': 'ŋ',
};
const semivowels = {
  'i': 'j',
  'u': 'w',
  'ü': 'ɥ',
}
const vowels = {
  'ø': 'ɨ',
  'e': 'ə',
  'ao': 'au',
  'o': 'ʊ',
  'ü': 'y',
};
const iVowels = {
  'ao': 'au',
  'u': 'ou',
  'an': 'ɛn',
  'o': 'ʊ',
  'ü': 'y',
};
const uVowels = {
  'i': 'ei',
  'e': 'ə',
};

export function intoPhoneticCharacters(pinyin) {
  pinyin = pinyin
    .replace(/([pbmf])o(?![a-z])/, '$1uo')
    .replace(/([zcsr]h?)i(?![a-z])/, '$1ø')
    .replace(/([jqxy])u/, '$1ü');

  const match = pinyin.match(new RegExp(pattern));
  let vowelTable = vowels;
  let phonetic = (consonants[match[1]] ?? '') + (semivowels[match[2]] ?? '');
  if (match[2] || match[1] === 'y' || match[1] === 'w') {
    vowelTable = match[2] === 'u' || match[1] === 'w' ? uVowels : iVowels;
  }
  if (match[3] in vowelTable) {
    phonetic += vowelTable[match[3]];
  } else {
    const coda = match[3].match('([aeiouü]+)(ng|n|r)?');
    phonetic += (vowelTable[coda[1]] ?? coda[1]) + (consonants[coda[2]] ?? '');
  }
  phonetic = phonetic
    .replace(/ji/, 'i')
    .replace(/wu/, 'u')
    .replace(/jy/, 'y')
    .replace(/(jw|jɥ)/, 'ɥ');
  return phonetic;
}

function setPhoneticInfo(data) {
  if (!data.pinyin) return;
  data.phonetic = intoPhoneticCharacters(data.pinyin);
  data.pinyin = correctPinyinAccent(data.pinyin);
}

database.values().forEach(data => {
  setPhoneticInfo(data);
  data.ethym?.forEach(ethym => setPhoneticInfo(ethym));
});
