import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { paginatedSessionsApiFixture, sessionApiFixtureMatrix, unsafeFixtureParts } from './fixtures/nousromancer-api-sessions.mjs';

const PLUGIN_PATH = new URL('../plugins/nousromancer-mission-control/dashboard/dist/index.js', import.meta.url);
const README_PATH = new URL('../README.md', import.meta.url);

function flattenText(node) {
  if (node == null || typeof node === 'boolean') return [];
  if (typeof node === 'string' || typeof node === 'number') return [String(node)];
  if (Array.isArray(node)) return node.flatMap(flattenText);
  return flattenText(node.children || []);
}

function collectLinks(node, links = []) {
  if (node == null || typeof node !== 'object') return links;
  if (node.type === 'a') {
    links.push({ ...(node.props || {}), text: flattenText(node.children || []).join(' ') });
  }
  for (const child of node.children || []) collectLinks(child, links);
  return links;
}

async function renderRegisteredSlot(slotName, missionData) {
  const source = await readFile(PLUGIN_PATH, 'utf8');
  const slots = new Map();
  const fakeState = missionData || { status: null, sessions: [], error: null };
  const react = {
    createElement(type, props, ...children) {
      if (typeof type === 'function') return type({ ...(props || {}), children });
      return { type, props: props || {}, children };
    },
    useEffect() {},
    useState(initial) {
      if (initial && Object.hasOwn(initial, 'status') && Object.hasOwn(initial, 'sessions')) {
        return [fakeState, () => {}];
      }
      return [initial, () => {}];
    },
  };
  const sandbox = {
    window: {
      __HERMES_PLUGIN_SDK__: {
        React: react,
        hooks: react,
        api: {},
      },
      __HERMES_PLUGINS__: {
        register() {},
        registerSlot(name, slot, component) {
          slots.set(slot, component);
        },
      },
    },
    document: undefined,
    setInterval() { return 1; },
    clearInterval() {},
  };

  vm.runInNewContext(source, sandbox, { filename: PLUGIN_PATH.pathname });
  const component = slots.get(slotName);
  assert.equal(typeof component, 'function', `${slotName} slot is registered`);
  return component({});
}

test('pre-main renders a minimal Now Bar with live Hermes state and trace action', async () => {
  const node = await renderRegisteredSlot('pre-main', {
    status: { gateway_running: true, active_sessions: 1, version: '0.11.0' },
    sessions: [{ id: 'sess-1', title: 'Build Nousromancer plugin', is_active: true }],
    error: null,
  });
  const text = flattenText(node).join(' ');
  const links = collectLinks(node);

  assert.match(text, /\bNow\b/);
  assert.match(text, /Gateway live/i);
  assert.match(text, /1 active/i);
  assert.match(text, /Build Nousromancer plugin/i);
  assert.match(text, /Trace/i);
  assert.doesNotMatch(text, /mission deck/i);
  assert.doesNotMatch(text, /Live dashboard signal/i);
  assert.ok(links.some((link) => link.href === '/sessions'), 'Trace action links to sessions');
});

test('pre-main Now Bar makes offline state actionable without decorative telemetry copy', async () => {
  const node = await renderRegisteredSlot('pre-main', {
    status: { gateway_running: false, active_sessions: 0, version: '0.11.0' },
    sessions: [],
    error: null,
  });
  const text = flattenText(node).join(' ');
  const links = collectLinks(node);

  assert.match(text, /Gateway offline/i);
  assert.match(text, /0 active/i);
  assert.match(text, /Open logs/i);
  assert.doesNotMatch(text, /session heat|agent signal|gateway relay/i);
  assert.ok(links.some((link) => link.href === '/logs'), 'offline CTA links to logs');
});

test('pre-main Now Bar shows API errors in text and points the action at logs', async () => {
  const node = await renderRegisteredSlot('pre-main', {
    status: null,
    sessions: [],
    error: new Error('status endpoint returned 500'),
    refreshedAt: null,
  });
  const text = flattenText(node).join(' ');
  const links = collectLinks(node);

  assert.match(text, /API error/i);
  assert.match(text, /Open logs/i);
  assert.ok(
    links.some((link) => link.href === '/logs' && /status endpoint returned 500/i.test(link.title || '')),
    'API error action links to logs with a useful title',
  );
});

