#!/usr/bin/env python

import re
import csv
from collections import namedtuple
import json
import random

DICT_FILE = 'cedict_ts.u8'
FREQ_FILE = 'frequency.txt'
HSK_FILE = 'hsk3-b1.txt'
SENT_FILE = 'sentences.txt'
JSON_OUTPUT_FILE = 'data.json'
TXT_OUTPUT_FILE = 'data.txt'


def fix_pinyin(word):
    table = {
        'r': 'rrrrr',
        'a': 'āáǎàa',
        'e': 'ēéěèe',
        'i': 'īíǐìi',
        'o': 'ōóǒòo',
        'u': 'ūúǔùu',
        'ü': 'ǖǘǚǜü',
    }
    word = re.sub(r'u\s*:\s*', 'ü', word)

    def replace_pinyin(match):
        index = int(match.group(4)) - 1
        return '%s%s%s%s' % (match.group(1),
                             match.group(2),
                             table[match.group(3)[0]][index],
                             match.group(3)[1:])

    word = re.sub(r'([^aeiouü]*)([iuü]?)([aeiouüø]+[ngr]*)([1-5])',
                  replace_pinyin,
                  word)
    return re.sub(r'\s?r5', 'r', word)


def fix_text(text):
    while True:
        match = re.search(r'\[([^\]]+)\]', text)
        if not match:
            break

        size = len(match.group(0))
        pinyin = fix_pinyin(match.group(1))
        length = len(match.group(1).split())
        start = match.start()

        has_word = text[start - 1] != ' '
        word_start = start - length
        if has_word and word_start > 1 and text[word_start - 1] == '|':
            text = text[: word_start - 1 - length] + text[word_start :]
            start -= length + 1
            word_start -= length + 1
        if has_word and word_start > 0 and text[word_start - 1] != ' ':
            text = f'{text[:word_start]} {text[word_start:]}'
            start += 1

        text = (text[:start] + (f' %<{pinyin}>%' if has_word else pinyin) +
                text[start + size:])

    return re.sub('%<', '[', re.sub('>%', ']', text))



class Entry:

    def __init__(self, word, pinyin):
        self.word = word
        self.pinyin = pinyin
        self.definitions = []

    def add_definition(self, definition):
        new_definitions = [
            fix_text(re.sub(';', ',', d))
            for d in definition.split('/')
        ]

        def is_not_variant(phrase):
            return not (phrase.find('variant of') >= 0 and
                        re.search(r'\b%s\b' % self.word.value, phrase))

        self.definitions += list(filter(is_not_variant, new_definitions))


    @property
    def short_definition(self):
        d = '; '.join(self.definitions)
        if len(d) > 80:
            d = d[:79] + '…'
        return d


class Sentence:

    def __init__(self, id, value, pinyin, translation):
        self.id = id
        self.value = value
        self.pinyin = pinyin
        self.translation = translation
        self.contents = []

    def set_contents(self, contents):
        self.contents = contents
        self.glyphs = {}
        for w in self.words:
            self.glyphs.update(w.glyphs)
        for w in self.words:
            w.sentences.add(self)
        for g in self.glyphs.values():
            g.sentences.add(self)

    @property
    def words(self):
        return filter(lambda w: isinstance(w, Word), self.contents)

    def __str__(self):
        return self.value


class Word:

    def __init__(self, value):
        self.value = value
        self.entries = {}
        self.sentences = set()
        self.words = set()
        self.glyphs = {}
        self.hsk = 0
        self.hsk_pinyin = None
        self.hsk_definition = None

    def __str__(self):
        return self.value

    @property
    def is_glyph(self):
        return len(self.value) == 1

    def add_entry(self, pinyin, definition):
        pinyin = fix_pinyin(pinyin)
        if pinyin not in self.entries:
            self.entries[pinyin] = Entry(self, pinyin)
        self.entries[pinyin].add_definition(definition)
        if not self.entries[pinyin].definitions:
            del self.entries[pinyin]

    def add_frequency(self, frequency, percentil):
        self.frequency = frequency
        self.percentile = percentile

    @property
    def default_pinyin(self):
        if self.hsk_pinyin:
            return self.hsk_pinyin
        e = list(filter(lambda e: e.pinyin.islower(), self.entries.values()))
        e = sorted(e, key=lambda e: len(e.definitions), reverse=True)
        assert e, 'no entry found for default pinyin'
        return e[0].pinyin

    @property
    def default_definition(self):
        e = self.entries[self.default_pinyin]
        return e.short_definition


