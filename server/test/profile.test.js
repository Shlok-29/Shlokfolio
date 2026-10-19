import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { profilePath } from '../src/routes/profile.js';

const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));

test('every project has the fields the UI relies on', () => {
  const ids = new Set();
  for (const p of profile.projects) {
    assert.ok(p.id && p.name && p.tagline, `incomplete project: ${p.id}`);
    assert.ok(Array.isArray(p.tags) && Array.isArray(p.stack), `bad arrays: ${p.id}`);
    assert.ok(!ids.has(p.id), `duplicate id: ${p.id}`);
    ids.add(p.id);
  }
  assert.equal(profile.projects.filter((p) => p.featured).length, 1, 'exactly one featured project');
});

test('every journey entry belongs to a known lane', () => {
  for (const j of profile.journey) assert.ok(profile.lanes[j.lane], `unknown lane: ${j.lane}`);
});