test('pre-main Now Bar exposes last successful refresh freshness and stale state', async () => {
  const node = await renderRegisteredSlot('pre-main', {
    status: { gateway_running: true, active_sessions: 0, version: '0.11.0' },
    sessions: [],
    error: null,
    refreshedAt: '2026-04-27T20:00:00.000Z',
    nowMs: Date.parse('2026-04-27T20:20:00.000Z'),
  });
  const text = flattenText(node).join(' ');

  assert.match(text, /Gateway live/i);
  assert.match(text, /Stale 20m/i);
  assert.match(text, /No recent trace/i);
});

test('pre-main Now Bar labels the latest session source without exposing raw private handles', async () => {
  const channelId = ['1497801532', '383428660'].join('');
  const threadId = ['1498420617', '710407823'].join('');
  const node = await renderRegisteredSlot('pre-main', {
    status: { gateway_running: true, active_sessions: 1, version: '0.11.0' },
    sessions: [{
      id: 'sess-discord',
      title: 'Discord triage handoff',
      is_active: true,
      source: 'discord',
      channel_id: channelId,
      thread_id: threadId,
    }],
    error: null,
  });
  const text = flattenText(node).join(' ');

  assert.match(text, /Latest: src:discord/i);
  assert.doesNotMatch(text, new RegExp(`${channelId}|${threadId}`));
});

test('pre-main Now Bar omits the latest source hint when source evidence is absent', async () => {
  const node = await renderRegisteredSlot('pre-main', {
    status: { gateway_running: true, active_sessions: 1, version: '0.11.0' },
    sessions: [{ id: 'sess-no-source', title: 'Local cleanup', is_active: true }],
    error: null,
  });
  const text = flattenText(node).join(' ');

  assert.doesNotMatch(text, /Latest:/i);
  assert.doesNotMatch(text, /src:/i);
});

test('pre-main Now Bar prefers explicit Hermes attention contract over heuristic hints and routes response target', async () => {
  const node = await renderRegisteredSlot('pre-main', {
    status: { gateway_running: true, active_sessions: 2, version: '0.11.0' },
    sessions: [{
      id: 'sess-attention',
      title: 'Review release decision',
      is_active: true,
      source: 'discord',
      attention_state: 'waiting_on_human',
      attention_reason: 'approval requested for release merge',
      response_target: { kind: 'dashboard_session', surface: 'dashboard', label: 'Open session', path: '/sessions/sess-attention' },
      attention_evidence: [
        { type: 'assistant_prompt', source: 'session', summary: 'Assistant asked for release approval.', confidence: 'high' },
      ],
      messages: [
        { role: 'assistant', content: 'Should I merge this now, or wait for another pass?' },
      ],
    }, {
      id: 'sess-question',
      title: 'Fallback question-like session',
      is_active: true,
      messages: [{ role: 'assistant', content: 'Should I continue?' }],
    }],
    error: null,
  });
  const text = flattenText(node).join(' ');
  const links = collectLinks(node);

  assert.match(text, /Attention: approval/i);
  assert.doesNotMatch(text, /Possibly waiting/i);
  assert.doesNotMatch(text, /needs input|blocked on you|highest priority/i);
  assert.ok(links.some((link) => link.href === '/sessions/sess-attention' && /Evidence-backed attention signal/i.test(link.title || '')));
});

async function assertNoUnsafeNowBarLeak(node, unsafeParts) {
  const text = flattenText(node).join(' ');
  const links = collectLinks(node);
  for (const unsafe of unsafeParts) {
    assert.doesNotMatch(text, new RegExp(unsafe));
    for (const link of links) {
      assert.doesNotMatch(String(link.href || ''), new RegExp(unsafe));
      assert.doesNotMatch(String(link.title || ''), new RegExp(unsafe));
    }
  }
}

