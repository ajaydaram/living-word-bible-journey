import { bibleStories, type BibleStory } from './bibleStories';

export type NarrativeMovementId = 'creation' | 'fall' | 'redemption' | 'restoration';

export type PersonaId = 'disoriented-reader' | 'visual-learner' | 'analytical-student';

export interface NarrativeMovement {
  id: NarrativeMovementId;
  label: string;
  shortLabel: string;
  description: string;
  range: [number, number];
  accent: string;
}

export interface CovenantNode {
  label: string;
  description: string;
  range: [number, number];
  scripture: string;
}

export interface PersonaProfile {
  id: PersonaId;
  label: string;
  description: string;
  need: string;
  emphasis: string;
}

export interface ReadingPlan {
  title: string;
  theme: string;
  description: string;
  storyIds: number[];
}

export interface ThematicThread extends ReadingPlan {
  id: string;
  accent: string;
}

export interface CrossReferenceLink {
  storyId: number;
  label: string;
  reason: string;
}

export interface StoryNarrativeTag {
  movement: NarrativeMovement;
  covenant: CovenantNode;
  relatedStories: CrossReferenceLink[];
  themeLabels: string[];
}

export const narrativeMovements: NarrativeMovement[] = [
  {
    id: 'creation',
    label: 'Creation',
    shortLabel: 'Creation',
    description: 'God establishes order, identity, and vocation.',
    range: [1, 5],
    accent: '#7b8a56',
  },
  {
    id: 'fall',
    label: 'Fall',
    shortLabel: 'Fall',
    description: 'Humanity fractures, but promise and covenant begin the rescue.',
    range: [6, 50],
    accent: '#b07a4a',
  },
  {
    id: 'redemption',
    label: 'Redemption',
    shortLabel: 'Redemption',
    description: 'God rescues, teaches, and gathers a covenant people in Christ.',
    range: [51, 95],
    accent: '#3f5d66',
  },
  {
    id: 'restoration',
    label: 'Restoration',
    shortLabel: 'Restoration',
    description: 'The story resolves in new creation and God dwelling with humanity.',
    range: [96, 100],
    accent: '#7b5a8b',
  },
];

export const covenantNodes: CovenantNode[] = [
  {
    label: 'Creation Mandate',
    description: 'Humanity is commissioned to cultivate and fill the earth.',
    range: [1, 1],
    scripture: 'Genesis 1-2',
  },
  {
    label: 'Adamic Covenant',
    description: 'Promise of conflict, suffering, and eventual victory after the fall.',
    range: [2, 5],
    scripture: 'Genesis 3',
  },
  {
    label: 'Noahic Covenant',
    description: 'Creation is preserved as God commits to the stability of the world.',
    range: [3, 5],
    scripture: 'Genesis 8-9',
  },
  {
    label: 'Abrahamic Covenant',
    description: 'Blessing moves through one family to all nations.',
    range: [6, 15],
    scripture: 'Genesis 12, 15, 17, 22',
  },
  {
    label: 'Mosaic Covenant',
    description: 'A redeemed people receives law, worship, and a way of life.',
    range: [16, 25],
    scripture: 'Exodus 19-24',
  },
  {
    label: 'Davidic Covenant',
    description: 'A forever king is promised from David\'s line.',
    range: [31, 40],
    scripture: '2 Samuel 7',
  },
  {
    label: 'New Covenant',
    description: 'Jesus secures forgiveness, the Spirit, and renewed hearts.',
    range: [51, 100],
    scripture: 'Jeremiah 31, Luke 22, Hebrews 8',
  },
];

export const personas: PersonaProfile[] = [
  {
    id: 'disoriented-reader',
    label: 'Disoriented Reader',
    description: 'Needs immediate context so ancient text feels navigable.',
    need: 'Unavoidable context and a clear next step.',
    emphasis: 'Story context, plain-language summary, and one-click progression.',
  },
  {
    id: 'visual-learner',
    label: 'Visual Learner',
    description: 'Processes the narrative through spatial and visual cues.',
    need: 'Conceptual structure that is easy to scan and remember.',
    emphasis: 'Timeline, movement cards, cross-reference links, and thematic color.',
  },
  {
    id: 'analytical-student',
    label: 'Analytical Student',
    description: 'Wants structural depth and traceable theological patterns.',
    need: 'Interconnected data and thematic filters.',
    emphasis: 'Covenant nodes, story filters, and cross-reference relationships.',
  },
];

