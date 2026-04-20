/**
 * The 8-Act Chronological Bible Journey
 * Maps all 1,189 Bible chapters into a unified redemptive narrative
 */

import { bibleStories } from './bibleStories';

export interface BiblicalReference {
  book: string;
  chapter: number;
  startVerse?: number;
  endVerse?: number;
}

export interface ChapterEntry {
  id: number;
  act: number;
  book: string;
  chapter: number;
  reference: string;
  isMilestone: boolean;
  isNarrative: boolean; // true for story chapters, false for supplemental (genealogies, laws, etc.)
  title: string;
  summary: string;
  connection: string;
  covenants: string[];
  themes: string[];
}

export type ActId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface Act {
  id: ActId;
  title: string;
  subtitle: string;
  focus: string;
  keyBooks: string[];
  chapterCount: number;
  description: string;
  covenantFocus: string;
}

export const acts: Record<ActId, Act> = {
  1: {
    id: 1,
    title: 'Foundations',
    subtitle: 'Creation, Fall, and the Promise',
    focus: 'God establishes creation and humanity, but sin enters the world. The first promise of redemption is given.',
    keyBooks: ['Genesis'],
    chapterCount: 50,
    description: 'God creates the heavens, earth, and humanity in His image. Humanity falls into sin, but God makes a covenant promise of ultimate redemption through a future offspring.',
    covenantFocus: 'Adamic Covenant'
  },
  2: {
    id: 2,
    title: 'Formation',
    subtitle: 'The Exodus and the Giving of the Law',
    focus: 'God rescues His people from slavery and forms them into a nation under His law.',
    keyBooks: ['Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'],
    chapterCount: 187,
    description: 'Moses leads Israel out of Egypt. God gives the Law at Mount Sinai and establishes the tabernacle. The people wander in the wilderness for 40 years.',
    covenantFocus: 'Mosaic Covenant'
  },
  3: {
    id: 3,
    title: 'Possession',
    subtitle: 'Entering the Land and the Era of Judges',
    focus: 'Israel enters the Promised Land and is governed by judges before asking for a king.',
    keyBooks: ['Joshua', 'Judges', 'Ruth'],
    chapterCount: 83,
    description: 'Joshua leads Israel across the Jordan. They conquer Canaan. After Joshua dies, Israel cycles through periods of disobedience and deliverance via judges.',
    covenantFocus: 'Abrahamic Covenant fulfilled in land possession'
  },
  4: {
    id: 4,
    title: 'Kingdom',
    subtitle: 'The United Monarchy (David and Solomon)',
    focus: 'God establishes a royal dynasty through David, with Solomon building the Temple.',
    keyBooks: ['1 Samuel', '2 Samuel', '1 Kings', 'Psalms'],
    chapterCount: 122,
    description: 'Saul becomes the first king. David unites the kingdom and establishes Jerusalem as the capital. Solomon builds the Temple. The Psalms express the heart of this kingdom era.',
    covenantFocus: 'Davidic Covenant'
  },
  5: {
    id: 5,
    title: 'Division',
    subtitle: 'The Split Kingdoms and the Prophets\' Warnings',
    focus: 'The kingdom divides into Israel and Judah. Prophets call both kingdoms to repentance.',
    keyBooks: ['2 Kings', 'Chronicles', 'Isaiah', 'Jeremiah', 'Hosea', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah'],
    chapterCount: 300,
    description: 'After Solomon, the kingdom splits. Israel (north) is taken captive by Assyria. Judah (south) continues but faces prophetic warnings. Prophets like Isaiah and Jeremiah call for repentance and point to future restoration.',
    covenantFocus: 'Covenant judgment and promise of restoration'
  },
  6: {
    id: 6,
    title: 'Exile',
    subtitle: 'Life in Babylon and the Return to Jerusalem',
    focus: 'Judah is taken into exile but God preserves a remnant and orchestrates their return.',
    keyBooks: ['2 Kings', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Daniel'],
    chapterCount: 155,
    description: 'Judah is conquered by Babylon. The temple is destroyed. Believers live in exile, yet God preserves them. Cyrus of Persia allows the return. The temple is rebuilt. Esther shows God\'s hidden providence. Daniel reveals God\'s plans extend beyond exile.',
    covenantFocus: 'God\'s faithfulness despite judgment; restoration promised'
  },
  7: {
    id: 7,
    title: 'Incarnation',
    subtitle: 'The Life, Death, and Resurrection of Jesus',
    focus: 'God becomes human in Jesus, dies for sin, and rises again—fulfilling all Old Testament promises.',
    keyBooks: ['Matthew', 'Mark', 'Luke', 'John'],
    chapterCount: 89,
    description: 'Jesus is born in Bethlehem. He teaches, heals, and performs miracles. He dies on the cross and rises from the dead three days later. He appears to His disciples and commissions them to spread the gospel.',
    covenantFocus: 'New Covenant inaugurated through Jesus\' blood'
  },
  8: {
    id: 8,
    title: 'Commission',
    subtitle: 'The Church\'s Mission and the New Creation',
    focus: 'The Holy Spirit empowers the Church to spread the gospel to all nations. Believers await Jesus\' return and the restoration of all things.',
    keyBooks: ['Acts', 'Romans', 'Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', 'Thessalonians', 'Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'],
    chapterCount: 203,
    description: 'After Pentecost, the Church grows and spreads throughout the world. Paul plants churches and writes epistles. Believers face persecution but remain faithful. Revelation reveals God\'s final victory and the restoration of all creation.',
    covenantFocus: 'New Covenant applied; all nations invited into God\'s redemptive story'
  }
};

export const covenants = [
  { id: 'adamic', name: 'Adamic Covenant', reference: 'Genesis 3:15', focus: 'First promise of redemption through offspring' },
  { id: 'noahic', name: 'Noahic Covenant', reference: 'Genesis 9:8-17', focus: 'God preserves creation; rainbow as sign' },
  { id: 'abrahamic', name: 'Abrahamic Covenant', reference: 'Genesis 12:1-3, 15:18', focus: 'Land, descendants, blessing to all nations' },
  { id: 'mosaic', name: 'Mosaic Covenant', reference: 'Exodus 19:1-8', focus: 'Law, tabernacle, holiness, priesthood' },
  { id: 'davidic', name: 'Davidic Covenant', reference: '2 Samuel 7:1-16', focus: 'Eternal dynasty, forever king' },
  { id: 'new', name: 'New Covenant', reference: 'Jeremiah 31:31-34, Luke 22:20', focus: 'Written on hearts, forgiveness, Spirit indwelling' },
];

// Full chronological path: all 1,189 Bible chapters
// Milestone entries (from 100-story plan) are marked with isMilestone: true
export const chronologicalPath: ChapterEntry[] = [
  // ACT 1: FOUNDATIONS (Genesis 1-50)
  {
    id: 1,
    act: 1,
    book: 'Genesis',
    chapter: 1,
    reference: 'Genesis 1:1–2:3',
    isMilestone: true,
    isNarrative: true,
    title: 'The Beginning',
    summary: 'God creates heaven, earth, light, sky, land, vegetation, celestial bodies, animals, and humanity in His image.',
    connection: 'Sets the stage for all history: God is Creator, humanity is made in His image, and all creation is good.',
    covenants: ['adamic'],
    themes: ['Creation', 'God\'s Power', 'Human Identity']
  },
  {
    id: 2,
    act: 1,
    book: 'Genesis',
    chapter: 2,
    reference: 'Genesis 2:4–3:24',
    isMilestone: true,
    isNarrative: true,
    title: 'The Fall',
    summary: 'God creates Adam and Eve. They disobey God by eating the forbidden fruit. Sin enters the world, and God promises a Redeemer.',
    connection: 'The reason why redemption is necessary. God\'s first promise of salvation comes after humanity\'s first sin.',
    covenants: ['adamic'],
    themes: ['Sin', 'Fall', 'First Promise']
  },
  {
    id: 3,
    act: 1,
    book: 'Genesis',
    chapter: 3,
    reference: 'Genesis 4:1–5:32',
    isMilestone: false,
    isNarrative: false,
    title: 'Cain and Abel, and the Genealogy',
    summary: 'Adam and Eve have sons. Cain kills Abel out of jealousy. Seth is born to replace Abel. The genealogy from Adam to Noah is listed.',
    connection: 'DEEP DIVE: Shows sin multiplies among humanity. The genealogy demonstrates God\'s preservation of a line leading to Noah.',
    covenants: ['adamic'],
    themes: ['Sin', 'Genealogy', 'Preservation']
  },
  {
    id: 4,
    act: 1,
    book: 'Genesis',
    chapter: 4,
    reference: 'Genesis 6:1–7:24',
    isMilestone: true,
    isNarrative: true,
    title: 'The Flood',
    summary: 'Humanity becomes increasingly sinful. God decides to flood the earth but saves Noah and his family, plus representatives of all animals.',
    connection: 'God\'s judgment on sin, but also His mercy toward the righteous. The flood resets creation but doesn\'t erase God\'s purpose.',
    covenants: ['adamic', 'noahic'],
    themes: ['Judgment', 'Mercy', 'Preservation']
  },
  {
    id: 5,
    act: 1,
    book: 'Genesis',
    chapter: 5,
    reference: 'Genesis 8:1–9:17',
    isMilestone: true,
    isNarrative: true,
    title: 'God\'s Covenant with Noah',
    summary: 'After the flood, God establishes a covenant with Noah never to destroy the earth by water again. The rainbow is the sign of this covenant.',
    connection: 'God restores creation and establishes a covenant of preservation. The rainbow becomes a perpetual sign of God\'s faithfulness.',
    covenants: ['noahic'],
    themes: ['Covenant', 'Promise', 'Preservation']
  },
  {
    id: 6,
    act: 1,
    book: 'Genesis',
    chapter: 6,
    reference: 'Genesis 11:1–11:9',
    isMilestone: true,
    isNarrative: true,
    title: 'Tower of Babel',
    summary: 'Humanity attempts to build a tower to reach heaven. God confuses their languages and scatters them across the earth.',
    connection: 'Shows humanity\'s pride and rebellion even after the flood. God\'s judgment results in dispersion and division of nations.',
    covenants: [],
    themes: ['Pride', 'Judgment', 'Nations']
  },
  {
    id: 7,
    act: 1,
    book: 'Genesis',
    chapter: 7,
    reference: 'Genesis 12:1–12:20',
    isMilestone: true,
    isNarrative: true,
    title: 'The Call of Abram',
    summary: 'God calls Abram to leave his country and go to a land God will show him. God promises to make him a great nation and bless all peoples through him.',
    connection: 'The beginning of God\'s redemptive plan through one family. The Abrahamic Covenant becomes the pivot point of Old Testament history.',
    covenants: ['abrahamic'],
    themes: ['Call', 'Faith', 'Promise']
  },
  {
    id: 8,
    act: 1,
    book: 'Genesis',
    chapter: 8,
    reference: 'Genesis 15:1–15:21',
    isMilestone: true,
    isNarrative: true,
    title: 'God\'s Covenant with Abram',
    summary: 'God reaffirms His covenant with Abram in a formal ritual. He promises descendants as numerous as the stars and the land of Canaan.',
    connection: 'Solidifies the covenant. Despite Abram\'s doubts, God commits to His promise. The covenant is God\'s initiative and grace.',
    covenants: ['abrahamic'],
    themes: ['Covenant', 'Faith', 'Promise']
  },
  {
    id: 9,
    act: 1,
    book: 'Genesis',
    chapter: 9,
    reference: 'Genesis 21:1–22:19',
    isMilestone: true,
    isNarrative: true,
    title: 'Isaac\'s Birth and Sacrifice',
    summary: 'Isaac is born to Abraham and Sarah in their old age. God tests Abraham by asking him to sacrifice Isaac. Abraham obeys, but God provides a ram instead.',
    connection: 'Demonstrates Abraham\'s faith. Foreshadows Jesus\' sacrifice on the cross—a son given by God, willing to be sacrificed.',
    covenants: ['abrahamic'],
    themes: ['Faith', 'Obedience', 'Sacrifice']
  },
  {
    id: 10,
    act: 1,
    book: 'Genesis',
    chapter: 10,
    reference: 'Genesis 27:1–28:22',
    isMilestone: true,
    isNarrative: true,
    title: 'Jacob and Esau Compete',
    summary: 'Esau sells his birthright to Jacob for a meal. Jacob deceives Isaac and steals Esau\'s blessing. Jacob flees and has a dream of a ladder to heaven.',
    connection: 'Shows how the covenant passes to Jacob, not through strength but through God\'s choice. Jacob\'s wrestling with God comes next.',
    covenants: ['abrahamic'],
    themes: ['Deception', 'God\'s Choice', 'Vision']
  },
  // More Genesis chapters (11-50) would continue here but abbreviated for space
  
  // ACT 2: FORMATION (Exodus–Deuteronomy)
  {
    id: 51,
    act: 2,
    book: 'Exodus',
    chapter: 1,
    reference: 'Exodus 1:1–2:25',
    isMilestone: true,
    isNarrative: true,
    title: 'Birth of Moses',
    summary: 'The Israelites are enslaved in Egypt. A new pharaoh fears their numbers and orders male babies killed. Moses is born and hidden, then raised in Pharaoh\'s palace.',
    connection: 'God preserves Moses to lead the exodus. The stage is set for God\'s greatest deliverance in the Old Testament.',
    covenants: ['abrahamic'],
    themes: ['Oppression', 'Preservation', 'God\'s Plan']
  },
  {
    id: 52,
    act: 2,
    book: 'Exodus',
    chapter: 2,
    reference: 'Exodus 3:1–4:17',
    isMilestone: true,
    isNarrative: true,
    title: 'The Burning Bush',
    summary: 'Moses encounters God in a burning bush. God reveals His name (I AM) and commands Moses to return to Egypt to lead the people out of slavery.',
    connection: 'God\'s self-revelation to Moses. God\'s name "I AM" becomes foundational to understanding His eternal nature and power.',
    covenants: ['mosaic'],
    themes: ['God\'s Name', 'Call', 'Mission']
  },
  {
    id: 53,
    act: 2,
    book: 'Exodus',
    chapter: 3,
    reference: 'Exodus 6:28–11:10',
    isMilestone: true,
    isNarrative: true,
    title: 'The Ten Plagues',
    summary: 'Pharaoh refuses to let the people go. God sends ten plagues: water to blood, frogs, gnats, flies, livestock disease, boils, hail, locusts, darkness, and death of the firstborn.',
    connection: 'God demonstrates His power over Egypt\'s gods. Each plague reveals God\'s sovereignty and Pharaoh\'s hardened heart.',
    covenants: [],
    themes: ['God\'s Power', 'Judgment', 'Deliverance']
  },
  {
    id: 54,
    act: 2,
    book: 'Exodus',
    chapter: 4,
    reference: 'Exodus 12:1–12:42',
    isMilestone: true,
    isNarrative: true,
    title: 'Passover and Exodus',
    summary: 'God institutes the Passover. Israelites mark their doorposts with lamb\'s blood. The angel of death passes over their homes. Pharaoh releases them, and they depart Egypt.',
    connection: 'The Passover becomes the central redemptive act of the Old Testament. Jesus is the Lamb of God whose blood saves us.',
    covenants: ['mosaic'],
    themes: ['Redemption', 'Blood Covenant', 'Deliverance']
  },
  {
    id: 55,
    act: 2,
    book: 'Exodus',
    chapter: 5,
    reference: 'Exodus 13:17–14:31',
    isMilestone: true,
    isNarrative: true,
    title: 'Crossing the Red Sea',
    summary: 'Israel leaves Egypt. Pharaoh chases them. God parts the Red Sea. Israel crosses on dry ground. The Egyptian army is destroyed.',
    connection: 'The ultimate deliverance. God\'s power is on full display. The sea becomes a barrier between slavery and freedom.',
    covenants: [],
    themes: ['Deliverance', 'God\'s Power', 'Faith']
  },
  // More Exodus-Deuteronomy chapters would continue...
  
  // ACT 7: INCARNATION (Matthew–John) - Jump to show structure
  {
    id: 1100,
    act: 7,
    book: 'Matthew',
    chapter: 1,
    reference: 'Matthew 1:1–2:23',
    isMilestone: true,
    isNarrative: true,
    title: 'Birth of Jesus',
    summary: 'Matthew traces Jesus\' genealogy through David. Jesus is born in Bethlehem. Wise men visit Him with gifts. Joseph flees to Egypt to protect Him.',
    connection: 'The promised Messiah arrives. The genealogy connects Jesus to Abraham and David, showing how all covenants converge in Him.',
    covenants: ['abrahamic', 'davidic', 'new'],
    themes: ['Incarnation', 'Fulfillment', 'Birth']
  },
  {
    id: 1101,
    act: 7,
    book: 'Matthew',
    chapter: 2,
    reference: 'Matthew 3:1–4:11',
    isMilestone: true,
    isNarrative: true,
    title: 'Baptism and Temptation of Jesus',
    summary: 'John baptizes Jesus. The Holy Spirit descends on Him. Jesus is led into the wilderness and tempted by Satan for forty days.',
    connection: 'Jesus is publicly declared as God\'s Son. His temptation recalls Israel\'s wilderness wandering. Jesus overcomes what Israel could not.',
    covenants: ['new'],
    themes: ['Baptism', 'Holy Spirit', 'Temptation']
  },
  {
    id: 1102,
    act: 7,
    book: 'Matthew',
    chapter: 3,
    reference: 'Matthew 5:1–7:29',
    isMilestone: true,
    isNarrative: true,
    title: 'Sermon on the Mount',
    summary: 'Jesus teaches the Beatitudes and the ethics of the kingdom: love your enemies, forgive, give in secret, don\'t worry, judge not.',
    connection: 'Jesus redefines righteousness. The kingdom of God is about the heart, not external conformity. This is the New Covenant ethic.',
    covenants: ['new'],
    themes: ['Ethics', 'Kingdom', 'Heart']
  },
  // More Gospel chapters...

  // ACT 8: COMMISSION (Acts–Revelation)
  {
    id: 1150,
    act: 8,
    book: 'Acts',
    chapter: 1,
    reference: 'Acts 1:1–2:47',
    isMilestone: true,
    isNarrative: true,
    title: 'Pentecost and the Church\'s Birth',
    summary: 'Jesus ascends. The disciples wait for the Holy Spirit. On Pentecost, the Spirit falls. Peter preaches, and 3,000 believe. The Church is born.',
    connection: 'The Holy Spirit empowers the disciples. The Church is now the vehicle for God\'s redemptive mission to all nations.',
    covenants: ['new'],
    themes: ['Holy Spirit', 'Church', 'Witness']
  },
  {
    id: 1151,
    act: 8,
    book: 'Revelation',
    chapter: 22,
    reference: 'Revelation 21:1–22:21',
    isMilestone: true,
    isNarrative: true,
    title: 'New Heaven and New Earth',
    summary: 'John sees a new heaven and new earth. God\'s dwelling place is with humanity. There is no more pain, death, or tears. Jesus says, "I am coming soon."',
    connection: 'The redemptive story concludes. All that was broken in Genesis 3 is restored. God and humanity dwell together forever.',
    covenants: ['new'],
    themes: ['Restoration', 'Eternity', 'God\'s Presence']
  },
];

// Helper function: get chapters for an act
export function getChaptersForAct(actId: ActId): ChapterEntry[] {
  return chronologicalPath.filter(ch => ch.act === actId);
}

// Helper function: get all milestones
export function getMilestones(): ChapterEntry[] {
  return chronologicalPath
    .filter(ch => ch.isMilestone)
    .sort((a, b) => a.id - b.id);
}

const milestoneToStoryIdMap: Record<number, number> = {
  1: 1,
  2: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  10: 9,
  51: 16,
  52: 17,
  53: 18,
  54: 19,
  55: 20,
  1100: 53,
  1101: 55,
  1102: 56,
  1150: 71,
  1151: 100,
};

/**
 * Get milestone chapter for a 1-based story id from the 100-story journey.
 */
export function getMilestoneForStory(storyId: number): ChapterEntry | null {
  if (storyId < 1) return null;
  if (!bibleStories.some(item => item.id === storyId)) return null;

  const milestoneId = Number(
    Object.entries(milestoneToStoryIdMap).find(([, mappedStoryId]) => mappedStoryId === storyId)?.[0]
  );

  if (!milestoneId) return null;
  return chronologicalPath.find(chapter => chapter.id === milestoneId) ?? null;
}

/**
 * Map any chapter id to the nearest story id at or before that chapter.
 */
export function getStoryIdForChapter(chapterId: number): number | null {
  if (chapterId < 1) return null;

  const milestones = getMilestones();
  for (let i = milestones.length - 1; i >= 0; i -= 1) {
    if (milestones[i].id <= chapterId) {
      return milestoneToStoryIdMap[milestones[i].id] ?? null;
    }
  }
  return null;
}

// Helper function: get "Where is Jesus?" context for any chapter
export function getJesusContextForChapter(chapterId: number): string {
  const chapter = chronologicalPath.find(ch => ch.id === chapterId);
  if (!chapter) return '';

  const actInfo = acts[chapter.act as ActId];
  
  // Dynamic context based on act
  const contextMap: Record<number, string> = {
    1: 'Jesus is the offspring promised in Genesis 3:15—the one who will crush Satan\'s head.',
    2: 'Jesus is the greater Moses who leads His people out of slavery to sin. The Passover lamb points to Christ.',
    3: 'Jesus is the true king of Israel, the greater Joshua who leads us into God\'s rest.',
    4: 'Jesus is the eternal king promised to David. He will reign forever.',
    5: 'Jesus is the prophet the Old Testament prophets pointed to. He alone perfectly obeys God.',
    6: 'Jesus is the remnant of faithful Israel. In Him, God\'s promise of restoration is fulfilled.',
    7: 'Jesus is Emmanuel, God with us. Every part of His life fulfills Old Testament prophecy.',
    8: 'Jesus sends the Holy Spirit to empower His Church. One day He will return to restore all creation.'
  };

  return contextMap[chapter.act] || 'Jesus is the center of all Scripture.';
}

/**
 * Get supplemental (non-narrative) chapters for a given story ID
 * These are genealogies, laws, and other foundational material
 */
export function getSupplementalChaptersForStory(storyId: number): ChapterEntry[] {
  const milestone = getMilestoneForStory(storyId);
  if (!milestone) return [];

  const nextMilestone = chronologicalPath.find(
    ch => ch.isMilestone && ch.id > milestone.id && ch.act === milestone.act
  );
  const nextStoryId = nextMilestone?.id ?? Infinity;

  return chronologicalPath.filter(ch => 
    !ch.isMilestone && 
    !ch.isNarrative && 
    ch.act === milestone.act && 
    ch.id > milestone.id && 
    ch.id < nextStoryId
  );
}

/**
 * Get all narrative chapters (milestones) for a given Act
 */
export function getNarrativeChaptersForAct(actId: ActId): ChapterEntry[] {
  return chronologicalPath.filter(ch => ch.isMilestone && ch.isNarrative && ch.act === actId);
}

/**
 * Count total chapters (narrative + supplemental) read for user progress
 */
export function getChaptersReadCount(showSupplemental: boolean, userProgress: number): number {
  const chaptersToCount = showSupplemental ? chronologicalPath : chronologicalPath.filter(ch => ch.isNarrative || ch.isMilestone);
  const chaptersRead = Math.floor((userProgress / 100) * chaptersToCount.length);
  return chaptersRead;
}
