import entries from './entries.js';
import database from './data.json';

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
  for (const [letter, values] of Object.entries(tones)) {
    pinyin = pinyin.replace(new RegExp(`[${values}]`, 'g'), letter);
  }
  pinyin = pinyin
    .replace(/([pbmf])o(?![a-z])/g, '$1uo')
    .replace(/([zcsr]h?)i(?![a-z])/g, '$1ø')
    .replace(/([jqxy])u/g, '$1ü')
    .toLowerCase();

  const parts = [];
  for (const part of pinyin.split(/\s+/)) {
    const match = part.match(new RegExp(pattern));
    if (!match) continue;
    let vowelTable = vowels;
    let phonetic = (consonants[match[1]] ?? '') + (semivowels[match[2]] ?? '');
    if (match[2] || match[1] === 'y' || match[1] === 'w') {
      vowelTable = match[2] === 'u' || match[1] === 'w' ? uVowels : iVowels;
    }
    if (match[3] in vowelTable) {
      phonetic += vowelTable[match[3]];
    } else {
      const coda = match[3].match('([aeiouü]+)(ng|n)?(r)?');
      phonetic += (vowelTable[coda[1]] ?? coda[1])
          + (consonants[coda[2]] ?? '') + (consonants[coda[3]] ?? '');
    }
    parts.push(phonetic
      .replace(/ji/, 'i')
      .replace(/wu/, 'u')
      .replace(/jy/, 'y')
      .replace(/(jw|jɥ)/, 'ɥ'));
  }
  return parts.join(' ');
}


Object.entries(entries).forEach(([key, entry]) => {
  if (entry.root) entry.index = [key, 0];
  const index = entry.root ? entry : entries[entry.index[0]];
  if (!index) console.log('index not found for %s: %s', key, entry.index[0]);
  else if (entry.index?.[2]) entry.strokes = entry.index[2];
  else entry.strokes = index.root[1] + (entry.index?.[1] ?? 0);

  if (entry.pinyin) entry.pinyin = correctPinyinAccent(entry.pinyin);

  if (!(key in database.words)) database.words[key] = {};
  Object.assign(database.words[key], entry);
});

for (const glyph of database.glyphs) {
  if (!database.words[glyph].index) {
    console.log("Next glyph to set input", glyph, database.words[glyph]);
    break;
  }
}

for (const [key, word] of Object.entries(database.words)) {
  word.key = key;
  if (!word.entries) {
    if (word.pinyin) word.phonetic = intoPhoneticCharacters(word.pinyin);
    continue;
  }
  for (const [pinyin, entry] of Object.entries(word.entries)) {
    entry.pinyin = pinyin;
    entry.phonetic = intoPhoneticCharacters(pinyin);
  }
  if (!word.pinyin) {
    const entries = Object.keys(word.entries);
    entries.sort((a, b) => a.localeCompare(b));
    const main = entries[0];
    word.pinyin = main;
    word.meaning = word.entries[main].definitions[0];
  }
}

for (const glyph of database.glyphs) {
  if (!(glyph in database.words)) console.log("Glyph not in database:", glyph);
  else database.words[glyph].isGlyph = true;
}

const glyphs = Object.values(database.words)
  .filter(w => w.frequency);
glyphs.sort((a, b) => b.frequency - a.frequency);
glyphs.forEach((w, i) => {
  w.percentile = (1 - i / glyphs.length) * 100;
});

console.log("Loaded database:", database);
export default database;