print('Loading dictionary entries...')
dictionary = {}
with open(DICT_FILE) as stream:
    for line in stream.readlines():
        match = re.match(r'(\S+) (\S+) \[([^\]]+)\] /(.*)/\s*$', line)
        if match:
            key = match.group(2)
            word = dictionary.setdefault(key, Word(key))
            word.add_entry(match.group(3), match.group(4))

for w in dictionary.values():
    for g in w.value:
        if g in dictionary:
            entry = w.glyphs[g] = dictionary[g]
            entry.words.add(w)

print('> Loaded %d entries' % len(dictionary))


print('Loading frequency entries...')
found, not_found = 0, 0
with open(FREQ_FILE) as stream:
    for line in stream.readlines():
        match = re.match(r'^\d+\s+(\S)\s+(\d+)\s+(\d+\.\d+)\s+(\S+)', line)
        if match:
            glyph = match.group(1)
            frequency = int(match.group(2))
            percentile = float(match.group(3))
            if glyph in dictionary:
               dictionary[glyph].add_frequency(frequency, percentile)
               found += 1
            else:
                not_found += 1

print('> Loaded %d frequencies (%d not found)' % (found, not_found))


print('Loading HSK entries...')
splitter = r'[%s]' % '（｜'
hsk = {}
word_list = {}
glyph_list = {}

def add_to_word_list(word):
    return entry

with open(HSK_FILE) as stream:
    for line in stream.readlines():
        match = re.match(r'^(\d+)\t(\S+)\t([^\t]+)\t(.*)$', line)
        if not match:
            print('> Could not parse:', line)
        elif (re.search(splitter, match.group(2)) or
              re.search(splitter, match.group(3))):
            print('> Composed entry:', line)
        else:
            word = match.group(2).strip()
            if word not in dictionary:
                print('> Not found: %s: %s' % (match.group(1), word))
            elif word in hsk:
                print('> Repeated: %s: %s' % (match.group(1), word))
            else:
                entry = hsk[word] = word_list[word] = dictionary[word]
                glyph_list.update(entry.glyphs)
                entry.hsk = 1
                entry.hsk_pinyin = match.group(3).strip()
                entry.hsk_definition = match.group(4).strip()

print('> Loaded %d entries (%d words, %d glyphs)' % (
    len(hsk), len(word_list), len(glyph_list)))


print('Loading sentence csv file...')
unique_words, unique_sentences = set(), set()
sentence_list = {}
repeated = 0
with open(SENT_FILE) as stream:
    reader = csv.DictReader(stream)
    for key in ['Word', 'Sentence', 'Pinyin', 'Translation']:
        assert key in reader.fieldnames, '%s not in csv' % key

    for index, row in enumerate(reader):
        phrase = re.sub(r'\s+', '', row['Sentence'])
        pinyin = row['Pinyin']
        translation = row['Translation']

        if phrase in unique_sentences:
            repeated += 1
            continue

        skip = False
        for g in phrase:
            if g in dictionary and g not in glyph_list:
                print('>>> Glyph not part of HSK:', g)
                # skip = True
        if skip:
            continue

        unique_sentences.add(phrase)
        sentence = Sentence(len(unique_sentences), phrase, pinyin, translation)
        sentence_list[sentence.id] = sentence

        sentence_words = set()
        start = 0
        contents = []
        while start < len(phrase):
            words = [
                phrase[start:end]
                for end in range(start + 1, len(phrase) + 1)
            ]
            words = [
                dictionary[w]
                for w in words
                if w in dictionary
            ]
            if not words:
                contents.append(phrase[start])
                start += 1
            else:
                words = [(w.hsk, len(w.value), w) for w in words]
                _, length, word = sorted(words, reverse=True)[0]
                contents.append(word)
                start += length

        sentence.set_contents(contents)
        for word in sentence.words:
            unique_words.add(word)
            if word not in word_list:
                word_list[word.value] = word
                glyph_list.update(word.glyphs)

