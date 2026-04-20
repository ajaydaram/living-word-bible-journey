/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  CalendarCheck2,
  CheckCircle2, 
  ChevronLeft, 
  Filter,
  Search, 
  Sparkles, 
  Bookmark,
  Volume2,
  Share2,
  Menu,
  X,
  ChevronRight,
  Compass,
  Layers3,
  Eye,
  EyeOff,
  Download,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import { bibleStories, type BibleStory } from './data/bibleStories';
import {
  crossReferenceMap,
  getCovenantNode,
  getStoryConnections,
  getStoryThemes,
  getNarrativeMovement,
  narrativeMovements,
  personas,
  readingPlans,
  thematicThreads,
  storyNarrativeIndex,
  type NarrativeMovementId,
  type PersonaId,
} from './data/unifiedFramework';
import {
  chronologicalPath,
  getJesusContextForChapter,
  getMilestoneForStory,
  getStoryIdForChapter,
  acts,
  type ActId,
} from './data/chronologicalPath';
import { CovenantTracker } from './components/CovenantTracker';
import { WhereIsJesus } from './components/WhereIsJesus';
import { TimelineVisualizer } from './components/TimelineVisualizer';
import { DeepDivePanel } from './components/DeepDivePanel';
import { FullBibleModeToggle } from './components/FullBibleModeToggle';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

function getActIdFromStoryId(storyId: number): ActId {
  if (storyId <= 5) return 1;
  if (storyId <= 15) return 2;
  if (storyId <= 25) return 3;
  if (storyId <= 35) return 4;
  if (storyId <= 45) return 5;
  if (storyId <= 55) return 6;
  if (storyId <= 65) return 7;
  return 8;
}

