#!/usr/bin/env python

import re
import csv
from collections import namedtuple
import json

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
    word = re.sub(r'u:', 'ü', word)

    def replace_pinyin(match):
        index = int(match.group(4)) - 1
        return '%s%s%s%s' % (match.group(1),
                             match.group(2),
                             table[match.group(3)[0]][index],
                             match.group(3)[1:])

    word = re.sub(r'([^aeiouü]*)([iuü]?)([aeiouüø]+[ngr]*)([1-5])',
                  replace_pinyin,
                  word)
    return re.sub(r'\sr5', 'r', word)


def fix_text(text):
    while True:
        match = re.search(r'\[([^\]]+)\]', text)
        if not match:
            break

        size = len(match.group(0))
        pinyin = fix_pinyin(match.group(1))
        length = len(pinyin.split())
        start = match.start()

        word_start = start - length
        if word_start > 1 and text[word_start - 1] == '|':
            text = text[: word_start - 1 - length] + text[word_start :]
            start -= length + 1
        text = text[:start] + f'/{pinyin}/' + text[start + size:]

    return text



class Entry:

    def __init__(self, word, pinyin, definition):
        self.word = word
        self.pinyin = pinyin
        self.definitions = [
            fix_text(re.sub(';', ',', d))
            for d in definition.split('/')
        ]


class Sentence:

    def __init__(self, id, value, pinyin, translation):
        self.id = id
        self.value = value
        self.pinyin = pinyin
        self.translation = translation


class Word:

    def __init__(self, value):
        self.value = value
        self.entries = {}
        self.frequency = 0
        self.percentile = 100.0
        self.sentences = []
        self.words = set()
        self.hsk = 0

    @property
    def is_glyph(self):
        return len(self.value) == 1

    def add_entry(self, pinyin, definition):
        pinyin = fix_pinyin(pinyin)
        self.entries[pinyin] = Entry(self, pinyin, definition)

    def add_frequency(self, frequency, percentil):
        self.frequency = frequency
        self.percentile = percentile

    def add_sentence(self, sentence):
        self.sentences.append(sentence)


print('Loading dictionary entries...')
dictionary = {}
with open(DICT_FILE) as stream:
    for line in stream.readlines():
        match = re.match(r'(\S+) (\S+) \[([^\]]+)\] /(.*)/\s*$', line)
        if match:
            key = match.group(2)
            word = dictionary.setdefault(key, Word(key))
            word.add_entry(match.group(3), match.group(4))

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
glyph_set = set()
with open(HSK_FILE) as stream:
    for line in stream.readlines():
        match = re.match(r'^(\d+)\s+(\S+)\s+(.+)$', line)
        if match:
            word = re.split(splitter, match.group(2))[0]
            if word not in dictionary:
                print('> Not found: %s: %s' % (match.group(1), word))
            else:
                hsk[word] = word_list[word] = dictionary[word]
                hsk[word].hsk = 1
                for glyph in word:
                    if glyph not in word_list:
                        assert glyph in dictionary, (
                                '%s is not in dictionary' % glyph)
                        word_list[glyph] = dictionary[glyph]
                    word_list[glyph].words.add(word)
                    glyph_set.add(glyph)

print('> Loaded %d entries' % len(hsk))


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
        unique_sentences.add(phrase)
        sentence = Sentence(len(unique_sentences), phrase, pinyin, translation)
        sentence_list[sentence.id] = sentence

        sentence_words = set()
        for index in range(len(phrase)):
            for end in range(index, len(phrase)):
                word = phrase[index : end + 1]
                if word in dictionary and word not in sentence_words:
                    dictionary[word].add_sentence(sentence)
                    sentence_words.add(word)
        unique_words |= sentence_words

print('> Loaded %d sentences (%d repeated) for %d unique words' % (
    len(unique_sentences), repeated, len(unique_words)))

for word, entry in hsk.items():
    if not entry.sentences:
        print('> Word %s has no sentences' % word)


data = {'words': word_list, 'glyphs': glyph_set, 'sentences': sentence_list}
print('Creating output with %d words, %d glyphs and %d sentences' % (
      len(word_list), len(glyph_set), len(sentence_list)))


def set_serializer(obj):
    if isinstance(obj, Sentence):
        return {
            'phrase': obj.value,
            'pinyin': obj.pinyin,
            'translation': obj.translation
        }
    if isinstance(obj, Entry):
        return {'pinyin': obj.pinyin, 'definitions': obj.definitions}
    if isinstance(obj, Word):
        data = {
            'entry': obj.entries,
            'sentences': [s.id for s in entry.sentences],
            'hsk': obj.hsk,
        }
        if obj.is_glyph:
            data.update({
                'frequency': obj.frequency,
                'words': obj.words,
            })
        return data
    if isinstance(obj, set):
        return list(obj)
    raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")

with open(JSON_OUTPUT_FILE, 'w') as stream:
    json.dump(data, stream, default=set_serializer, indent=2)

print('> JSON output data written in %s' % JSON_OUTPUT_FILE)


with open(TXT_OUTPUT_FILE, 'w') as stream:
    for key, word in word_list.items():
        if not word.hsk:
            print('* ', file=stream, end='')
        print(key, file=stream)
        for index, entry in enumerate(word.entries.values()):
            mark = f'{chr(ord('A') + index)}) ' if len(word.entries) > 1 else ''
            print(f'  {mark}{entry.pinyin}', file=stream)
            for dindex, definition in enumerate(entry.definitions):
                print(f'    {dindex + 1}. {definition}', file=stream)

print('> TXT output data written in %s' % TXT_OUTPUT_FILE)
