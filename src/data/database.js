import entries from './entries.json5';
import frequencyRaw from './frequency.txt?raw';
import hsk1Raw from './hsk3-b1.txt?raw';

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

export const frequency = frequencyRaw
  .split('\n')
  .map(line => line.split('\t'))
  .filter(row => row.length >= 5)
  .reduce((map, row) => {
    map.set(row[1], {
      value: parseInt(row[2]),
      pinyin: row[4],
      meaning: row[5].replace(/\//g, '; '),
    });
    return map;
  }, new Map());
console.log("Loaded frequency data with %d entries", frequency.size);

frequency.entries()
  .filter(([key, entry]) => database.has(key))
  .map(([key, entry]) => [key, entry, database.get(key)])
  .forEach(([key, entry, data]) => {
    data.frequency = entry;
    if (data.pinyin !== entry.pinyin &&
        !(entry.pinyin.split('/').includes(data.pinyin))) {
      console.log("warning: different pinyin: %s %s != %s", key, data.pinyin,
          entry.pinyin);
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
}
const pattern = '([^aeiouü]*[iuü]?)([aeiouü]+)([1-4])?';

export function correctPinyinAccent(pinyin) {
  const match = pinyin.match(new RegExp(pattern));
  if (!match[3]) return pinyin;
  let nucleus = tones[match[2].charAt(0)].charAt(match[3] - 1);
  return match[1] + nucleus + match[2].substr(1);
}

export function intoPhoneticCharacters(pinyin) {
  return '//';
}

database.values().forEach(data => {
  data.phonetic = intoPhoneticCharacters(data.pinyin);
  data.pinyin = correctPinyinAccent(data.pinyin);
});
