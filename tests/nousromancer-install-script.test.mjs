import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const REPO_ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const INSTALL = path.join(REPO_ROOT, 'scripts', 'install.sh');

async function exists(file) {
  try {
    await access(file, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

test('install script copies Nousromancer artifacts into an isolated HERMES_HOME and bounds dashboard rescan', async () => {
  const work = await mkdtemp(path.join(tmpdir(), 'nousromancer-install-test-'));
  const hermesHome = path.join(work, 'hermes-home');
  const fakeBin = path.join(work, 'bin');
  const curlArgs = path.join(work, 'curl-args.txt');
  await mkdir(fakeBin, { recursive: true });
  await writeFile(
    path.join(fakeBin, 'curl'),
    `#!/usr/bin/env bash\nprintf '%s\\n' "$@" > ${JSON.stringify(curlArgs)}\nexit 0\n`,
    { mode: 0o755 },
  );

  const result = spawnSync(INSTALL, {
    cwd: REPO_ROOT,
    env: {
      ...process.env,
      HERMES_HOME: hermesHome,
      PATH: `${fakeBin}:/usr/bin:/bin`,
    },
    encoding: 'utf8',
    timeout: 15_000,
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(await exists(path.join(hermesHome, 'dashboard-themes', 'nousromancer.yaml')), true);
  assert.equal(await exists(path.join(hermesHome, 'plugins', 'nousromancer-mission-control', 'dashboard', 'manifest.json')), true);
  assert.equal(await exists(path.join(hermesHome, 'plugins', 'nousromancer-mission-control', 'dashboard', 'dist', 'index.js')), true);

  const args = await readFile(curlArgs, 'utf8');
  assert.match(args, /--max-time\n[0-9]+/, 'rescan curl must be bounded so install cannot hang on a wedged dashboard');
  assert.match(args, /http:\/\/127\.0\.0\.1:9119\/api\/dashboard\/plugins\/rescan/);
});
