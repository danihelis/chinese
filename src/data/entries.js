export default {
  /*
  '啊': {
    index: '口+8',
    strokes: 11,
    composition: '⿰口阿',
    pinyin: 'a1',
    origin: 'phono-semantic: semantic 口 (“mouth”) + phonetic 阿',
    definitions: [
      'used as an initial interjection particle to express surprise: ah, oh, ha',
    ],
  },
  '口': {
    index: '口+0',
    root: 30,
    strokes: 3,
    composition: '⿱冂一',
    pinyin: 'kou3',
    origin: 'pictogram: resembles an open mouth',
    definitions: [
      '(anatomy) mouth, especially the lips and internal mouth cavity',
      'entrance; opening; mouth (of an object)',
      'gateway; mountain pass',
    ],
  },
  '爱': {
    index: '爪+6',
    strokes: 10,
    composition: '⿳爫冖友',
    pinyin: 'ai4',
    origin: 'variant of 愛 (of corrupted phono-semantic origin), replacing the lower half with 友 ("friend")',
    definitions: [
      'to love',
      'to treasure; to value',
      'to like; to be fond of; to be keen on',
    ],
  },
  '爫': {
    index: '爪+0',
    strokes: 4,
    composition: '⿱丿𭕄',
    pinyin: 'zhao3',
    origin: 'variant form of 爪',
    radical: 'claw',
  },
  '冖': {
    index: '冖+0',
    root: 14,
    strokes: 2,
    composition: '⿰丶乛',
    pinyin: 'mi4',
    origin: 'pictogram: a cloth used to cover something',
    radical: 'cloth cover',
  },
  '友': {
    index: '又+2',
    strokes: 4,
    composition: '⿸𠂇又',
    pinyin: 'you3',
    origin: 'phono-semantic: phonetic 又 + phonetic 又; two hands, therefore friendship',
    definitions: [
      'friend; companion',
    ],
  },
  */

  '的': {
    index: ['白', 3],
    composition: '⿰白勺',
    origin: 'phono-semantic: semantic 白 (“white”) + phonetic 勺',
    ethym: [{
      pinyin: 'de',
      definitions: [
        'used after an attribute to indicate possession; of',
        'used to link a noun, an adjective or a phrase to a noun to describe it; that, who',
        'used to express “of that kind”',
        'used to form a noun phrase or nominal expression',
        'used at the end of a declarative sentence for emphasis',
        'used after a verb or between a verb and its object to stress an element of the sentence',
      ],
    }, {
      pinyin: 'di2',
      definitions: [
        'bright; clear; distinct',
        'white; white-coloured',
        'white forehead of horses; white-foreheaded horse',
        'centre of target for archery',
        'aim; standard; criterion',
        'target; objective',
        'really; truly; certainly',
      ],
    }],
  },

  '白': {
    root: [106, 5],
    composition: '⿱丿日',
    origin: 'probably a pictogram: may represent a thumb and be the original form of 拇 ("thumb")',
    ethym: [{
      pinyin: 'bai2',
      definitions: [
        'white',
        'clear; easy to understand',
        'clear; pure; plain; blank',
        'bright; well-lit',
        'eminent; prominent',
        'vernacular; dialect',
        'in vain; for nothing',
        'free of charge; gratuitous; gratis',
        'to stare coldly; to stare at someone with the white of the eyes',
        'to explain; to present; to state',
        'to mispronounce or wrongly write a character',
        'spoken lines',
      ],
    }],
  },

  '丿': {
    root: [4, 1],
    origin: 'ideogram: the stroke itself',
    pinyin:  'pie3',
    radical: 'left-falling stroke',
  },

  '日': {
    root: [72, 4],
    composition: '⿴囗一',
    origin: 'pictogram: the Sun; a dot or line was added in the centre to distinguish it from visually similar characters, e.g. 囗',
    ethym: [{
      pinyin: 'ri4',
      definitions: [
        '(astronomy) Sun',
        'daytime; time between sunrise and sunset',
        'day; twenty-four hours',
        'everyday; daily; day-to-day',
        'day of the month',
        'some day; some other time',
        'former times; previous times; the past',
        'time; period; age',
        'short for 日本, “Japan”',
      ],
    }],
  },

  '勺': {
    index: ['勹', 1],
    composition: '⿹勹丶',
    origin: 'ideogram: something (丶) in the ladle or spoon (勹)',
    ethym: [{
      pinyin: 'shao2',
      definitions: [
        'spoon; ladle',
        'ladle-like object',
      ],
    }],
  },

  '勹': {
    root: [20, 2],
    composition: '⿰丿𠃌',
    origin: 'pictogram: a person bending over',
    radical: 'wrap',
  },

  '一': {
    root: [1, 1],
    origin: 'ideogram: a horizontal stroke, indicating the number “one”',
    ethym: [{
      pinyin: 'yi1',
      definitions: [
        'one',
        'each; every',
        'single; alone',
        'whole; entire; all: throughout',
        'same; identical; uniform',
        'once; as soon as; upon',
      ],
    }],
  },

  '是': {
    index: ['日', 5],
    composition: '⿱日𤴓',
    origin: 'phono-semantic of unclear origin; maybe a compound of 日 (“sun”) + 正 (“upright; right”) (i.e. as the upright sun)',
    ethym: [{
      pinyin: 'shi4',
      definitions: [
        '(copulative) to be (used only to link two nouns or nominal expressions)',
        'a particle emphasizing the word following it',
        'a particle showing agreement; truly, indeed',
        'a particle used in an alternative or a negative question',
        '(in affirmative answers) yes; right',
        'true; correct',
      ],
    }],
  },

  '𤴓': {
    index: ['疋', 0],
    composition: '⿱一龰',
    origin: 'variant form of 正',
    radical: 'straight; upright',
  },

  '不': {
    index: ['一', 3],
    composition: '⿸丆⿰丨丶',
    origin: 'pictogram: originally the calyx of a flower; it was composed into phono-semantic 否 (“no”) and became its synonym',
    ethym: [{
      pinyin: 'bu4',
      definitions: [
        '(preceding verbs and adjectives) not',
        '(between a verb and a complement) cannot',
        'used as an answer of refutation to a polar question: no (is it?), yes (isn’t it?)',
        'used with 就 to indicate the first of two alternatives; either',
      ],
    }],
  },

  '了': {
    index: ['亅', 1],
    composition: '⿱乛亅',
    origin: 'pictogram: a baby without arms; or maybe entangled legs',
    ethym: [{
      pinyin: 'le',
      definitions: [
        'used after a verb to indicate perfective aspect (action completion)',
        'used at the end of a sentence to indicate a change of state',
        'used at the end of a sentence to inform the beginning of an action',
        'used at the end of a sentence to demand',
      ],
    }, {
      pinyin: 'liao3',
      definitions: [
        'to be finished; to be completed',
        'to end; to finish',
        'to understand; to comprehend',
        'clear; plain; understandable',
        'bright; intelligent; smart',
        '(in negative sentences) completely; utterly; entirely',
        'Used with 不 or 得 after verbs to express possibility',
      ],
    }],
  },

  '亅': {
    root: [6, 1],
    origin: 'ideogram: the stroke itself',
    pinyin:  'jue2',
    radical: 'a backward hook',
  },

  '在': {
    index: ['土', 3],
    composition: '⿸𠂇⿰丨土',
    origin: 'phono-semantic: phonetic 才 + semantic 土 (“earth”)',
    ethym: [{
      pinyin: 'zai4',
      definitions: [
        'to exist; to be present; to be alive',
        'to be at; to be in; to be located',
        'in the middle of doing something (indicating an action in progress); be ...-ing',
        '(located) in; at',
        'during; in',
        'to lie in; to rest with',
        'to be at the post',
      ],
    }],
  },

  '土': {
    root: [32, 3],
    composition: '⿱十一',
    origin: 'pictogram: a lump of clay either on the ground or on a potter’s wheel',
    ethym: [{
      pinyin: 'tu3',
      definitions: [
        'earth; soil',
        'land',
        'hometown; native place',
        'local; native; indigenous',
        'rustic; unsophisticated; uncouth; vulgar; tasteless; uncultured',
        'indigenous; traditional and used by the common people',
        'crude opium',
      ],
    }],
  },

  '人': {
    root: [9, 2],
    composition: '⿸丿㇏',
    origin: 'pictogram: side view of a standing man, highlighting an arm and a leg',
    ethym: [{
      pinyin: 'ren2',
      definitions: [
        'man; person; people (classifier: 个)',
        'a person associated with a particular identity or trait; -er',
        'body',
        'everybody; everyone',
        'other people; others',
        'physical, psychological or moral quality or condition; character; personality',
        'manpower; worker; employee ',
        'talent; person of talent',
        'adult; grown-up ',
        'artificial; man-made ',
      ],
    }],
  },

  '有': {
    index: ['月', 2],
    composition: '⿸𠂇月',
    origin: 'phono-semantic: phonetic 又 + semantic 肉 (“meat”); 又 has been abstracted to 𠂇, and 肉 to 月',
    ethym: [{
      pinyin: 'you3',
      definitions: [
        'to have; to possess (when a subject is present)',
        'there is; to exist (when a subject is absent)',
        'abundant; affluent',
        'many; much; (of time) long; (of age) old',
        'some (indefinite pronoun)',
      ],
    }],
  },

  '月': {
    root: [74, 4],
    composition: '⿵⺆⿱一一',
    origin: 'pictogram: pictographic representation of a crescent moon; related to 夕',
    ethym: [{
      pinyin: 'yue4',
      definitions: [
        'moon-shaped; round like a moon',
        'month (classifier: 个)',
        'monthly',
        'classifier for months',
      ],
    }],
  },

  '我': {
    index: ['戈', 3],
    composition: '⿻⿱丿⿻一亅戈',
    origin: 'pictogram: a trident-like weapon or tool; folk ethymology imagines a hand (手) holding a weapon (戈) to protect oneself',
    ethym: [{
      pinyin: 'wo3',
      definitions: [
        'I; me; my',
      ],
    }],
  },

  '戈': {
    root: [62, 4],
    composition: '⿻弋丿',
    origin: 'pictogram: an ancient weapon with a single blade',
    ethym: [{
      pinyin: 'ge1',
      definitions: [
        '(historical) dagger-axe',
      ],
    }],
  },
};

/*
  '': {
    index: '',
    root: [0, 0],
    composition: '',
    origin: '',
    ethym: [{
      pinyin: '',
      definitions: [
      ],
    }],
  },

  '': {
    index: '',
    root: [0, 0],
    composition: '',
    origin: '',
    pinyin:  '',
    radical: '',
  },
*/