export const readingPlans: ReadingPlan[] = [
  {
    title: 'Sacrifice',
    theme: 'From the ram in Genesis to the Lamb in Revelation.',
    description: 'A thread of substitution, atonement, and covenant faithfulness.',
    storyIds: [8, 19, 66, 68, 69, 100],
  },
  {
    title: 'Kingdom of God',
    theme: 'From David to Jesus to the New Jerusalem.',
    description: 'A reading path that tracks the reign of God through kingship and renewal.',
    storyIds: [35, 38, 51, 58, 70, 97, 100],
  },
  {
    title: 'Presence',
    theme: 'God dwelling with His people.',
    description: 'A path from Eden, to tabernacle, to incarnation, to new creation.',
    storyIds: [1, 19, 38, 51, 53, 71, 100],
  },
];

const thematicThreadDefinitions: Array<Omit<ThematicThread, 'storyIds'> & {
  predicate: (story: BibleStory) => boolean;
}> = [
  {
    id: 'sacrifice',
    title: 'Sacrifice',
    theme: 'From the ram in Genesis to the Lamb in Revelation.',
    description: 'A thread of substitution, atonement, and covenant faithfulness.',
    accent: '#9c6b43',
    predicate: story => [8, 19, 46, 66, 68, 69, 100].includes(story.id),
  },
  {
    id: 'kingdom',
    title: 'Kingdom',
    theme: 'From David to Jesus to the New Jerusalem.',
    description: 'A reading path that tracks the reign of God through kingship and renewal.',
    accent: '#3f5d66',
    predicate: story => [31, 32, 33, 34, 35, 37, 38, 39, 51, 58, 59, 60, 70, 81, 83, 85, 97, 98, 99, 100].includes(story.id),
  },
  {
    id: 'exile',
    title: 'Exile',
    theme: 'From scattering to return, and the deeper exile of sin.',
    description: 'A thread that follows loss, judgment, perseverance, and homecoming.',
    accent: '#7b5a8b',
    predicate: story => [5, 40, 47, 48, 49, 50, 73, 76, 80].includes(story.id),
  },
  {
    id: 'presence',
    title: 'Presence',
    theme: 'God dwelling with His people.',
    description: 'A path from Eden, to tabernacle, to incarnation, to new creation.',
    accent: '#7b8a56',
    predicate: story => [1, 19, 21, 22, 38, 51, 53, 66, 71, 96, 97, 98, 99, 100].includes(story.id),
  },
  {
    id: 'wisdom',
    title: 'Wisdom',
    theme: 'A life shaped by fear of the Lord and practical righteousness.',
    description: 'Psalms, Proverbs, and James-like instruction for embodied faith.',
    accent: '#b08d57',
    predicate: story => [41, 42, 43, 44, 45, 84, 86, 87, 88, 89, 94].includes(story.id),
  },
  {
    id: 'deliverance',
    title: 'Deliverance',
    theme: 'God rescues His people from bondage, danger, and despair.',
    description: 'From Egypt to the wilderness to the public ministry of Jesus.',
    accent: '#6f8a9a',
    predicate: story => [16, 17, 18, 19, 20, 23, 24, 25, 27, 28, 29, 30, 61, 62, 63, 64, 65].includes(story.id),
  },
  {
    id: 'mission',
    title: 'Mission',
    theme: 'The good news moves outward to all nations.',
    description: 'The church’s witness, expansion, and apostolic teaching.',
    accent: '#4f7a63',
    predicate: story => [51, 52, 53, 54, 55, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 91, 92, 93, 94, 95].includes(story.id),
  },
  {
    id: 'covenant-faithfulness',
    title: 'Covenant Faithfulness',
    theme: 'God keeps His promises despite human failure.',
    description: 'The backbone of the story from Genesis through the church.',
    accent: '#8d6b5c',
    predicate: story => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 86, 87, 88, 89, 90].includes(story.id),
  },
  {
    id: 'new-creation',
    title: 'New Creation',
    theme: 'A renewed heaven and earth where God dwells with His people.',
    description: 'The final shape of hope and the resolution of the biblical story.',
    accent: '#7c5d8f',
    predicate: story => [1, 51, 68, 69, 96, 97, 98, 99, 100].includes(story.id),
  },
  {
    id: 'worship',
    title: 'Worship',
    theme: 'Response to God’s presence, power, and holiness.',
    description: 'Sacred gatherings, praise, prayer, and temple-shaped devotion.',
    accent: '#9a7752',
    predicate: story => [19, 21, 22, 41, 42, 43, 66, 71, 96, 97, 98, 99, 100].includes(story.id),
  },
];

