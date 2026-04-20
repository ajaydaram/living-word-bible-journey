import { describe, expect, it } from 'vitest';
import {
  getMilestoneForStory,
  getStoryIdForChapter,
  getSupplementalChaptersForStory,
} from './chronologicalPath';

describe('chronological story/chapter mapping', () => {
  it('maps story ids to milestone chapters', () => {
    const first = getMilestoneForStory(1);
    const second = getMilestoneForStory(2);
    const sixteenth = getMilestoneForStory(16);

    expect(first?.id).toBe(1);
    expect(second?.id).toBe(2);
    expect(sixteenth?.id).toBe(51);
  });

  it('returns null for out-of-range story ids', () => {
    expect(getMilestoneForStory(0)).toBeNull();
    expect(getMilestoneForStory(101)).toBeNull();
    expect(getMilestoneForStory(10)).toBeNull();
  });

  it('maps any chapter id back to the nearest story id', () => {
    expect(getStoryIdForChapter(1)).toBe(1);
    expect(getStoryIdForChapter(2)).toBe(2);
    expect(getStoryIdForChapter(3)).toBe(2);
    expect(getStoryIdForChapter(51)).toBe(16);
    expect(getStoryIdForChapter(1101)).toBe(55);
  });

  it('returns supplemental chapters between the current and next milestone in the same act', () => {
    const story2Supplemental = getSupplementalChaptersForStory(2);
    const story1Supplemental = getSupplementalChaptersForStory(1);

    expect(story2Supplemental.some(ch => ch.id === 3)).toBe(true);
    expect(story2Supplemental.every(ch => !ch.isMilestone && !ch.isNarrative)).toBe(true);
    expect(story1Supplemental).toEqual([]);
  });
});