test('pre-main Now Bar suppresses unknown attention states and unsafe response target/evidence fields', async () => {
  const snowflake = ['1498420617', '710407823'].join('');
  const tokenish = ['sk-', 'unsafeTOKEN123456789'].join('');
  const node = await renderRegisteredSlot('pre-main', {
    status: { gateway_running: true, active_sessions: 1, version: '0.11.0' },
    sessions: [{
      id: 'sess-unknown',
      title: 'Background cleanup',
      is_active: true,
      attention_state: 'unknown',
      attention_reason: `adapter held ${snowflake}`,
      response_target: { kind: 'discord', surface: 'discord', label: tokenish, path: `https://discord.com/channels/${snowflake}/${snowflake}` },
      attention_evidence: [
        { type: 'url', source: 'discord', summary: `unsafe https://discord.com/channels/${snowflake}/${snowflake}`, confidence: 'high' },
      ],
    }],
    error: null,
  });
  const text = flattenText(node).join(' ');
  const links = collectLinks(node);

  assert.doesNotMatch(text, /Attention:/i);
  assert.doesNotMatch(text, /Possibly waiting/i);
  assert.ok(links.some((link) => link.href === '/sessions'), 'unsafe response target falls back to sessions');
  await assertNoUnsafeNowBarLeak(node, [snowflake, 'discord\\.com/channels', 'sk-unsafeTOKEN123456789']);
});

test('pre-main Now Bar shows a hedged Possibly waiting hint for assistant question turns', async () => {
  const node = await renderRegisteredSlot('pre-main', {
    status: { gateway_running: true, active_sessions: 1, version: '0.11.0' },
    sessions: [{
      id: 'sess-question',
      title: 'Review release decision',
      is_active: true,
      messages: [
        { role: 'user', content: 'Check whether the branch is ready.' },
        { role: 'assistant', content: 'Should I merge this now, or wait for another pass?' },
      ],
    }],
    error: null,
  });
  const text = flattenText(node).join(' ');

  assert.match(text, /Possibly waiting/i);
  assert.doesNotMatch(text, /needs input|blocked on you|highest priority/i);
});

test('pre-main Now Bar shows a hedged Possibly waiting hint for session error or stall evidence', async () => {
  const node = await renderRegisteredSlot('pre-main', {
    status: { gateway_running: true, active_sessions: 1, version: '0.11.0' },
    sessions: [{
      id: 'sess-stalled',
      title: 'Deploy handoff',
      is_active: true,
      status: 'stalled',
      error: 'tool call failed while waiting for approval',
    }],
    error: null,
  });
  const text = flattenText(node).join(' ');

  assert.match(text, /Possibly waiting/i);
  assert.doesNotMatch(text, /needs input|blocked on you|highest priority/i);
});

test('pre-main Now Bar omits possible-attention hints when evidence is insufficient', async () => {
  const node = await renderRegisteredSlot('pre-main', {
    status: { gateway_running: true, active_sessions: 1, version: '0.11.0' },
    sessions: [{
      id: 'sess-working',
      title: 'Background cleanup',
      is_active: true,
      messages: [
        { role: 'user', content: 'Clean up the screenshots.' },
        { role: 'assistant', content: 'I am checking the screenshot artifacts now.' },
      ],
    }],
    error: null,
  });
  const text = flattenText(node).join(' ');

  assert.doesNotMatch(text, /Possibly waiting/i);
  assert.doesNotMatch(text, /needs input|blocked on you|highest priority/i);
});

