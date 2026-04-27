import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const THEME_PATH = new URL('../theme/nousromancer.yaml', import.meta.url);
const CSS_PATH = new URL('../plugins/nousromancer-mission-control/dashboard/dist/style.css', import.meta.url);
const README_PATH = new URL('../README.md', import.meta.url);

function alphaValues(source) {
  return [...source.matchAll(/rgba\([^)]*,\s*([01](?:\.\d+)?)\)/g)].map((match) => Number(match[1]));
}

test('Nousromancer theme uses a technical-ledger typography stack instead of cyberpunk display fonts', async () => {
  const theme = await readFile(THEME_PATH, 'utf8');

  assert.match(theme, /fontSans:\s*'"Geist"/);
  assert.match(theme, /fontMono:\s*'"Ioskeley Mono", "Geist Mono"/);
  assert.match(theme, /fontDisplay:\s*'"Ioskeley Mono", "Geist Mono"/);
  assert.match(theme, /family=Geist:wght@400;500;600&family=Geist\+Mono:wght@400;500;600/);
  assert.doesNotMatch(theme, /Space Grotesk|neon|cyberpunk/i);
});

test('Nousromancer theme reduces cockpit glow/noise into a restrained ledger surface', async () => {
  const theme = await readFile(THEME_PATH, 'utf8');

  assert.match(theme, /black technical ledger/i);
  assert.match(theme, /body\s*\{/);
  assert.match(theme, /font-feature-settings:\s*"tnum"/);
  assert.match(theme, /table th/);
  assert.match(theme, /\.font-mondwest/);
  assert.match(theme, /main \.text-xs\.text-muted-foreground/);
  assert.match(theme, /main input/);
  assert.match(theme, /main \.font-compressed/);
  assert.match(theme, /text-transform:\s*none/);
  assert.doesNotMatch(theme, /clip-path:\s*polygon/);
  assert.doesNotMatch(theme, /repeating-linear-gradient\(to bottom/);
  assert.doesNotMatch(theme, /0 0 (?:22|34|46)px/);
  assert.ok(Math.max(...alphaValues(theme)) <= 0.96, 'surface alphas stay restrained and avoid opaque glow layers');
});

test('Nousromancer theme restyles native scrollbars so screenshots keep the quiet app frame', async () => {
  const theme = await readFile(THEME_PATH, 'utf8');

  assert.match(theme, /scrollbar-color/);
  assert.match(theme, /::-webkit-scrollbar/);
  assert.match(theme, /::-webkit-scrollbar-thumb/);
  assert.match(theme, /background:\s*rgba\(232, 232, 226, 0\.16\)/);
});

test('Nousromancer plugin chrome uses muted technical labels, not neon HUD treatment', async () => {
  const css = await readFile(CSS_PATH, 'utf8');

  assert.match(css, /border:\s*1px solid rgba\(232, 232, 226, 0\.14\)/);
  assert.match(css, /box-shadow:\s*none/);
  assert.match(css, /font-size:\s*0\.66rem/);
  assert.match(css, /letter-spacing:\s*0\.11em/);
  assert.doesNotMatch(css, /text-shadow|nousromancerPulse|nousromancerSweep|scanline|neon/i);
});

test('README describes the accepted minimalist techwear typography direction', async () => {
  const readme = await readFile(README_PATH, 'utf8');

  assert.match(readme, /black technical ledger/i);
  assert.match(readme, /ACRONYM-like labeling discipline/i);
  assert.match(readme, /Veilance restraint/i);
  assert.match(readme, /mono metadata/i);
  assert.match(readme, /readable sans content/i);
});