export default function App() {
  const storyPanelRef = useRef<HTMLElement | null>(null);
  const [selectedStory, setSelectedStory] = useState<BibleStory | null>(null);
  const [completedStories, setCompletedStories] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 1024;
  });
  const [bibleText, setBibleText] = useState<string>('');
  const [loadingText, setLoadingText] = useState(false);
  const [activeMovement, setActiveMovement] = useState<NarrativeMovementId | 'all'>('all');
  const [activePersona, setActivePersona] = useState<PersonaId>('visual-learner');
  const [activeTheme, setActiveTheme] = useState<string | 'all'>('all');
  const [activeExplorerTheme, setActiveExplorerTheme] = useState(thematicThreads[0].id);
  const [guidedMode, setGuidedMode] = useState(true);
  const [showAdvancedStudy, setShowAdvancedStudy] = useState(false);
  const [showSidebarAdvanced, setShowSidebarAdvanced] = useState(false);
  const [isDesktopLayout, setIsDesktopLayout] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 1024;
  });
  const [showDashboardDetails, setShowDashboardDetails] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState('');
  const [lastReadStoryId, setLastReadStoryId] = useState<number | null>(null);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);
  const [reinforcementToast, setReinforcementToast] = useState('');
  const [scriptureCache, setScriptureCache] = useState<Record<string, string>>({});
  const [scriptureError, setScriptureError] = useState('');
  const [lastRequestedRef, setLastRequestedRef] = useState('');
  const [activeReadingReference, setActiveReadingReference] = useState('');
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [useFullBibleMode, setUseFullBibleMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('bible-use-full-bible-mode');
    return saved === 'true';
  });
  const [showSupplementalSections, setShowSupplementalSections] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('bible-show-supplemental-sections');
    return saved === 'true';
  });

  const onboardingSteps = [
    {
      title: 'Step 1: Start with one story',
      detail: 'Use Resume to continue where you left off, or Begin Here to start from Creation.',
    },
    {
      title: 'Step 2: Read context first',
      detail: 'Read the story context box before scripture text to keep the big picture clear.',
    },
    {
      title: 'Step 3: Open map only when needed',
      detail: 'Use Study Map when you want deeper thematic and cross-reference connections.',
    },
  ];

  const dailyPrompts = [
    'What does this passage reveal about God\'s character?',
    'Where do you see promise and fulfillment in this story?',
    'What action can you take today in response to this reading?',
    'How does this story connect to the larger redemptive narrative?',
    'What hope does this passage offer in your current season?',
    'Which repeated word or image stands out and why?',
    'How does this story challenge your assumptions?',
  ];

  const getDateKey = (date = new Date()) => date.toISOString().slice(0, 10);

  const getYesterdayKey = () => {
    const day = new Date();
    day.setDate(day.getDate() - 1);
    return getDateKey(day);
  };

  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem('bible-progress');
    if (saved) setCompletedStories(JSON.parse(saved));

    const savedStreak = localStorage.getItem('bible-streak-count');
    const savedDate = localStorage.getItem('bible-last-completed-date');
    const savedLastRead = localStorage.getItem('bible-last-read-story-id');
    const savedCache = localStorage.getItem('bible-scripture-cache');
    if (savedStreak) setStreakCount(Number(savedStreak));
    if (savedDate) setLastCompletedDate(savedDate);
    if (savedLastRead) setLastReadStoryId(Number(savedLastRead));
    if (savedCache) setScriptureCache(JSON.parse(savedCache));

    const dismissed = localStorage.getItem('bible-onboarding-dismissed');
    if (dismissed === 'true') setOnboardingDismissed(true);
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('bible-progress', JSON.stringify(completedStories));
  }, [completedStories]);

  useEffect(() => {
    localStorage.setItem('bible-streak-count', String(streakCount));
  }, [streakCount]);

  useEffect(() => {
    localStorage.setItem('bible-last-completed-date', lastCompletedDate);
  }, [lastCompletedDate]);

  useEffect(() => {
    if (lastReadStoryId !== null) {
      localStorage.setItem('bible-last-read-story-id', String(lastReadStoryId));
    }
  }, [lastReadStoryId]);

  useEffect(() => {
    localStorage.setItem('bible-scripture-cache', JSON.stringify(scriptureCache));
  }, [scriptureCache]);

  useEffect(() => {
    localStorage.setItem('bible-onboarding-dismissed', onboardingDismissed ? 'true' : 'false');
  }, [onboardingDismissed]);

  useEffect(() => {
    localStorage.setItem('bible-use-full-bible-mode', useFullBibleMode ? 'true' : 'false');
  }, [useFullBibleMode]);

  useEffect(() => {
    localStorage.setItem('bible-show-supplemental-sections', showSupplementalSections ? 'true' : 'false');
  }, [showSupplementalSections]);

  useEffect(() => {
    if (!reinforcementToast) return;
    const timer = window.setTimeout(() => setReinforcementToast(''), 2600);
    return () => window.clearTimeout(timer);
  }, [reinforcementToast]);

  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktopLayout(desktop);
      if (desktop) setShowDashboardDetails(true);
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const navWithStandalone = window.navigator as Navigator & { standalone?: boolean };
    const standalone = window.matchMedia('(display-mode: standalone)').matches || navWithStandalone.standalone === true;
    if (standalone) setIsInstalled(true);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPromptEvent(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(bibleStories.map(s => s.category)));
    return cats;
  }, []);

  const storyIndex = useMemo(() => new Map(storyNarrativeIndex.map(story => [story.id, story])), []);

  const filteredStories = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return bibleStories.filter(s => {
      const matchesSearch = !query || s.title.toLowerCase().includes(query) || s.reference.toLowerCase().includes(query);
      const matchesMovement = activeMovement === 'all' || getNarrativeMovement(s.id).id === activeMovement;
      const matchesTheme = activeTheme === 'all' || thematicThreads.some(thread => thread.id === activeTheme && thread.storyIds.includes(s.id));
      return matchesSearch && matchesMovement && matchesTheme;
    });
  }, [activeMovement, activeTheme, searchQuery]);

  // When Full Bible Mode is on, show all chapters from chronologicalPath
  const fullBibleChapters = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return chronologicalPath.filter(ch => {
      const matchesSearch = !query || ch.title.toLowerCase().includes(query) || ch.reference.toLowerCase().includes(query);
      return matchesSearch;
    });
  }, [searchQuery]);

  // Group full Bible chapters by Act for display
  const fullBibleByAct = useMemo(() => {
    const grouped: Record<number, typeof chronologicalPath> = {};
    fullBibleChapters.forEach(ch => {
      if (!grouped[ch.act]) grouped[ch.act] = [];
      grouped[ch.act].push(ch);
    });
    return grouped;
  }, [fullBibleChapters]);

  const activePersonaProfile = personas.find(persona => persona.id === activePersona) ?? personas[0];
  const selectedMovement = selectedStory ? getNarrativeMovement(selectedStory.id) : null;
  const selectedCovenant = selectedStory ? getCovenantNode(selectedStory.id) : null;
  const crossReferences = selectedStory ? (crossReferenceMap[selectedStory.id] ?? []) : [];
  const selectedThemes = selectedStory ? getStoryThemes(selectedStory.id) : [];
  const activeExplorerThread = thematicThreads.find(thread => thread.id === activeExplorerTheme) ?? thematicThreads[0];
  const activeExplorerStories = bibleStories.filter(story => activeExplorerThread.storyIds.includes(story.id));
  const nextUnfinishedStory = bibleStories.find(story => !completedStories.includes(story.id)) ?? bibleStories[0];
  const resumeStory = (lastReadStoryId ? bibleStories.find(story => story.id === lastReadStoryId) : undefined) ?? nextUnfinishedStory;
  const selectedMilestoneChapter = selectedStory ? getMilestoneForStory(selectedStory.id) : null;
  const selectedActId = selectedMilestoneChapter?.act ?? (selectedStory ? getActIdFromStoryId(selectedStory.id) : null);
  const selectedStoryAct = selectedActId ? acts[selectedActId] : null;
  const selectedActFallbackChapterId = selectedActId
    ? (chronologicalPath.find(ch => ch.act === selectedActId)?.id ?? null)
    : null;
  const chapterByReference = useMemo(() => new Map(chronologicalPath.map(ch => [ch.reference, ch])), []);
  const activeReadingChapter = activeReadingReference ? chapterByReference.get(activeReadingReference) : null;
  const showExpandedDashboard = isDesktopLayout || showDashboardDetails;
  const shouldSimplifyLanding = !selectedStory && !isDesktopLayout;
  const isMobileReading = !!selectedStory && !isDesktopLayout;
  const todayPrompt = dailyPrompts[new Date().getDay() % dailyPrompts.length];
  const selectedIsCompleted = selectedStory ? completedStories.includes(selectedStory.id) : false;
  const suggestedNextStory = selectedStory
    ? bibleStories.find(story => story.id > selectedStory.id && !completedStories.includes(story.id)) ?? nextUnfinishedStory
    : nextUnfinishedStory;
  const personaSessionSummary = useMemo(() => {
    if (!selectedStory) {
      return {
        headline: 'Strong finish. Keep your momentum.',
        takeaway: '',
        nextReason: '',
        actionLabel: 'Continue to next',
      };
    }

    const movementLabel = selectedMovement?.label.toLowerCase() ?? 'narrative';
    const covenantLabel = selectedCovenant?.label ?? 'covenant faithfulness';
    const primaryTheme = selectedThemes[0]?.title ?? 'the unified narrative';

    if (activePersona === 'disoriented-reader') {
      return {
        headline: 'You stayed on the path.',
        takeaway: `${selectedStory.title} moves the story forward through ${movementLabel}. Keep this one anchor: God remains faithful through ${covenantLabel}.`,
        nextReason: 'Next step keeps your reading flow simple and chronological.',
        actionLabel: 'Read next story',
      };
    }

    if (activePersona === 'visual-learner') {
      return {
        headline: 'Another scene now fits the larger picture.',
        takeaway: `${selectedStory.title} adds detail to the ${movementLabel} movement and highlights ${primaryTheme}. You are seeing the arc, not just isolated verses.`,
        nextReason: 'The next story continues the visual storyline with minimal context switching.',
        actionLabel: 'Continue the arc',
      };
    }

    return {
      headline: 'You closed one narrative node cleanly.',
      takeaway: `${selectedStory.title} strengthens the ${movementLabel} phase while reinforcing ${covenantLabel}. The active theme thread is ${primaryTheme}.`,
      nextReason: 'The recommended next node preserves literary and covenant continuity.',
      actionLabel: 'Advance to next node',
    };
  }, [activePersona, selectedStory, selectedMovement, selectedCovenant, selectedThemes]);

  const personaLiveGuidance = useMemo(() => {
    if (!selectedStory) {
      if (activePersona === 'disoriented-reader') {
        return {
          headline: 'One step at a time.',
          detail: 'Use Continue to open exactly one story, read the context first, and stop there for today.',
          chipClass: 'bg-amber-100 text-amber-900 border-amber-300',
          cardClass: 'bg-amber-50 border-amber-200',
          continueLabel: 'Continue One Step',
        };
      }

      if (activePersona === 'visual-learner') {
        return {
          headline: 'Follow the arc visually.',
          detail: 'Use Continue to keep the narrative flow and watch where this scene fits in the larger story.',
          chipClass: 'bg-sky-100 text-sky-900 border-sky-300',
          cardClass: 'bg-sky-50 border-sky-200',
          continueLabel: 'Continue The Arc',
        };
      }

      return {
        headline: 'Track structure and pattern.',
        detail: 'Use Continue, then open Study Map for cross references and covenant structure.',
        chipClass: 'bg-violet-100 text-violet-900 border-violet-300',
        cardClass: 'bg-violet-50 border-violet-200',
        continueLabel: 'Continue With Structure',
      };
    }

    if (activePersona === 'disoriented-reader') {
      return {
        headline: `Anchor in ${selectedStory.title}.`,
        detail: 'Read the context block first, then scripture. Ignore extra panels unless you need them.',
        chipClass: 'bg-amber-100 text-amber-900 border-amber-300',
        cardClass: 'bg-amber-50 border-amber-200',
        continueLabel: 'Continue One Step',
      };
    }

    if (activePersona === 'visual-learner') {
      return {
        headline: `See where ${selectedStory.title} fits.`,
        detail: 'Use the movement tags and graph view to connect this story to the wider narrative arc.',
        chipClass: 'bg-sky-100 text-sky-900 border-sky-300',
        cardClass: 'bg-sky-50 border-sky-200',
        continueLabel: 'Continue The Arc',
      };
    }

    return {
      headline: `Analyze ${selectedStory.title} as a node.`,
      detail: 'Compare covenant and thematic threads to see how this passage advances the framework.',
      chipClass: 'bg-violet-100 text-violet-900 border-violet-300',
      cardClass: 'bg-violet-50 border-violet-200',
      continueLabel: 'Continue With Structure',
    };
  }, [activePersona, selectedStory]);

  const focusStoryPanel = () => {
    if (typeof window === 'undefined') return;
    const focus = () => {
      storyPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.requestAnimationFrame(focus);
    window.setTimeout(focus, 80);
    window.setTimeout(focus, 220);
  };

  useEffect(() => {
    if (!selectedStory) return;
    focusStoryPanel();
  }, [selectedStory]);

  const openStory = (story: BibleStory) => {
    setShowAdvancedStudy(false);
    handleSelectStory(story);
  };

  const continueWithReinforcement = (story: BibleStory) => {
    const streakLabel = streakCount > 0 ? `${streakCount}-day streak` : 'first step today';
    setReinforcementToast(`Continuing at ${story.id.toString().padStart(2, '0')} ${story.title}. ${streakLabel}.`);
    openStory(story);
  };

  const showInfoToast = (message: string) => {
    setReinforcementToast(message);
  };

  const handleInstallApp = async () => {
    if (!installPromptEvent) return;
    await installPromptEvent.prompt();
    const choice = await installPromptEvent.userChoice;
    if (choice.outcome === 'accepted') {
      setIsInstalled(true);
    }
    setInstallPromptEvent(null);
  };

  const graphNodes = useMemo(() => {
    if (!selectedStory) return [];

    const relatedIds = [
      ...getStoryConnections(selectedStory.id).map(link => link.storyId),
      selectedStory.id > 1 ? [selectedStory.id - 1] : [],
      selectedStory.id < bibleStories.length ? [selectedStory.id + 1] : [],
    ]
      .flat()
      .filter((storyId, index, array) => array.indexOf(storyId) === index && storyId !== selectedStory.id)
      .slice(0, 6);

    const points = [
      { x: 50, y: 50 },
      { x: 50, y: 14 },
      { x: 82, y: 28 },
      { x: 82, y: 72 },
      { x: 50, y: 86 },
      { x: 18, y: 72 },
      { x: 18, y: 28 },
    ];

    return [
      {
        story: selectedStory,
        x: points[0].x,
        y: points[0].y,
        label: 'Focus',
        relation: 'Selected passage',
      },
      ...relatedIds.map((storyId, index) => {
        const story = bibleStories[storyId - 1];
        const connection = getStoryConnections(selectedStory.id).find(link => link.storyId === storyId);
        return {
          story,
          x: points[index + 1].x,
          y: points[index + 1].y,
          label: connection?.label ?? story.title,
          relation: connection?.reason ?? 'Narrative adjacency',
        };
      }),
    ];
  }, [selectedStory]);

  const fetchBibleText = async (ref: string, forceRefresh = false) => {
    const normalizedRef = ref.replace('–', '-');
    setLastRequestedRef(ref);
    setScriptureError('');

    if (!forceRefresh && scriptureCache[normalizedRef]) {
      setBibleText(scriptureCache[normalizedRef]);
      setLoadingText(false);
      return;
    }

    setLoadingText(true);
    setBibleText('');
    try {
      // Normalize reference for API: Book Chapter:Verse-EndChapter:EndVerse
      // Replace em-dash with hyphen
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(normalizedRef)}?translation=kjv`);
      const data = await response.json();
      if (data.text) {
        setBibleText(data.text);
        setScriptureCache(prev => ({ ...prev, [normalizedRef]: data.text }));
      } else {
        setScriptureError('Scripture text was not returned. Try retrying or opening this reference externally.');
      }
    } catch (err) {
      console.error(err);
      setScriptureError('Failed to load scripture text. Check your connection and try again.');
    } finally {
      setLoadingText(false);
    }
  };

  const handleSelectStory = (story: BibleStory, scriptureReference?: string) => {
    setShowAdvancedStudy(false);
    setLastReadStoryId(story.id);
    setSelectedStory(story);
    const referenceToRead = scriptureReference ?? story.reference;
    setActiveReadingReference(referenceToRead);
    fetchBibleText(referenceToRead);
    // On mobile, close sidebar after selection
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
    focusStoryPanel();
  };

  const toggleComplete = (id: number) => {
    const todayKey = getDateKey();
    const yesterdayKey = getYesterdayKey();

    setCompletedStories(prev => {
      const alreadyCompleted = prev.includes(id);

      if (!alreadyCompleted) {
        if (lastCompletedDate !== todayKey) {
          if (lastCompletedDate === yesterdayKey) {
            setStreakCount(current => current + 1);
          } else {
            setStreakCount(1);
          }
          setLastCompletedDate(todayKey);
        }
        return [...prev, id];
      }

      return prev.filter(i => i !== id);
    });
  };

  const progressPercentage = Math.round((completedStories.length / bibleStories.length) * 100);

  return (
    <div className="flex flex-col h-screen bg-bg-warm overflow-hidden">
      {/* Header */}
      <header className="px-6 lg:px-12 py-6 border-bottom border-ink/5 flex flex-col sm:flex-row justify-between items-baseline gap-4 bg-bg-warm shrink-0">
        <div className="flex items-center gap-4">
          {!isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open story browser"
              title="Open story browser"
              className="p-2 hover:bg-sand rounded-full transition-all"
            >
              <Menu className="w-5 h-5 text-olive" />
            </button>
          )}
          <h1 className="text-2xl font-serif tracking-[0.08em] uppercase text-olive font-medium">The Living Word</h1>
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-start sm:justify-end">
          {!isInstalled && installPromptEvent && (
            <button
              onClick={handleInstallApp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-olive text-bg-warm text-[11px] font-bold uppercase tracking-widest transition-all hover:opacity-90"
            >
              <Download className="w-4 h-4" />
              Install App
            </button>
          )}
          <button
            onClick={() => setGuidedMode(prev => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink/10 bg-paper text-[11px] font-bold uppercase tracking-widest text-olive transition-all hover:border-olive/30"
          >
            {guidedMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {guidedMode ? 'Simple View' : 'Explore View'}
          </button>
          <div className="text-[13px] text-clay font-bold tracking-widest uppercase">
            {selectedStory ? `STORY ${selectedStory.id} OF 100` : 'SELECT A STORY'} • {progressPercentage}% JOURNEY COMPLETED
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Navigation */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside 
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              className="w-full lg:w-[320px] bg-sand border-r border-ink/5 flex flex-col h-full z-50 absolute lg:relative"
            >
              <div className="p-8 space-y-8 flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <div className="section-label">CHAPTER OVERVIEW</div>
                  <button onClick={() => setIsSidebarOpen(false)} aria-label="Close story browser" title="Close story browser" className="lg:hidden p-2 hover:bg-bg-warm rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Full Bible Mode Toggle */}
                <FullBibleModeToggle 
                  enabled={useFullBibleMode}
                  onToggle={(enabled) => {
                    setUseFullBibleMode(enabled);
                    localStorage.setItem('bible-use-full-bible-mode', enabled ? 'true' : 'false');
                  }}
                />

                <div className="space-y-3">
                  <div className="section-label mb-1">BROWSE</div>
                  <div className="text-sm text-ink/60 leading-relaxed">
                    Search a story, or open more filters when you need them.
                  </div>
                  <button
                    onClick={() => setShowSidebarAdvanced(prev => !prev)}
                    className="w-full rounded-xl px-4 py-3 text-left border border-ink/10 bg-paper hover:border-olive/30 transition-all flex items-center justify-between"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-olive">More filters</span>
                    <ChevronRight className={`w-4 h-4 text-clay transition-transform ${showSidebarAdvanced ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                {showSidebarAdvanced && (
                  <>
                    <div className="space-y-3">
                      <div className="section-label mb-1">NARRATIVE SPINE</div>
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setActiveMovement('all')} className={`rounded-xl px-3 py-3 text-left border transition-all ${activeMovement === 'all' ? 'bg-paper border-olive text-olive' : 'bg-transparent border-ink/5 text-ink/70 hover:bg-paper/60'}`}>
                          <div className="text-xs font-bold uppercase tracking-widest">All Movements</div>
                          <div className="text-[11px] opacity-70 mt-1">Unified arc</div>
                        </button>
                        {narrativeMovements.map(movement => (
                          <button key={movement.id} onClick={() => setActiveMovement(movement.id)} className={`rounded-xl px-3 py-3 text-left border transition-all ${activeMovement === movement.id ? 'bg-paper border-olive text-olive' : 'bg-transparent border-ink/5 text-ink/70 hover:bg-paper/60'}`}>
                            <div className="text-xs font-bold uppercase tracking-widest">{movement.shortLabel}</div>
                            <div className="text-[11px] opacity-70 mt-1">{movement.range[0]}-{movement.range[1]}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="section-label mb-1 flex items-center gap-2">
                        <Filter className="w-3 h-3" /> THEME FILTERS
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => setActiveTheme('all')} className={`px-3 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${activeTheme === 'all' ? 'bg-olive text-bg-warm border-olive' : 'bg-transparent border-ink/10 text-ink/65 hover:bg-paper/60'}`}>
                          All Themes
                        </button>
                        {thematicThreads.map(thread => (
                          <button key={thread.id} onClick={() => setActiveTheme(thread.id)} className={`px-3 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${activeTheme === thread.id ? 'bg-paper border-olive text-olive' : 'bg-transparent border-ink/10 text-ink/65 hover:bg-paper/60'}`}>
                            {thread.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
                  <input 
                    type="text"
                    placeholder="Search stories..."
                    className="w-full pl-10 pr-4 py-2.5 bg-paper border border-ink/5 rounded-xl text-sm focus:ring-1 focus:ring-olive focus:outline-hidden transition-all shadow-xs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex-1 overflow-y-auto -mx-2 px-2 space-y-8 scroll-smooth no-scrollbar">
                  {useFullBibleMode ? (
                    (Object.entries(fullBibleByAct) as Array<[string, typeof chronologicalPath]>).map(([actNum, chapters]) => {
                      const actId = parseInt(actNum) as ActId;
                      const act = acts[actId];
                      if (!act || chapters.length === 0) return null;

                      return (
                        <div key={actNum} className="space-y-4">
                          <div className="section-label px-2 flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: ['#b45309', '#ea580c', '#dc2626', '#e11d48', '#be185d', '#7e22ce', '#4f46e5', '#0284c7'][actId - 1] }} />
                            {act.title}
                          </div>
                          <div className="flex flex-col gap-2">
                            {chapters.map(chapter => (
                              <button
                                key={chapter.id}
                                onClick={() => {
                                  const storyId = getStoryIdForChapter(chapter.id);
                                  if (!storyId) return;
                                  const story = bibleStories[storyId - 1];
                                  if (!story) return;
                                  handleSelectStory(story, chapter.reference);
                                }}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between group ${
                                  activeReadingReference === chapter.reference
                                    ? 'bg-paper soft-shadow'
                                    : 'hover:bg-paper/50 text-ink/80'
                                }`}
                              >
                                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className={`text-sm font-serif font-medium leading-tight truncate ${activeReadingReference === chapter.reference ? 'text-olive' : ''}`}>
                                      {chapter.title}
                                    </span>
                                    {chapter.isMilestone && (
                                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-olive/10 text-olive whitespace-nowrap">
                                        STORY
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[9px] uppercase tracking-wider font-bold text-clay opacity-70">
                                    {chapter.reference}
                                  </span>
                                </div>
                                <span className="text-xs font-mono opacity-30 group-hover:opacity-60 transition-opacity ml-2">
                                  {chapter.id}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    categories.map(category => {
                      const storiesInCat = filteredStories.filter(s => s.category === category);
                      if (storiesInCat.length === 0) return null;
                      
                      return (
                        <div key={category} className="space-y-4">
                          <div className="section-label px-2">{category}</div>
                          <div className="flex flex-col gap-2">
                            {storiesInCat.map(story => (
                              <button
                                key={story.id}
                                onClick={() => handleSelectStory(story)}
                                className={`w-full text-left px-4 py-4 rounded-lg transition-all flex items-center justify-between group ${
                                  selectedStory?.id === story.id 
                                    ? 'bg-paper soft-shadow' 
                                    : 'hover:bg-paper/50 text-ink/80'
                                }`}
                              >
                                <div className="flex flex-col gap-0.5">
                                  <span className={`text-base font-serif font-medium leading-tight ${selectedStory?.id === story.id ? 'text-olive' : ''}`}>
                                    {story.title}
                                  </span>
                                  <span className="text-[10px] uppercase tracking-wider font-bold text-clay opacity-70">
                                    {story.reference}
                                  </span>
                                  <span className="mt-1 text-[10px] uppercase tracking-[0.14em] text-ink/45 hidden sm:inline">
                                    {storyIndex.get(story.id)?.narrative.movement.shortLabel}
                                  </span>
                                  {!guidedMode && (
                                    <span className="mt-1 flex flex-wrap gap-1">
                                      {getStoryThemes(story.id).slice(0, 1).map(thread => (
                                        <span key={thread.id} className="rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-widest" style={{ backgroundColor: `${thread.accent}18`, color: thread.accent }}>
                                          {thread.title}
                                        </span>
                                      ))}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  {completedStories.includes(story.id) && (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-olive" />
                                  )}
                                  <span className="text-xs font-mono opacity-30 group-hover:opacity-60 transition-opacity">
                                    {story.id.toString().padStart(2, '0')}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                
                <div className="pt-6 border-t border-ink/5">
                  <div className="section-label">STUDY TOOLS</div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => showInfoToast('Use the Daily Reflection Prompt card in Today after reading one story.')} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-paper/50 transition-all text-sm font-serif italic text-clay">
                      <Sparkles className="w-4 h-4" /> Daily Reflection
                    </button>
                    <button onClick={() => showInfoToast('Bookmarks are coming soon. Use Mark as Completed for now.')} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-paper/50 transition-all text-sm font-serif italic text-clay">
                      <Bookmark className="w-4 h-4" /> Bookmarked Verses
                    </button>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content View */}
        <main className="flex-1 flex flex-col h-full bg-bg-warm overflow-y-auto">
          <div className={`max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-12 ${isMobileReading ? 'py-4 space-y-4' : 'py-8 sm:py-10 lg:py-16 space-y-8 sm:space-y-10 lg:space-y-12'}`}>
            <section className="lg:hidden sticky top-0 z-20 bg-bg-warm/95 backdrop-blur supports-[backdrop-filter]:bg-bg-warm/80 border border-ink/5 rounded-2xl p-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => continueWithReinforcement(resumeStory)}
                  className="px-3 py-3 rounded-xl bg-olive text-bg-warm text-[11px] font-bold uppercase tracking-widest"
                >
                  {personaLiveGuidance.continueLabel}
                </button>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="px-3 py-3 rounded-xl border border-ink/10 bg-paper text-olive text-[11px] font-bold uppercase tracking-widest"
                >
                  Browse Stories
                </button>
              </div>
            </section>
            {!shouldSimplifyLanding && !onboardingDismissed && (
              <section className="bg-paper p-4 sm:p-6 lg:p-7 rounded-[24px] card-shadow border border-ink/5">
                <div className="section-label">GET ORIENTED</div>
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-3xl text-olive leading-tight mb-2">{onboardingSteps[onboardingStep].title}</h2>
                    <p className="text-sm text-ink/65 leading-relaxed max-w-2xl">{onboardingSteps[onboardingStep].detail}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={onboardingStep === 0}
                      onClick={() => setOnboardingStep(step => Math.max(0, step - 1))}
                      className="px-3 py-2 rounded-full border border-ink/10 text-[10px] font-bold uppercase tracking-widest text-olive disabled:opacity-30"
                    >
                      Back
                    </button>
                    {onboardingStep < onboardingSteps.length - 1 ? (
                      <button
                        onClick={() => setOnboardingStep(step => Math.min(onboardingSteps.length - 1, step + 1))}
                        className="px-3 py-2 rounded-full bg-olive text-bg-warm text-[10px] font-bold uppercase tracking-widest"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={() => setOnboardingDismissed(true)}
                        className="px-3 py-2 rounded-full bg-olive text-bg-warm text-[10px] font-bold uppercase tracking-widest"
                      >
                        Done
                      </button>
                    )}
                  </div>
                </div>
              </section>
            )}

            {shouldSimplifyLanding && (
              <section className="bg-paper p-5 rounded-[24px] card-shadow border border-ink/5 space-y-4">
                <div>
                  <div className="section-label">START HERE</div>
                  <h2 className="text-3xl font-serif text-olive leading-tight mt-1">One simple path for today.</h2>
                  <p className="text-sm text-ink/65 mt-2 leading-relaxed">Start with one story only. We will open Creation and take you to the reading panel directly.</p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-bg-warm/70 p-4">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-clay mb-2">Step 1</div>
                  <div className="font-serif text-xl text-olive">Tap Start Reading (Creation)</div>
                  <div className="text-xs text-ink/65 mt-1">After that, use Continue each day.</div>
                </div>
                <button
                  onClick={() => handleSelectStory(bibleStories[0], bibleStories[0].reference)}
                  className="w-full px-4 py-4 rounded-2xl bg-olive text-bg-warm text-xs font-bold uppercase tracking-widest"
                >
                  Start Reading (Creation)
                </button>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="w-full px-4 py-3 rounded-2xl border border-ink/10 bg-paper text-olive text-xs font-bold uppercase tracking-widest"
                >
                  Browse Stories Instead
                </button>
              </section>
            )}

            {!shouldSimplifyLanding && (
            <section className="bg-paper p-4 sm:p-6 lg:p-8 rounded-[28px] card-shadow border border-ink/5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] items-start">
              <div>
                <div className="section-label">QUICK START</div>
                <h2 className="text-3xl lg:text-4xl font-serif text-olive leading-tight mt-1 mb-3">Start with a clear path instead of a blank page.</h2>
                <p className="text-ink/65 leading-relaxed max-w-2xl">
                  Simple view hides the advanced study layers until you need them. Use one of the buttons below to begin with the beginning, resume your current place, or move into the deeper tools later.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <button onClick={() => handleSelectStory(bibleStories[0], bibleStories[0].reference)} className="rounded-2xl border border-ink/5 bg-bg-warm/70 p-4 text-left hover:border-olive/30 transition-all">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-clay mb-2">Begin here</div>
                  <div className="font-serif text-2xl text-olive">Creation</div>
                  <div className="text-xs text-ink/60 mt-1">Open the first story and follow the narrative spine.</div>
                </button>
                <button onClick={() => continueWithReinforcement(resumeStory)} className="rounded-2xl border border-ink/5 bg-bg-warm/70 p-4 text-left hover:border-olive/30 transition-all">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-clay mb-2">Resume</div>
                  <div className="font-serif text-2xl text-olive">{lastReadStoryId ? 'Last Read' : 'Next Story'}</div>
                  <div className="text-xs text-ink/60 mt-1">Continue from {resumeStory.id.toString().padStart(2, '0')} {resumeStory.title}.</div>
                </button>
                <button onClick={() => { setGuidedMode(false); setShowAdvancedStudy(true); }} className="rounded-2xl border border-ink/5 bg-bg-warm/70 p-4 text-left hover:border-olive/30 transition-all">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-clay mb-2">Deeper study</div>
                  <div className="font-serif text-2xl text-olive">Open tools</div>
                  <div className="text-xs text-ink/60 mt-1">Reveal threads, graphs, and advanced filters.</div>
                </button>
              </div>
            </section>
            )}

            {!shouldSimplifyLanding && (
            <section className="bg-paper p-4 sm:p-6 lg:p-8 rounded-[24px] card-shadow border border-ink/5 grid gap-4 lg:grid-cols-[0.75fr_1.25fr] items-start">
              <div>
                <div className="section-label">TODAY</div>
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-bg-warm text-clay text-[10px] font-bold uppercase tracking-widest mb-3">
                  <CalendarCheck2 className="w-4 h-4" /> {streakCount} Day Streak
                </div>
                <div className="font-serif text-2xl text-olive">One clear next step</div>
                <p className="text-sm text-ink/65 mt-2 leading-relaxed">Keep momentum by reading one story and reflecting with one question.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_auto] items-start">
                <div className="rounded-2xl border border-ink/5 bg-bg-warm/70 p-4">
                  <div className="text-[10px] uppercase tracking-widest text-clay font-bold mb-2">Daily Reflection Prompt</div>
                  <p className="font-serif text-xl text-olive leading-relaxed">{todayPrompt}</p>
                  <div className="mt-3 text-xs text-ink/60">Recommended story: {resumeStory.id.toString().padStart(2, '0')} {resumeStory.title}</div>
                  <div className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${personaLiveGuidance.chipClass}`}>
                    Persona Lens: {activePersonaProfile.label}
                  </div>
                </div>
                <button
                  onClick={() => continueWithReinforcement(resumeStory)}
                  className="h-full px-5 py-4 rounded-2xl bg-olive text-bg-warm text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  {personaLiveGuidance.continueLabel}
                </button>
              </div>
              <button
                onClick={() => setShowDashboardDetails(prev => !prev)}
                className="lg:hidden mt-1 px-4 py-2 rounded-full border border-ink/10 text-[10px] font-bold uppercase tracking-widest text-olive"
              >
                {showDashboardDetails ? 'Collapse dashboard' : 'Expand dashboard'}
              </button>
            </section>
            )}

            {showExpandedDashboard && !shouldSimplifyLanding && (
            <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <TimelineVisualizer 
                  currentStoryId={selectedStory?.id ?? completedStories.length + 1} 
                  totalStories={100}
                  onActClick={(actId) => {
                    // Jump to first story of Act
                    const actStartMap: Record<ActId, number> = { 1: 1, 2: 6, 3: 16, 4: 26, 5: 36, 6: 46, 7: 56, 8: 66 };
                    const storyId = actStartMap[actId];
                    if (storyId) handleSelectStory(bibleStories[storyId - 1]);
                  }}
                />
              </div>
            </section>
            )}

            {showExpandedDashboard && !shouldSimplifyLanding && (
            <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <CovenantTracker 
                  currentChapter={selectedStory?.id ?? completedStories.length} 
                  totalChapters={100}
                />
              </div>
            </section>
            )}

            {showExpandedDashboard && !shouldSimplifyLanding && (
            <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="bg-paper p-6 lg:p-8 rounded-[28px] card-shadow overflow-hidden relative">
                <div className="flex items-center gap-3 mb-4 text-clay">
                  <Layers3 className="w-4 h-4" />
                  <div className="section-label mb-0">UNIFIED MESSAGE</div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-serif text-olive leading-tight mb-4">A single redemptive narrative instead of isolated passages.</h2>
                <p className="text-ink/70 leading-relaxed max-w-2xl">
                  The app now organizes the Bible around Creation, Fall, Redemption, and Restoration, then overlays covenant movement, persona-aware guidance, and cross-reference exploration on top of the 100-story path.
                </p>
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-6">
                  {narrativeMovements.map(movement => (
                    <button key={movement.id} onClick={() => setActiveMovement(movement.id)} className="text-left rounded-2xl border border-ink/5 bg-bg-warm/70 p-4 hover:border-olive/30 transition-all">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-clay">{movement.label}</span>
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: movement.accent }} />
                      </div>
                      <div className="font-serif text-lg text-olive mb-1">{movement.range[0]}-{movement.range[1]}</div>
                      <div className="text-xs leading-relaxed text-ink/60">{movement.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-paper p-6 lg:p-8 rounded-[28px] card-shadow space-y-4">
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-clay" />
                  <div className="section-label mb-0">PERSONA FOCUS</div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {personas.map(persona => (
                    <button key={persona.id} onClick={() => setActivePersona(persona.id)} className={`px-3 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${activePersona === persona.id ? 'bg-olive text-bg-warm border-olive' : 'bg-bg-warm text-olive border-olive/20 hover:border-olive/50'}`}>
                      {persona.label}
                    </button>
                  ))}
                </div>
                <div className={`rounded-2xl border p-4 space-y-2 ${personaLiveGuidance.cardClass}`}>
                  <div className="text-sm font-bold uppercase tracking-widest text-clay">{activePersonaProfile.label}</div>
                  <div className="font-serif text-xl text-olive">{activePersonaProfile.description}</div>
                  <div className="text-sm text-ink/65 leading-relaxed">{activePersonaProfile.need}</div>
                  <div className="text-sm text-ink/65 leading-relaxed">{activePersonaProfile.emphasis}</div>
                </div>
              </div>
            </section>
            )}

            {!guidedMode && showExpandedDashboard && (
            <>
            <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="bg-paper p-6 lg:p-8 rounded-[28px] card-shadow border border-ink/5">
                <div className="section-label">THEME EXPLORER</div>
                <div className="font-serif text-3xl text-olive mt-1 mb-3">Browse a living thread</div>
                <div className="text-sm text-ink/65 leading-relaxed mb-5">
                  Choose a theological thread to inspect its key passages, then jump into the story view without leaving the canonical flow.
                </div>
                <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                  {thematicThreads.map(thread => (
                    <button
                      key={thread.id}
                      onClick={() => setActiveExplorerTheme(thread.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        activeExplorerTheme === thread.id
                          ? 'bg-bg-warm border-olive'
                          : 'bg-transparent border-ink/5 hover:bg-bg-warm/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="font-serif text-2xl" style={{ color: thread.accent }}>{thread.title}</div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-clay">{thread.storyIds.length} stories</span>
                      </div>
                      <div className="text-xs text-ink/60 leading-relaxed">{thread.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-paper p-6 lg:p-8 rounded-[28px] card-shadow border border-ink/5">
                <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                  <div>
                    <div className="section-label mb-1">THREAD DETAIL</div>
                    <div className="font-serif text-3xl text-olive">{activeExplorerThread.title}</div>
                  </div>
                  <button onClick={() => setActiveTheme(activeExplorerThread.id)} className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-olive text-bg-warm hover:opacity-90 transition-opacity">
                    Filter by thread
                  </button>
                </div>
                <div className="text-sm italic text-clay mb-3">{activeExplorerThread.theme}</div>
                <div className="text-sm text-ink/65 leading-relaxed mb-5">{activeExplorerThread.description}</div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {activeExplorerStories.map(story => (
                    <button
                      key={story.id}
                      onClick={() => handleSelectStory(story)}
                      className="text-left p-4 rounded-2xl border border-ink/5 bg-bg-warm/70 hover:border-olive/30 hover:bg-bg-warm transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="font-serif text-lg text-olive">{story.title}</div>
                        <span className="text-[10px] uppercase tracking-widest text-clay font-bold">{story.id.toString().padStart(2, '0')}</span>
                      </div>
                      <div className="text-xs text-ink/60 leading-relaxed">{story.reference}</div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-3">
              {readingPlans.map(plan => (
                <div key={plan.title} className="bg-paper p-6 rounded-[24px] card-shadow border border-ink/5">
                  <div className="section-label">THEMATIC PATH</div>
                  <div className="font-serif text-3xl text-olive mt-1 mb-2">{plan.title}</div>
                  <div className="text-sm italic text-clay mb-3">{plan.theme}</div>
                  <div className="text-sm text-ink/70 leading-relaxed mb-4">{plan.description}</div>
                  <div className="flex flex-wrap gap-2">
                    {plan.storyIds.map(id => {
                      const story = bibleStories[id - 1];
                      return (
                        <button key={id} onClick={() => handleSelectStory(story)} className="px-3 py-2 rounded-full bg-bg-warm text-xs font-bold uppercase tracking-widest text-olive hover:bg-sand transition-colors">
                          {id.toString().padStart(2, '0')} {story.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </section>
            </>
            )}

            <AnimatePresence mode="wait">
              {!selectedStory ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-paper p-12 lg:p-20 rounded-[32px] text-center space-y-8 flex flex-col items-center card-shadow"
                >
                  <div className="p-6 bg-sand rounded-full">
                    <BookOpen className="w-16 h-16 text-olive" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-5xl lg:text-6xl font-serif text-olive font-light italic">The Living Word Journey</h2>
                    <p className="text-ink/60 max-w-lg mx-auto leading-relaxed text-lg">
                      Follow the ancient path from the first breath of creation to the new Jerusalem. One hundred stories, one living word.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleSelectStory(bibleStories[0])}
                    className="read-action mt-6 group"
                  >
                    Begin Your Study <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key={selectedStory.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12 pb-20"
                >
                  {/* Story Card */}
                  <article ref={storyPanelRef} className="bg-paper p-4 sm:p-6 lg:p-12 rounded-[24px] sm:rounded-[32px] card-shadow relative overflow-hidden">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <div className="story-meta">Story {selectedStory.id === 100 ? 'One Hundred' : `No. ${selectedStory.id}`}</div>
                      {/* Act Badge */}
                      {selectedActId && selectedStoryAct && (
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${['bg-amber-100 text-amber-900', 'bg-orange-100 text-orange-900', 'bg-red-100 text-red-900', 'bg-rose-100 text-rose-900', 'bg-pink-100 text-pink-900', 'bg-purple-100 text-purple-900', 'bg-indigo-100 text-indigo-900', 'bg-blue-100 text-blue-900'][selectedActId - 1]}`}>
                          Act {selectedActId}: {selectedStoryAct.title}
                        </span>
                      )}
                      {selectedMovement && <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-bg-warm text-olive">{selectedMovement.label}</span>}
                      {!guidedMode && selectedCovenant && <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-sand text-clay">{selectedCovenant.label}</span>}
                      {!guidedMode && selectedThemes.slice(0, 2).map(theme => (
                        <span key={theme.id} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: `${theme.accent}18`, color: theme.accent }}>
                          {theme.title}
                        </span>
                      ))}
                    </div>
                    <header className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 lg:mb-12">
                      <h1 className="text-3xl sm:text-4xl lg:text-7xl font-serif text-olive leading-tight max-w-2xl">
                        {selectedStory.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="scripture-ref">{activeReadingReference || selectedStory.reference}</div>
                        <button 
                          onClick={() => toggleComplete(selectedStory.id)}
                          className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                            completedStories.includes(selectedStory.id)
                              ? 'bg-olive text-bg-warm border-olive'
                              : 'bg-bg-warm text-olive border-olive/20 hover:border-olive'
                          }`}
                        >
                          {completedStories.includes(selectedStory.id) ? (
                            <><CheckCircle2 className="w-4 h-4" /> Study Completed</>
                          ) : (
                            'Mark as Completed'
                          )}
                        </button>
                        <button
                          onClick={() => setShowSupplementalSections(!showSupplementalSections)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                            showSupplementalSections
                              ? 'bg-purple-100 text-purple-900 border-purple-300'
                              : 'bg-bg-warm text-purple-700 border-purple-200 hover:border-purple-400'
                          }`}
                          title="Show supplemental chapters (genealogies, laws, etc.)"
                        >
                          {showSupplementalSections ? (
                            <><Eye className="w-4 h-4" /> Deep Dive</>
                          ) : (
                            <><EyeOff className="w-4 h-4" /> Deep Dive</>
                          )}
                        </button>
                      </div>
                    </header>

                    {selectedIsCompleted && (
                      <div className="mb-8 rounded-2xl border border-ink/5 bg-bg-warm/70 p-5 lg:p-6 grid gap-4 lg:grid-cols-[1fr_auto] items-start">
                        <div>
                          <div className="section-label mb-1">SESSION SUMMARY</div>
                          <div className="font-serif text-2xl text-olive mb-2">{personaSessionSummary.headline}</div>
                          <p className="text-sm text-ink/70 leading-relaxed mb-3">{personaSessionSummary.takeaway}</p>
                          <div className="text-xs uppercase tracking-widest text-clay font-bold mb-1">Next recommended story: {suggestedNextStory.id.toString().padStart(2, '0')} {suggestedNextStory.title}</div>
                          <div className="text-xs text-ink/55">{personaSessionSummary.nextReason}</div>
                        </div>
                        <button
                          onClick={() => continueWithReinforcement(suggestedNextStory)}
                          className="px-4 py-3 rounded-xl bg-olive text-bg-warm text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                        >
                          {personaSessionSummary.actionLabel}
                        </button>
                      </div>
                    )}

                    {/* Context and Scripture */}
                    <div className="space-y-4 sm:space-y-8">
                      <div className="bg-sand/30 p-4 sm:p-6 lg:p-8 rounded-2xl border border-ink/5 relative group">
                        <div className="flex items-center gap-3 text-clay mb-6">
                          <BookOpen className="w-4 h-4" />
                          <h3 className="section-label mb-0">STORY CONTEXT</h3>
                        </div>
                        
                        <div className="text-ink/80 leading-relaxed font-serif text-base sm:text-lg lg:text-xl italic whitespace-pre-wrap">
                          {selectedStory.context}
                        </div>
                      </div>

                      <div className={`p-4 sm:p-5 rounded-2xl border ${personaLiveGuidance.cardClass}`}>
                        <div className="section-label mb-1">PERSONA LENS</div>
                        <div className="font-serif text-2xl text-olive mb-2">{personaLiveGuidance.headline}</div>
                        <div className="text-sm text-ink/70 leading-relaxed">{personaLiveGuidance.detail}</div>
                      </div>

                      {!showAdvancedStudy && (
                        <div className="bg-paper p-5 rounded-2xl border border-ink/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <div className="section-label mb-1">STUDY MAP</div>
                            <div className="font-serif text-2xl text-olive">Open deeper connections only when you need them.</div>
                            <div className="text-sm text-ink/60 leading-relaxed">This reveals the graph explorer, covenant context, and thematic thread links.</div>
                          </div>
                          <button onClick={() => setShowAdvancedStudy(true)} className="px-4 py-2 rounded-full bg-olive text-bg-warm text-xs font-bold uppercase tracking-widest">
                            Show study map
                          </button>
                        </div>
                      )}

                      {showAdvancedStudy && (
                      <div className="bg-paper p-6 lg:p-8 rounded-2xl border border-ink/5 space-y-5">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <div>
                            <div className="section-label mb-1">GRAPH EXPLORER</div>
                            <div className="font-serif text-2xl text-olive">A local network around the selected story</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-xs uppercase tracking-widest text-clay font-bold">Selected node anchored in the unified narrative</div>
                            <button onClick={() => setShowAdvancedStudy(false)} className="px-3 py-2 rounded-full border border-ink/10 text-[10px] font-bold uppercase tracking-widest text-olive hover:border-olive/30">
                              Hide map
                            </button>
                          </div>
                        </div>

                        <div className="relative h-[340px] lg:h-[380px] rounded-[28px] bg-bg-warm/70 overflow-hidden border border-ink/5">
                          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            {graphNodes.slice(1).map(node => (
                              <line
                                key={`${selectedStory.id}-${node.story.id}`}
                                x1="50"
                                y1="50"
                                x2={node.x.toString()}
                                y2={node.y.toString()}
                                stroke="rgba(90, 90, 64, 0.18)"
                                strokeWidth="0.75"
                              />
                            ))}
                          </svg>

                          {graphNodes.map((node, index) => {
                            const isCenter = index === 0;
                            return (
                              <button
                                key={node.story.id}
                                onClick={() => handleSelectStory(node.story)}
                                aria-label={`Open related story ${node.story.id}: ${node.story.title}`}
                                title={`Open related story ${node.story.id}: ${node.story.title}`}
                                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all ${
                                  isCenter
                                    ? 'w-28 h-28 bg-olive text-bg-warm border-olive shadow-lg z-10'
                                    : 'w-20 h-20 lg:w-24 lg:h-24 bg-paper text-olive border-olive/15 hover:border-olive/40 hover:scale-105 z-0'
                                }`}
                                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                              >
                                <span className="block text-[10px] uppercase tracking-[0.16em] font-bold opacity-70">{node.label}</span>
                                <span className={`block mt-1 font-serif leading-tight ${isCenter ? 'text-lg' : 'text-sm'}`}>
                                  {node.story.id.toString().padStart(2, '0')}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="grid gap-3 lg:grid-cols-2">
                          {graphNodes.slice(1).map(node => (
                            <button key={`${node.story.id}-card`} onClick={() => handleSelectStory(node.story)} aria-label={`Open related story ${node.story.id}: ${node.story.title}`} title={`Open related story ${node.story.id}: ${node.story.title}`} className="text-left p-4 rounded-2xl border border-ink/5 hover:border-olive/25 hover:bg-bg-warm/80 transition-all">
                              <div className="flex items-center justify-between gap-3 mb-2">
                                <div className="font-serif text-lg text-olive">{node.story.title}</div>
                                <span className="text-[10px] uppercase tracking-widest text-clay font-bold">{node.story.id.toString().padStart(2, '0')}</span>
                              </div>
                              <div className="text-xs text-ink/60 leading-relaxed">{node.relation}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      )}

                      {showAdvancedStudy && (
                      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
                        <div className="bg-bg-warm/80 p-6 rounded-2xl border border-ink/5">
                          <div className="section-label">COVENANT NODE</div>
                          <div className="font-serif text-2xl text-olive mb-2">{selectedCovenant?.label}</div>
                          <div className="text-sm text-ink/70 leading-relaxed">{selectedCovenant?.description}</div>
                          <div className="mt-3 text-xs uppercase tracking-widest text-clay font-bold">{selectedCovenant?.scripture}</div>
                        </div>
                        <div className="bg-bg-warm/80 p-6 rounded-2xl border border-ink/5">
                          <div className="section-label">THEMATIC THREADS</div>
                          <div className="text-sm text-ink/65 leading-relaxed mb-4">Curated threads that trace ideas across the canon.</div>
                          <div className="space-y-2">
                            {selectedThemes.length > 0 ? selectedThemes.map(thread => (
                              <button key={thread.id} onClick={() => setActiveTheme(thread.id)} className="w-full text-left p-3 rounded-xl border border-ink/5 hover:border-olive/30 hover:bg-paper transition-all">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="font-serif text-lg" style={{ color: thread.accent }}>{thread.title}</div>
                                  <ChevronRight className="w-4 h-4 text-clay" />
                                </div>
                                <div className="text-xs text-ink/60 mt-1 leading-relaxed">{thread.theme}</div>
                              </button>
                            )) : crossReferences.length > 0 ? crossReferences.map(link => (
                              <button key={link.storyId} onClick={() => handleSelectStory(bibleStories[link.storyId - 1])} className="w-full text-left p-3 rounded-xl border border-ink/5 hover:border-olive/30 hover:bg-paper transition-all">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="font-serif text-lg text-olive">{link.label}</div>
                                  <ChevronRight className="w-4 h-4 text-clay" />
                                </div>
                                <div className="text-xs text-ink/60 mt-1 leading-relaxed">{link.reason}</div>
                              </button>
                            )) : (
                              <div className="text-sm text-ink/50 italic">No curated threads for this story yet.</div>
                            )}
                          </div>
                        </div>
                      </div>
                      )}

                      <div className="space-y-4 sm:space-y-6 pt-2 sm:pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="section-label">THE SCRIPTURE</div>
                            <WhereIsJesus
                              context={getJesusContextForChapter(activeReadingChapter?.id ?? selectedMilestoneChapter?.id ?? selectedActFallbackChapterId ?? selectedStory.id)}
                              reference={activeReadingReference || selectedStory.reference}
                            />
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2.5 bg-bg-warm hover:bg-sand rounded-full text-clay transition-all" aria-label="Play audio" title="Play audio" onClick={() => showInfoToast('Audio playback is not enabled yet for this version.')}>
                              <Volume2 className="w-4 h-4" />
                            </button>
                            <button className="p-2.5 bg-bg-warm hover:bg-sand rounded-full text-clay transition-all" aria-label="Share this story" title="Share this story" onClick={() => {
                              navigator.share?.({
                                title: `Bible Study: ${selectedStory.title}`,
                                text: `Check out this Bible story: ${selectedStory.title}`,
                                url: window.location.href,
                              });
                            }}>
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {loadingText ? (
                          <div className="space-y-6 py-8">
                            {[1, 2, 3, 4].map(i => (
                              <div key={i} className="h-4 bg-bg-warm animate-pulse rounded w-full" style={{ width: `${100 - (i * 10)}%` }} />
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="text-base sm:text-xl lg:text-3xl font-serif text-ink leading-[1.75] italic pr-0 sm:pr-4 lg:pr-8">
                              {bibleText || "Searching for the scripture text..."}
                            </div>
                            {scriptureError && (
                              <div className="rounded-2xl border border-ink/5 bg-bg-warm/70 p-4 space-y-3">
                                <div className="text-sm text-ink/70 leading-relaxed">{scriptureError}</div>
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    onClick={() => fetchBibleText(activeReadingReference || selectedStory.reference, true)}
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-olive text-bg-warm text-[10px] font-bold uppercase tracking-widest"
                                  >
                                    <RotateCcw className="w-3.5 h-3.5" /> Retry
                                  </button>
                                  <a
                                    href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(lastRequestedRef || activeReadingReference || selectedStory.reference)}&version=KJV`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-ink/10 text-olive text-[10px] font-bold uppercase tracking-widest"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" /> Open externally
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Deep Dive Panel - Show supplemental chapters */}
                      {showSupplementalSections && selectedStory && (
                        <DeepDivePanel 
                          storyId={selectedStory.id}
                          storyAct={selectedActId ?? 1}
                          visible={true}
                        />
                      )}
                    </div>
                  </article>

                  {/* Navigation Control */}
                  <div className="flex flex-col sm:flex-row gap-6 pt-4">
                    <button 
                      disabled={selectedStory.id === 1}
                      onClick={() => handleSelectStory(bibleStories[selectedStory.id - 2])}
                      className="flex-1 p-6 bg-paper rounded-2xl soft-shadow border border-ink/5 hover:border-olive/20 transition-all group disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <div className="text-[10px] font-bold text-clay uppercase tracking-widest mb-2 flex items-center gap-2">
                        <ChevronLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" /> PREVIOUS STORY
                      </div>
                      <div className="font-serif italic text-lg text-olive">
                        {selectedStory.id > 1 ? bibleStories[selectedStory.id - 2].title : '---'}
                      </div>
                    </button>
                    <button 
                      disabled={selectedStory.id === 100}
                      onClick={() => handleSelectStory(bibleStories[selectedStory.id])}
                      className="flex-1 p-6 bg-paper rounded-2xl soft-shadow border border-ink/5 hover:border-olive/20 transition-all group text-right disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <div className="text-[10px] font-bold text-clay uppercase tracking-widest mb-2 flex items-center justify-end gap-2">
                        NEXT STORY <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </div>
                      <div className="font-serif italic text-lg text-olive">
                        {selectedStory.id < 100 ? bibleStories[selectedStory.id].title : '---'}
                      </div>
                    </button>
                  </div>

                  {/* 100 Story Path Grid */}
                  <div className="pt-12 border-t border-ink/10">
                    <div className="section-label mb-8">THE 100 STORY PATH</div>
                    <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-10 gap-3">
                      {bibleStories.map(story => (
                        <button
                          key={story.id}
                          onClick={() => handleSelectStory(story)}
                          className={`w-full aspect-square rounded-full flex items-center justify-center text-[11px] font-bold transition-all border-2 ${
                            selectedStory.id === story.id
                              ? 'border-olive text-olive bg-paper scale-110 z-10 shadow-lg'
                              : completedStories.includes(story.id)
                                ? 'bg-olive border-olive text-bg-warm'
                                : 'border-clay/30 text-clay hover:bg-sand hover:border-clay'
                          }`}
                        >
                          {story.id}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {reinforcementToast && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] pointer-events-none">
            <div className="px-4 py-3 rounded-full bg-olive text-bg-warm text-xs font-bold uppercase tracking-widest shadow-lg border border-olive/70">
              {reinforcementToast}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
