import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const REPO_ROOT = path.resolve(new URL('..', import.meta.url).pathname);

async function collectFiles(dir, predicate, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectFiles(full, predicate, acc);
    } else if (predicate(full)) {
      acc.push(full);
    }
  }
  return acc;
}

test('public Nousromancer artifacts do not expose sensitive workstream handles', async () => {
  const files = [
    path.join(REPO_ROOT, 'README.md'),
    path.join(REPO_ROOT, 'SUBMISSION.md'),
    path.join(REPO_ROOT, 'theme', 'nousromancer.yaml'),
    ...(await collectFiles(path.join(REPO_ROOT, 'plugins'), (file) => /\.(js|css|json)$/.test(file))),
    ...(await collectFiles(path.join(REPO_ROOT, 'tests'), (file) => file.endsWith('.mjs'))),
  ];
  const forbidden = [
    ['Ma', 'saq'].join(''),
    ['gen', 'eral', 'systems', 'ventures'].join(''),
    ['gen', 'sys', 'ven', '/', 'gen', 'eral', 'systems', 'ventures'].join(''),
    ['G', 'S', 'V', ' / ', 'Ma', 'saq'].join(''),
    ['private', ' ops'].join(''),
  ];

  for (const file of files) {
    const text = await readFile(file, 'utf8');
    for (const needle of forbidden) {
      assert.equal(text.includes(needle), false, `${path.relative(REPO_ROOT, file)} contains forbidden public handle ${needle}`);
    }
    assert.equal(/\b\d{17,20}\b/.test(text), false, `${path.relative(REPO_ROOT, file)} contains a Discord-like snowflake ID`);
  }
});