export const thematicThreads: ThematicThread[] = thematicThreadDefinitions.map(({ predicate, ...thread }) => ({
  ...thread,
  storyIds: bibleStories.filter(predicate).map(story => story.id),
}));

const universalNarrativeThread: ThematicThread = {
  id: 'unified-narrative',
  title: 'Unified Narrative',
  theme: 'Every passage belongs to the one redemptive story.',
  description: 'Fallback coverage that ensures every story participates in the unified message.',
  storyIds: bibleStories.map(story => story.id),
  accent: '#5a5a40',
};

export const crossReferenceMap: Record<number, CrossReferenceLink[]> = {
  1: [
    { storyId: 51, label: 'John 1', reason: 'Creation language returns in the prologue of the Gospel of John.' },
    { storyId: 100, label: 'Revelation 21-22', reason: 'The story ends with a renewed creation that echoes Genesis.' },
    { storyId: 21, label: 'Exodus 20', reason: 'The Creator gives structure and moral order to His people.' },
  ],
  3: [
    { storyId: 68, label: 'John 19', reason: 'Judgment and rescue converge in the cross.' },
    { storyId: 100, label: 'Revelation 21-22', reason: 'The story of curse removal and restored life is completed at the end.' },
    { storyId: 41, label: 'Psalm 23', reason: 'The shepherd motif follows humanity through the consequences of the fall.' },
  ],
  8: [
    { storyId: 19, label: 'Passover', reason: 'The near-sacrifice of Isaac anticipates substitutionary deliverance.' },
    { storyId: 66, label: 'Last Supper', reason: "Bread, covenant, and sacrifice converge in Jesus' final meal." },
    { storyId: 68, label: 'Crucifixion', reason: 'God provides the sacrifice He requires.' },
  ],
  19: [
    { storyId: 66, label: 'Last Supper', reason: "Passover becomes the frame for Jesus' covenant meal." },
    { storyId: 68, label: 'Crucifixion', reason: 'The lamb motif culminates in the cross.' },
    { storyId: 71, label: 'Pentecost', reason: 'Deliverance becomes the basis for a redeemed people.' },
  ],
  35: [
    { storyId: 38, label: 'Temple', reason: 'The Davidic promise matures into a place for God\'s presence.' },
    { storyId: 51, label: 'John 1', reason: 'The eternal king is also the eternal Word.' },
    { storyId: 97, label: 'Messages to the Churches', reason: 'Kingship and covenant identity shape the church.' },
  ],
  51: [
    { storyId: 1, label: 'Creation', reason: 'The Word present at creation reappears in the incarnation.' },
    { storyId: 53, label: 'Birth of Jesus', reason: 'The cosmic Word enters ordinary history.' },
    { storyId: 100, label: 'New Jerusalem', reason: 'Light, life, and dwelling with God reach completion.' },
  ],
  66: [
    { storyId: 19, label: 'Passover', reason: 'The meal is shaped by the Exodus story.' },
    { storyId: 68, label: 'Crucifixion', reason: 'The meal points directly to the sacrifice to come.' },
    { storyId: 71, label: 'Pentecost', reason: 'The covenant meal gives way to covenant power.' },
  ],
  68: [
    { storyId: 69, label: 'Resurrection', reason: 'The cross and empty tomb belong to one saving event.' },
    { storyId: 81, label: 'Romans 8', reason: 'No condemnation flows from the finished work of Christ.' },
    { storyId: 100, label: 'New Jerusalem', reason: 'The Lamb who was slain now reigns forever.' },
  ],
  71: [
    { storyId: 75, label: 'Cornelius', reason: 'The Spirit pushes the mission beyond ethnic boundaries.' },
    { storyId: 83, label: 'Armor of God', reason: 'The church learns to live by Spirit-formed identity.' },
    { storyId: 100, label: 'New Jerusalem', reason: 'The Spirit-filled people become the dwelling place of God.' },
  ],
  100: [
    { storyId: 1, label: 'Creation', reason: 'The Bible closes where it began, but transfigured by redemption.' },
    { storyId: 51, label: 'John 1', reason: 'Light, life, and dwelling language complete the arc of the Word.' },
    { storyId: 68, label: 'Crucifixion', reason: 'The Lamb is the reason restoration is possible.' },
  ],
};