print('> Loaded %d sentences (%d repeated) for %d unique words' % (
    len(unique_sentences), repeated, len(unique_words)))

for word, entry in hsk.items():
    if not entry.sentences:
        print('> Word %s has no sentences' % word)


print('Computing learning order...')
learning_order = []
remaining_sentences = set(sentence_list.values())
remaining_glyphs = set(glyph_list.values())

while remaining_sentences:
    for g in remaining_glyphs:
        g.score = 1 if g.hsk else 0
        g.score += sum(1 if w.hsk else 0 for w in g.words)
        g.score += sum(
            1
            for s in g.sentences
            if s in remaining_sentences
        )

    for s in remaining_sentences:
        glyphs = remaining_glyphs & set(s.glyphs.values())
        s.score = sum(g.score for g in glyphs) / (len(glyphs) or 1)

    sentence = sorted(remaining_sentences,
                      key=lambda s: s.score,
                      reverse=True)[0]

    new_glyphs = sorted(
        remaining_glyphs & set(sentence.glyphs.values()),
        key=lambda g: g.score,
        reverse=True)
    remaining_glyphs = remaining_glyphs - set(new_glyphs)
    learning_order += new_glyphs

    remaining_sentences = set(
        s
        for s in remaining_sentences
        if any(g in remaining_glyphs for g in s.glyphs.values())
    )


word_list.update(glyph_list)

data = {
    'words': word_list,
    'glyphs': [g.value for g in learning_order],
    'sentences': sentence_list}
print('Creating output with %d words, %d glyphs and %d sentences' % (
      len(word_list), len(glyph_list), len(sentence_list)))


def set_serializer(obj):
    if isinstance(obj, Sentence):
        return {
            'contents': [str(w) for w in obj.contents],
            'pinyin': obj.pinyin,
            'translation': obj.translation
        }
    if isinstance(obj, Entry):
        return {'definitions': obj.definitions}
    if isinstance(obj, Word):
        data = {
            'entries': obj.entries,
            'sentences': [s.id for s in obj.sentences],
            'hsk': obj.hsk,
        }
        if obj.hsk:
            data.update({
                'pinyin': obj.hsk_pinyin,
                'meaning': obj.hsk_definition,
            })
        if obj.is_glyph:
            data.update({
                'frequency': obj.frequency,
                'words': [
                    w.value
                    for w in obj.words
                    if w.value in word_list and not w.is_glyph
                ],
            })
        return data
    if isinstance(obj, set):
        return list(obj)
    raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")

with open(JSON_OUTPUT_FILE, 'w') as stream:
    json.dump(data, stream, default=set_serializer, indent=2)

print('> JSON output data written in %s' % JSON_OUTPUT_FILE)


with open(TXT_OUTPUT_FILE, 'w') as stream:

    def print_word(word):
        if not word.hsk:
            print('* ', file=stream, end='')
        print(word.value, file=stream, end='' if word.hsk else '\n')
        if word.hsk:
            print(f' /{word.hsk_pinyin}/ {word.hsk_definition}', file=stream)
        for index, entry in enumerate(word.entries.values()):
            mark = f'{chr(ord('A') + index)}) ' if len(word.entries) > 1 else ''
            print(f'  {mark}{entry.pinyin}', file=stream)
            for dindex, definition in enumerate(entry.definitions):
                print(f'    {dindex + 1}. {definition}', file=stream)
        if not word.sentences:
            print('  ~NO SENTENCES~', file=stream)
        for s in random.sample(list(word.sentences),
                               min(3, len(word.sentences))):
            print(f'  * {s.value} {s.pinyin} {s.translation}',
                  ' '.join(str(w) for w in s.contents),
                  file=stream)

    for glyph in learning_order:
        print_word(glyph)

    for word in word_list.values():
        if not word.is_glyph:
            print_word(word)

print('> TXT output data written in %s' % TXT_OUTPUT_FILE)
