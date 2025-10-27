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

  '他': {
    index: ['人', 3],
    composition: '⿰亻也',
    origin: 'phono-semantic: semantic 亻 (“man”) + phonetic 也',
    ethym: [{
      pinyin: 'ta1',
      definitions: [
        '(originally gender-neutral; nowadays usually referring to males) he, him; she, her',
        'other; another',
      ],
    }],
  },

  '亻': {
    index: ['人', 0],
    composition: '⿱丿丨',
    origin: 'a stylization of 人',
    pinyin:  'ren2',
    radical: 'person',
  },

  '也': {
    index: ['乙', 2],
    composition: '⿻乜丨',
    origin: 'pictogram: a child (子) with their mouth (口) open crying; later the arms were removed and the components were fused together',
    ethym: [{
      pinyin: 'ye3',
      definitions: [
        'also; too; as well; (in negative sentences) neither; either',
        'used for emphasis',
      ],
    }],
  },

  '乙': {
    root: [5, 1],
    origin: 'unknown pictogram: maybe a developing plant; maybe the intestine of a fish',
    ethym: [{
      pinyin: 'yi3',
      definitions: [
        'the second of the ten heavenly stems',
        'second; 2; B; II; beta',
      ],
    }],
  },

  '这': {
    index: ['辵', 4, 7],
    composition: '⿺辶文',
    origin: 'alternative form of 這; phono-semantic: semantic 辶 (“walk”) + phonetic 言',
    ethym: [{
      pinyin: 'zhe4',
      definitions: [
        'this; these',
        'at this moment; right away; at once',
        'here',
      ],
    }],
  },

  '辵': {
    root: [162, 7],
    composition: '⿱彡龰',
    origin: 'ideogram: 彳 (“walk”) + 止 (“foot” or “to stop”)',
    ethym: [{
      pinyin: 'chuo4',
      definitions: [
        '(historical dictionaries only) to walk for a while and be still for a while',
      ],
    }],
  },

  '辶': {
    index: ['辵', 0, 3],
    composition: '⿳丶𠃍乀',
    origin: 'combining form of 辵',
    pinyin: 'chuo4',
    radical: 'walk, road',
  },

  '个': {
    index: ['丨', 2],
    composition: '⿱𠆢丨',
    origin: 'variant of 箇 (“bamboo stalk”); pictogram: half of 竹 (“bamboo”), perhaps from the developed concept of "piece, item"',
    ethym: [{
      pinyin: 'ge4',
      definitions: [
        'single; alone; individual',
        'height; build; stature',
        'generic classifier for people or for things lacking specific classifiers',
        'classifier for hours and months',
        'particle between a verb and its complement',
      ],
    }],
  },

  '丨': {
    root: [2, 1],
    origin: 'pictogram of a vertical wooden stick',
    pinyin: 'gun3',
    radical: 'stick, rod',
  },

  '们': {
    index: ['人', 3],
    composition: '⿰亻门',
    origin: 'simplified from 們; phono-semantic: semantic 亻 (“person”) + phonetic 門',
    ethym: [{
      pinyin: 'men',
      definitions: [
        'suffix indicating plural for pronouns, some animated nouns and personifications',
        'suffix attached to the name of the representative of a group to refer to that whole group',
      ],
    }],
  },

  '门': {
    root: [0, 3],
    composition: '⿲丨丶𠃌',
    origin: 'simplified form of 門; pictogram: a gate',
    ethym: [{
      pinyin: 'men2',
      definitions: [
        'gate; door; entrance; opening; portal (classifier: 扇)',
        'valve; switch',
        'way of doing something; knack',
        'family',
        'school; sect; school of thought; tradition',
        'class; category',
        'classifier for lessons, subjects, branches of technology, and languages',
        'classifier for livelihoods, trades, skills, businesses, etc.',
        'classifier for thoughts, ideas, or emotions, particularly those forming a system or complex',
        'classifier for marriage, romantic, or family relations',
      ],
    }],
  },

  '中': {
    index: ['丨', 3],
    composition: '⿻口丨',
    origin: 'pictogram: a flagpole; maybe a vertical stroke 丨 passing through the center of 口',
    ethym: [{
      pinyin: 'zhong1',
      definitions: [
        'middle; center',
        'medium; intermediary',
        'within; among; in',
        'while; in the process of; during; in the middle of',
        'to be fit for',
        'heart; innermost being',
        'intermediary',
        'short for 中国; China, Chinese',
      ],
    }, {
      pinyin: 'zhong4',
      definitions: [
        'to hit the mark; to be correct; to be successful',
        'to be hit by; to suffer; to be affected by',
        'to win (a prize, a lottery)',
      ],
    }],
  },

  '来': {
    index: ['木', 3],
    composition: '⿻未丷',
    origin: 'variant of 來; pictogram: wheat; original character of 麥 (“wheat”); maybe from mythological saying, that it comes from heaven',
    ethym: [{
      pinyin: 'lai2',
      definitions: [
        'to come; to arrive',
        'to happen; to occur',
        'to do (specific meaning depending on the context)',
        'since',
        'next; coming; future',
        '(after a number) about; approximately; around',
        'used after a verb of motion to indicate movement toward the speaker',
        'used before a verb to express volition',
        'an interjection to draw attention',
        'used with 不 or 得 to express capability',
      ],
    }],
  },

  '木': {
    root: [0, 4],
    composition: '⿻十𠆢',
    origin: 'pictogram: a tree, with branches on top and roots on bottom',
    ethym: [{
      pinyin: 'mu4',
      definitions: [
        'tree; woody plant',
        'wood; timber (classifier: 条)',
        'wooden',
        'simple; plain; slow; emotionless; wooden',
        'numb',
      ],
    }],
  },

  '上': {
    index: ['一', 2],
    composition: '⿱⺊一',
    origin: 'ideogram: a line above another; contrast 下 (“under”)',
    ethym: [{
      pinyin: 'shang4',
      definitions: [
        'upper part; high position; up',
        'on; above',
        'superior; senior; top',
        'preceding; previous; last; former',
        'first of several (usually two or three) partitions',
        'within; in; from the standpoint of; according to',
      ],
    }, {
      pinyin: 'shang4',
      definitions: [
        'to go up; to ascend',
        'to charge; to advance',
        'to go to; to leave for (a place)',
        'to board; to get on',
        'to serve; to present; to offer',
        'to attend (class, work)',
        'to enter (a field); to appear (on stage, TV)',
        'to fit; to install; to apply',
        'to screw; to tighten, to twist',
      ],
    }],
  },

  '大': {
    root: [37, 3],
    composition: '⿻一人',
    origin: 'pictogram: a person facing forward; compare 人 (“person”), which represents the profile of a person',
    ethym: [{
      pinyin: 'da4',
      definitions: [
        'of great size; big; large; huge',
        'big; great',
        'in an extreme manner; greatly',
        'main; major',
        'well-known; successful (only applied to some occupations)',
        'mature; grown up',
      ],
    }],
  },

  '为': {
    index: ['丶', 3],
    composition: '⿸⿵丶力丶',
    origin: 'from cursive script of 為; ideogram: 又 (“hand”) + 象 (“elephant”) — a hand holding an elephant',
    ethym: [{
      pinyin: 'wei2',
      definitions: [
        'to do; to make',
        'to administer; to govern',
        'to construct; to make',
        'to become; to turn into',
        'to be (equivalent to, equal to)',
        'to take something as',
        'to act as; to serve as; to behave as',
        'by',
        'suffix used after a single-character adjective to form an adverb',
      ],
    }, {
      pinyin: 'wei4',
      definitions: [
        'for',
        'because of',
        'for the sake of',
      ],
    }],
  },

  '丶': {
    root: [3, 1],
    origin: 'ideogram: just a point; however, it can represent many different things: ice (冰), water (汉), minerals (丹), an eye (鸟), etc.',
    pinyin: 'zhu3',
    radical: 'dot',
  },

  '和': {
    index: ['口', 5],
    composition: '⿰禾口',
    origin: 'phono-semantic: phonetic 禾 + semantic 口 (“mouth”), meaning harmony; perhaps through its concept in music',
    ethym: [{
      pinyin: 'he2',
      definitions: [
        'peaceful; harmonious',
        'gentle; kind',
        'warm; temperate',
        'sum; total',
        'to make peace; to become reconciled',
      ],
    }, {
      pinyin: 'he2',
      definitions: [
        'and',
        'with',
      ],
    }, {
      pinyin: 'huo2',
      definitions: [
        'to mix with water to make something stick together; to knead ',
        'to mix (usually substances in powder or grain form)',
        'to add water to make something less thick',
      ],
    }],
  },

  '口': {
    root: [30, 3],
    composition: '⿱冂一',
    origin: 'pictogram: resembles an open mouth',
    ethym: [{
      pinyin: 'kou3',
      definitions: [
        'mouth, especially the lips and internal mouth cavity (classifier: 把)',
        'entrance; opening; mouth (of an object)',
        'gateway; mountain pass',
        'hole; cut',
        'blade; edge of a knife',
        'port',
        'perimeter',
        'government organ; department',
        'classifier for family members, populations, livestock',
        'classifier for bites or mouthfuls',
      ],
    }],
  },

  '国': {
    index: ['口', 5],
    composition: '⿴囗玉',
    origin: 'simplified from 國; phono-semantic: semantic 囗 (“closure”) + phonetic 或',
    ethym: [{
      pinyin: 'guo2',
      definitions: [
        'country; nation; nation-state; kingdom',
        '(in compounds) national; representing a nation',
        'short for 国语; Mandarin',
        'short for 国民党; Kuomintang',
        'domestic; of our country (in many contexts meaning Chinese)',
        'classifier for countries (quasi-measure word)',
      ],
    }],
  },

  '地': {
    index: ['土', 0],
    composition: '⿰土也',
    origin: 'phono-semantic: semantic 土 (“earth”) + phonetic 也',
    ethym: [{
      pinyin: 'di4',
      definitions: [
        'earth',
        'ground; floor',
        'land; field (classifier: 块)',
        'distance; separation',
        '(only in compounds) area; region',
        'place; locality',
        'status; situation; position',
        '(only in compounds) state of mind',
        'place; room; space',
        'background (behind a text or figure)',
      ],
    }, {
      pinyin: 'de',
      definitions: [
        '(chiefly Mandarin) particle indicating the preceding word is used as an adverb',
      ],
    }],
  },

  '到': {
    index: ['刀', 6],
    composition: '⿰至刂',
    origin: 'phono-semantic: semantic 至 (“to arrive”) + phonetic 刀',
    ethym: [{
      pinyin: 'dao4',
      definitions: [
        'to arrive at a destination; to reach a destination; to get to',
        'to go to; to leave for',
        'used as a verbal complement to indicate the (successful) completion of an action',
        '(chiefly in the negative) to reach',
        'to; to (a place); to (a time); until; up to',
      ],
    }],
  },

  '至': {
    root: [133, 6],
    composition: '⿱⿱一厶土',
    origin: 'ideogram: an arrow stuck into the ground',
    ethym: [{
      pinyin: 'zhi4',
      definitions: [
        'to reach; to arrive',
        'extreme; most',
        'from … to …',
      ],
    }],
  },

  '刀': {
    root: [18, 2],
    composition: '⿹𠃌丿',
    origin: 'pictogram: a knife',
    ethym: [{
      pinyin: 'dao1',
      definitions: [
        'knife; blade (classifier: 把)',
        'single-edged sword; cutlass',
        'classifier for sets of one hundred sheets of paper',
        'classifier for incisions with a knife, blade, single-edged sword, etc.',
      ],
    }],
  },

  '刂': {
    index: ['刀', 0],
    composition: ' ⿰丨亅',
    origin: 'radical form of 刀 (“knife”)',
    pinyin: 'dao1',
    radical: 'knife',
  },

  '以': {
    index: ['人', 3],
    composition: '⿲𠄌丶人',
    origin: 'pictogram: a person (人) carrying something',
    ethym: [{
      pinyin: 'yi3',
      definitions: [
        'a preposition that expresses a boundary in time, orientation, direction or quantity',
        'by; with; by means of',
        'according to',
        'so as to; in order to',
        'to use',
        'short for 以色列 (Yǐsèliè, “Israel”)',
      ],
    }],
  },

  '说': {
    index: ['讠', 7],
    composition: '⿰讠兑',
    origin: 'simplified from 說 (訁 → 讠); phono-semantic: semantic 言 (“to speak”) + phonetic 兌',
    ethym: [{
      pinyin: 'shuo1',
      definitions: [
        'to say; to speak',
        'to explain',
        'to refer to',
        'to discuss',
        'to introduce; to bring parties together',
        'to criticize; to scold; to upbraid',
        'to perform',
        'theory; explanation',
      ],
    }, {
      pinyin: 'shui4',
      definitions: [
        'to persuade; to canvass; to lobby',
      ],
    }],
  },

  '讠': {
    index: ['言', 0, 2],
    root: [149, 2],
    composition: '⿱丶㇊',
    origin: 'simplified form of 言 (“speech”)',
    pinyin: 'yan2',
    radical: 'speech',
  },

  '言': {
    root: [149, 7],
    composition: '⿳亠⿳一一口',
    origin: 'ideogram: a horizontal stroke is added to the top of 舌 (“tongue”) to indicate movement of the tongue',
    ethym: [{
      pinyin: 'yan2',
      definitions: [
        'to say; to speak; to talk',
        'to discuss; to comment',
        'to state; to describe; to explain',
        'to write down; to record',
        'to ask; to inquire',
        'to inform; to tell; to let know',
        'spoken language; speech',
        'opinion; view; perspective',
        'words; language appropriate to the occasion',
        'proposal; idea; plan',
        'government decree; order',
        'character; word',
        'sentence; writing; works',
      ],
    }],
  },

  '时': {
    index: ['日', 3],
    composition: '⿰日寸',
    origin: 'simplified form of 時; phono-semantic: semantic 日 (“sun; day”) + phonetic 寺',
    ethym: [{
      pinyin: 'shi2',
      definitions: [
        'season',
        'time (a duration)',
        'time (the passing of time)',
        'times; years; era',
        'time; fixed time',
        'double-hour',
        'hour; o’clock (mainly in formal writing)',
        'opportunity; chance',
        'current; contemporary',
        'that time',
        'occasionally; from time to time',
      ],
    }],
  },

  '要': {
    index: ['襾', 3],
    composition: '⿱覀女',
    origin: 'pictogram: a woman (女) with two hands pointing to her midsection; the upper part was eventually stylized as 覀',
    ethym: [{
      pinyin: 'yao1',
      definitions: [
        'to demand; to ask; to request',
        'to force; to coerce',
        'to promise',
        'to block; to intercept',
      ],
    }, {
      pinyin: 'yao4',
      definitions: [
        'to want; to wish',
        'to wish to have or keep',
        'to ask for',
        'to request',
        'to need',
        'will; going to (future auxiliary)',
        'should; must; to have to',
        'vital; important',
        'important points; essentials',
        'if; in case of',
      ],
    }],
  },

  '襾': {
    root: [146, 6],
    composition: '⿱一⿻凵冂',
    origin: 'pictogram: 冂 overlapped with 凵 and a horizontal stroke on top to indicate the act of covering something',
    ethym: [{
      pinyin: 'ya4',
      definitions: [
        '(historical) cover',
      ],
    }],
  },

  '覀': {
    index: ['襾', 0],
    composition: '⿱一⿻口⿰丨丨',
    origin: 'a variant form of 襾',
    pinyin: 'ya4',
    radical: 'cover',
  },

  '女': {
    root: [38, 3],
    composition: '⿻𡿨丆',
    origin: 'pictogram: a woman with breasts kneeling or standing',
    ethym: [{
      pinyin: 'nü3',
      definitions: [
        'woman; (only of humans in Standard Chinese) female',
        'daughter (classifier: 个)',
      ],
    }],
  },

  '就': {
    index: ['尢', 9],
    composition: '⿰京尤',
    origin: 'originally an ideogram: 享 (shrine) + 京 (tower), meaning "to sacrifice at a high place"; later, 尤 (“especially; even more”) replaced 享',
    ethym: [{
      pinyin: 'jiu4',
      definitions: [
        'to approach; to move towards',
        'to reach; to arrive at',
        'to undertake; to engage in ',
        'to succeed; to complete',
        'to comply; to follow; to accept',
        'to suffer; to be subjected to',
        '(of food) to go with',
        'with regard to; concerning',
        'even if; even though',
        'at once; right away ',
        '(used for emphasis) exactly; precisely; just ',
        'only; merely; just ',
        'then',
        '(used to express earliness) as early as; as soon as ',
        'as many as; as much as',
      ],
    }],
  },

  '尢': {
    root: [43, 3],
    composition: '⿸𠂇乚',
    origin: 'ideogram: a man with bent legs (jumping or collapsing)',
    ethym: [{
      pinyin: 'wang1',
      definitions: [
        '(obsolete on its own in Standard Chinese) lame; crippled',
      ],
    }],
  },
};

/*
  '': {
    index: ['', 0],
    root: [0, 0],
    composition: '',
    origin: '',
    ethym: [{
      pinyin: '',
      definitions: [
        '',
      ],
    }],
  },

  '': {
    index: ['', 0],
    root: [0, 0],
    composition: '',
    origin: '',
    pinyin: '',
    radical: '',
  },
*/