export function getNarrativeMovement(storyId: number): NarrativeMovement {
  if (storyId <= 5) return narrativeMovements[0];
  if (storyId <= 50) return narrativeMovements[1];
  if (storyId <= 95) return narrativeMovements[2];
  return narrativeMovements[3];
}

export function getCovenantNode(storyId: number): CovenantNode {
  if (storyId === 1) return covenantNodes[0];
  if (storyId <= 5) return covenantNodes[1];
  if (storyId <= 15) return covenantNodes[3];
  if (storyId <= 25) return covenantNodes[4];
  if (storyId <= 40) return covenantNodes[5];
  return covenantNodes[6];
}

export function getStoryNarrativeTag(storyId: number): StoryNarrativeTag {
  const movement = getNarrativeMovement(storyId);
  const covenant = getCovenantNode(storyId);
  const relatedStories = crossReferenceMap[storyId] ?? [];
  const themeLabels = [
    movement.label,
    covenant.label,
    ...thematicThreads
      .filter(thread => thread.storyIds.includes(storyId))
      .map(thread => thread.title),
  ];

  return {
    movement,
    covenant,
    relatedStories,
    themeLabels,
  };
}

export function getStoryThemes(storyId: number): ThematicThread[] {
  const themes = thematicThreads.filter(thread => thread.storyIds.includes(storyId));
  return themes.length > 0 ? themes : [universalNarrativeThread];
}

export function getStoryConnections(storyId: number): CrossReferenceLink[] {
  const movement = getNarrativeMovement(storyId);
  const covenant = getCovenantNode(storyId);
  const themeThreads = getStoryThemes(storyId).filter(thread => thread.id !== 'unified-narrative');
  const connections: CrossReferenceLink[] = [...(crossReferenceMap[storyId] ?? [])];

  const pushUnique = (nextConnection: CrossReferenceLink) => {
    if (!connections.some(connection => connection.storyId === nextConnection.storyId)) {
      connections.push(nextConnection);
    }
  };

  if (storyId > 1) {
    pushUnique({
      storyId: storyId - 1,
      label: bibleStories[storyId - 2].title,
      reason: 'Immediate narrative context before this passage.',
    });
  }

  if (storyId < bibleStories.length) {
    pushUnique({
      storyId: storyId + 1,
      label: bibleStories[storyId].title,
      reason: 'Immediate narrative context after this passage.',
    });
  }

  bibleStories
    .filter(story => story.id !== storyId)
    .filter(story => getNarrativeMovement(story.id).id === movement.id)
    .slice(0, 2)
    .forEach(story => pushUnique({
      storyId: story.id,
      label: story.title,
      reason: `Shares the ${movement.label.toLowerCase()} movement.`,
    }));

  bibleStories
    .filter(story => story.id !== storyId)
    .filter(story => getCovenantNode(story.id).label === covenant.label)
    .slice(0, 2)
    .forEach(story => pushUnique({
      storyId: story.id,
      label: story.title,
      reason: `Belongs to the same covenant frame: ${covenant.label}.`,
    }));

  themeThreads.forEach(thread => {
    if (!thread.storyIds.includes(storyId)) return;
    thread.storyIds
      .filter(nextStoryId => nextStoryId !== storyId)
      .slice(0, 3)
      .forEach(nextStoryId => {
        const story = bibleStories[nextStoryId - 1];
        pushUnique({
          storyId: story.id,
          label: story.title,
          reason: `Part of the ${thread.title} theme thread.`,
        });
      });
  });

  return connections.slice(0, 10);
}

export const storyNarrativeIndex = bibleStories.map(story => ({
  ...story,
  narrative: getStoryNarrativeTag(story.id),
}));