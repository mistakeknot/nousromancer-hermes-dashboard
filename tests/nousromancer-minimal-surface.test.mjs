import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const THEME_PATH = new URL('../theme/nousromancer.yaml', import.meta.url);
const MANIFEST_PATH = new URL('../plugins/nousromancer-mission-control/dashboard/manifest.json', import.meta.url);
const PLUGIN_PATH = new URL('../plugins/nousromancer-mission-control/dashboard/dist/index.js', import.meta.url);
const README_PATH = new URL('../README.md', import.meta.url);

test('Nousromancer theme uses standard layout to avoid bundled cockpit/sidebar plugin collisions', async () => {
  const source = await readFile(THEME_PATH, 'utf8');

  assert.match(source, /layoutVariant:\s*standard/);
  assert.doesNotMatch(source, /layoutVariant:\s*cockpit/);
});

test('Nousromancer plugin is a slot-only Now Bar/header plugin and does not claim the sidebar', async () => {
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
  const plugin = await readFile(PLUGIN_PATH, 'utf8');

  assert.equal(manifest.tab.hidden, true);
  assert.deepEqual(manifest.slots.sort(), ['header-left', 'header-right', 'pre-main'].sort());
  assert.doesNotMatch(plugin, /registerSlot\(NAME,\s*["']sidebar["']/);
  assert.doesNotMatch(plugin, /HERO SLOT|hero panel|session heat|gateway relay|agent signal/i);
});

test('README presents Nousromancer as a minimal operations skin, not a cockpit HUD/sidebar demo', async () => {
  const source = await readFile(README_PATH, 'utf8');

  assert.match(source, /minimal noir operations skin/i);
  assert.match(source, /persistent Now Bar/i);
  assert.doesNotMatch(source, /cockpit HUD/i);
  assert.doesNotMatch(source, /future-compatible cockpit sidebar/i);
});
