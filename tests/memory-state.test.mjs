import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readMemoryState, resumeSlide, adjacentMemory } from '../lib/memory-state.ts';

test('invalid browser storage does not break the catalogue', () => {
  for (const value of ['broken', 'null', '42', '{}', '"text"']) {
    assert.deepEqual(readMemoryState(value, value, ['film-1']), { saved: [], progress: {} });
  }
});
test('restore only known favourites and valid playback positions', () => {
  assert.deepEqual(readMemoryState('["film-1","film-1","missing",2]',
    '{"film-1":0.65,"scene-7":2,"missing":0.2,"school":"oops"}',
    ['film-1', 'scene-7', 'school']), {
      saved: ['film-1'], progress: { 'film-1': 0.65, 'scene-7': 1 },
    });
});
test('photo sequences resume their current frame and replay completed sequences', () => {
  assert.equal(resumeSlide(0.5, 3), 1);
  assert.equal(resumeSlide(0.83, 3), 2);
  assert.equal(resumeSlide(1, 3), 0);
  assert.equal(resumeSlide(-1, 3), 0);
  assert.equal(resumeSlide(undefined, 0), 0);
});
test('previous/next stay within the selected collection, including memory-wall scenes', () => {
  const scenes = [{ id: 'scene-7' }, { id: 'scene-6' }, { id: 'scene-12' }];
  assert.equal(adjacentMemory(scenes, 'scene-7', -1)?.id, 'scene-12');
  assert.equal(adjacentMemory(scenes, 'scene-12', 1)?.id, 'scene-7');
  assert.equal(adjacentMemory(scenes, 'missing', -1)?.id, 'scene-7');
  assert.equal(adjacentMemory([], 'missing', 1), undefined);
});