test('pre-main Now Bar exercises public-safe /api/sessions fixture matrix', async () => {
  assert.equal(paginatedSessionsApiFixture.sessions.length, 8, 'fixture keeps the Phase 2 evidence matrix explicit');

  const cases = [
    {
      name: 'explicit waiting_on_human',
      session: sessionApiFixtureMatrix.explicit,
      text: /Attention: approval/i,
      actionText: /Respond/i,
      href: '/sessions/sess-explicit-waiting',
    },
    {
      name: 'explicit blocked',
      session: sessionApiFixtureMatrix.blocked,
      text: /Attention: blocked/i,
      actionText: /Inspect/i,
      href: '/sessions/sess-explicit-blocked',
    },
    {
      name: 'explicit error',
      session: sessionApiFixtureMatrix.error,
      text: /Attention: error/i,
      actionText: /Inspect/i,
      href: '/sessions/sess-explicit-error',
    },
    {
      name: 'explicit possibly_waiting',
      session: sessionApiFixtureMatrix.possiblyWaiting,
      text: /Possibly waiting/i,
      actionText: /Trace/i,
      href: '/sessions',
      absentHref: '/sessions/sess-explicit-possibly-waiting',
    },
    {
      name: 'heuristic question-like fallback',
      session: sessionApiFixtureMatrix.heuristic,
      text: /Possibly waiting/i,
      actionText: /Trace/i,
      href: '/sessions',
      absentHref: '/sessions/sess-heuristic-question',
    },
    {
      name: 'unknown attention state',
      session: sessionApiFixtureMatrix.unknown,
      noText: /Attention:|Possibly waiting/i,
      actionText: /Trace/i,
      href: '/sessions',
    },
    {
      name: 'absent attention evidence',
      session: sessionApiFixtureMatrix.absent,
      noText: /Attention:|Possibly waiting/i,
      actionText: /Trace/i,
      href: '/sessions',
    },
    {
      name: 'unsafe private target',
      session: sessionApiFixtureMatrix.unsafePrivate,
      text: /Attention: requested/i,
      actionText: /Trace/i,
      href: '/sessions',
      absentHref: `https://discord.com/channels/${unsafeFixtureParts.snowflake}/${unsafeFixtureParts.snowflake}`,
    },
  ];

  for (const item of cases) {
    const node = await renderRegisteredSlot('pre-main', {
      status: { gateway_running: true, active_sessions: 1, version: '0.11.0' },
      sessions: [item.session],
      error: null,
      refreshedAt: '2026-05-09T04:00:00.000Z',
      nowMs: Date.parse('2026-05-09T04:02:00.000Z'),
    });
    const text = flattenText(node).join(' ');
    const links = collectLinks(node);
    const action = links[links.length - 1];

    if (item.text) assert.match(text, item.text, item.name);
    if (item.noText) assert.doesNotMatch(text, item.noText, item.name);
    assert.match(text, /Updated 2m/i, `${item.name}: fixture carries fresh refresh state`);
    assert.match(action.text, item.actionText, `${item.name}: action label`);
    assert.equal(action.href, item.href, `${item.name}: action href`);
    assert.doesNotMatch(text, /needs input|blocked on you|highest priority/i, `${item.name}: bounded copy`);
    if (item.absentHref) assert.ok(!links.some((link) => link.href === item.absentHref), `${item.name}: unsafe or unsupported target suppressed`);
    if (item.session === sessionApiFixtureMatrix.unsafePrivate) {
      await assertNoUnsafeNowBarLeak(node, [unsafeFixtureParts.snowflake, 'discord\\.com/channels', unsafeFixtureParts.tokenish]);
    }
  }
});

test('pre-main Now Bar fixture covers stale refresh separately from fresh attention evidence', async () => {
  const node = await renderRegisteredSlot('pre-main', {
    status: { gateway_running: true, active_sessions: 1, version: '0.11.0' },
    sessions: [sessionApiFixtureMatrix.explicit],
    error: null,
    refreshedAt: '2026-05-09T04:00:00.000Z',
    nowMs: Date.parse('2026-05-09T04:20:00.000Z'),
  });
  const text = flattenText(node).join(' ');
  const links = collectLinks(node);

  assert.match(text, /Stale 20m/i);
  assert.match(text, /Attention: approval/i, 'explicit evidence remains visible but paired with stale freshness text');
  assert.ok(links.some((link) => link.href === '/sessions/sess-explicit-waiting'));
});

test('README explains the Now Bar usefulness in judge-scannable language', async () => {
  const source = await readFile(README_PATH, 'utf8');

  assert.match(source, /persistent Now Bar/i);
  assert.match(source, /gateway health/i);
  assert.match(source, /active runs/i);
  assert.match(source, /latest trace/i);
  assert.match(source, /next useful action/i);
});
