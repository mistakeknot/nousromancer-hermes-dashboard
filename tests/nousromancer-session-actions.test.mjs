import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const PLUGIN_PATH = new URL('../plugins/nousromancer-mission-control/dashboard/dist/index.js', import.meta.url);
const CSS_PATH = new URL('../plugins/nousromancer-mission-control/dashboard/dist/style.css', import.meta.url);

function makeElement({ textContent = '', placeholder = '', attributes = {} } = {}) {
  const element = {
    textContent,
    placeholder,
    dataset: {},
    attributes: { ...attributes },
    children: [],
    parentElement: null,
    className: '',
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    getAttribute(name) {
      return this.attributes[name];
    },
    appendChild(child) {
      child.parentElement = this;
      this.children.push(child);
      return child;
    },
    remove() {
      if (this.parentElement && Array.isArray(this.parentElement.children)) {
        this.parentElement.children = this.parentElement.children.filter((child) => child !== this);
      }
      this.removed = true;
    },
    querySelector(selector) {
      if (selector === '[data-nousromancer-attention-context="true"]') {
        return this.children.find((child) => child.dataset.nousromancerAttentionContext === 'true') || null;
      }
      return null;
    },
  };
  return element;
}

async function runPreMainEffectsWithDocument(fakeDocument, missionData) {
  const source = await readFile(PLUGIN_PATH, 'utf8');
  const slots = new Map();
  const effects = [];
  const fakeState = missionData || { status: { gateway_running: true, active_sessions: 0 }, sessions: [], error: null };
  const react = {
    createElement(type, props, ...children) {
      if (typeof type === 'function') return type({ ...(props || {}), children });
      return { type, props: props || {}, children };
    },
    useEffect(effect) {
      effects.push(effect);
    },
    useState(initial) {
      if (initial && Object.hasOwn(initial, 'status') && Object.hasOwn(initial, 'sessions')) {
        return [fakeState, () => {}];
      }
      return [initial, () => {}];
    },
  };
  const observers = [];
  class FakeMutationObserver {
    constructor(callback) {
      this.callback = callback;
      observers.push(this);
    }
    observe(target, options) {
      this.target = target;
      this.options = options;
    }
    disconnect() {
      this.disconnected = true;
    }
  }

  const sandbox = {
    window: {
      __HERMES_PLUGIN_SDK__: { React: react, hooks: react, api: {} },
      __HERMES_PLUGINS__: {
        register() {},
        registerSlot(name, slot, component) {
          slots.set(slot, component);
        },
      },
    },
    document: fakeDocument,
    MutationObserver: FakeMutationObserver,
    setInterval() { return 1; },
    clearInterval() {},
  };

  vm.runInNewContext(source, sandbox, { filename: PLUGIN_PATH.pathname });
  const component = slots.get('pre-main');
  assert.equal(typeof component, 'function', 'pre-main slot is registered');
  component({});
  const cleanups = effects.map((effect) => effect()).filter((cleanup) => typeof cleanup === 'function');
  return { observers, cleanups };
}

test('Nousromancer clarifies Sessions search copy and demotes repeated source/delete row chrome', async () => {
  const input = makeElement({ placeholder: 'Search message content...' });
  const sourceBadge = makeElement({ textContent: 'discord' });
  const deleteButton = makeElement({ attributes: { 'aria-label': 'Delete session' } });
  const actionRail = makeElement();
  actionRail.querySelector = () => sourceBadge;
  deleteButton.parentElement = actionRail;

  const fakeDocument = {
    body: makeElement(),
    querySelector(selector) {
      if (selector === 'main input[placeholder="Search message content..."]') return input;
      return null;
    },
    querySelectorAll(selector) {
      if (selector === 'main button[aria-label="Delete session"]') return [deleteButton];
      return [];
    },
  };

  const { observers, cleanups } = await runPreMainEffectsWithDocument(fakeDocument);

  assert.equal(input.placeholder, 'Search session text');
  assert.equal(input.dataset.nousromancerSearchPolished, 'true');
  assert.equal(input.getAttribute('aria-label'), 'Search across session messages');
  assert.equal(input.getAttribute('title'), 'Search across session messages');

  assert.equal(sourceBadge.textContent, 'src:discord');
  assert.equal(sourceBadge.dataset.nousromancerSourceChip, 'true');
  assert.equal(sourceBadge.getAttribute('aria-label'), 'Session source: discord');
  assert.equal(sourceBadge.getAttribute('title'), 'Session source: discord');

  assert.equal(deleteButton.dataset.nousromancerDangerAction, 'delete');
  assert.equal(deleteButton.getAttribute('title'), 'Delete session');

  assert.equal(observers.length, 1, 'DOM polish stays attached for paginated/session updates');
  assert.equal(observers[0].options.childList, true);
  assert.equal(observers[0].options.subtree, true);
  cleanups.forEach((cleanup) => cleanup());
  assert.equal(observers[0].disconnected, true, 'observer is disconnected on unmount');
});

test('Nousromancer adds evidence-backed attention context to matching Sessions rows', async () => {
  const row = makeElement({ textContent: 'Review release decision' });
  row.dataset.sessionId = 'sess-attention';
  const created = [];
  const fakeDocument = {
    body: makeElement(),
    createElement(tagName) {
      const element = makeElement();
      element.tagName = String(tagName).toUpperCase();
      created.push(element);
      return element;
    },
    querySelector() {
      return null;
    },
    querySelectorAll(selector) {
      if (selector === 'main button[aria-label="Delete session"]') return [];
      if (/data-session-id|data-session|role="row"|cursor-pointer|article|li|tr/.test(selector)) return [row];
      return [];
    },
  };

  await runPreMainEffectsWithDocument(fakeDocument, {
    status: { gateway_running: true, active_sessions: 1 },
    sessions: [{
      id: 'sess-attention',
      title: 'Review release decision',
      is_active: true,
      source: 'discord',
      attention_state: 'waiting_on_human',
      attention_reason: 'approval requested for release merge',
      attention_evidence: [
        { type: 'assistant_prompt', source: 'session', summary: 'Assistant asked for release approval.', confidence: 'high' },
      ],
      response_target: { kind: 'dashboard_session', surface: 'dashboard', label: 'Open session', path: '/sessions/sess-attention' },
    }],
    error: null,
  });

  const chip = row.children.find((child) => child.dataset.nousromancerAttentionContext === 'true');
  assert.ok(chip, 'attention context chip is appended to the matching row');
  assert.equal(chip.tagName, 'SPAN');
  assert.match(chip.textContent, /attn:approval/i);
  assert.match(chip.textContent, /src:discord/i);
  assert.equal(chip.getAttribute('aria-label'), 'Hermes attention context: approval');
  assert.match(chip.getAttribute('title'), /Evidence-backed Hermes attention signal/i);
  assert.match(chip.getAttribute('title'), /approval requested for release merge/i);
  assert.doesNotMatch(`${chip.textContent} ${chip.getAttribute('title')}`, /needs input|blocked on you|highest priority/i);
  assert.equal(created.length, 1, 'one chip is created for the explicit attention row');
});

test('Nousromancer redacts authoritative attention phrases from Sessions-row attention tooltips', async () => {
  const row = makeElement({ textContent: 'Approval handoff' });
  row.dataset.sessionId = 'sess-forbidden-copy';
  const fakeDocument = {
    body: makeElement(),
    createElement(tagName) {
      const element = makeElement();
      element.tagName = String(tagName).toUpperCase();
      return element;
    },
    querySelector() {
      return null;
    },
    querySelectorAll(selector) {
      if (selector === 'main button[aria-label="Delete session"]') return [];
      if (/data-session-id|data-session|role="row"|cursor-pointer|article|li|tr/.test(selector)) return [row];
      return [];
    },
  };

  await runPreMainEffectsWithDocument(fakeDocument, {
    status: { gateway_running: true, active_sessions: 1 },
    sessions: [{
      id: 'sess-forbidden-copy',
      title: 'Approval handoff',
      is_active: true,
      source: 'cli',
      attention_state: 'waiting_on_human',
      attention_reason: 'needs input because the release is blocked on you',
      attention_evidence: [
        { type: 'assistant_prompt', source: 'session', summary: 'highest priority approval requested' },
      ],
    }],
    error: null,
  });

  const chip = row.children.find((child) => child.dataset.nousromancerAttentionContext === 'true');
  assert.ok(chip, 'bounded attention context still renders after unsafe detail redaction');
  assert.match(chip.textContent, /attn:requested|attn:attention/i);
  assert.doesNotMatch(`${chip.textContent} ${chip.getAttribute('title')}`, /needs input|blocked on you|highest priority/i);
});

test('Nousromancer suppresses Sessions-row attention context for unknown state and unsafe private handles', async () => {
  const snowflake = ['1498420617', '710407823'].join('');
  const tokenish = ['sk-', 'unsafeTOKEN123456789'].join('');
  const row = makeElement({ textContent: 'Background cleanup' });
  row.dataset.sessionId = 'sess-unknown';
  const fakeDocument = {
    body: makeElement(),
    createElement(tagName) {
      const element = makeElement();
      element.tagName = String(tagName).toUpperCase();
      return element;
    },
    querySelector() {
      return null;
    },
    querySelectorAll(selector) {
      if (selector === 'main button[aria-label="Delete session"]') return [];
      if (/data-session-id|data-session|role="row"|cursor-pointer|article|li|tr/.test(selector)) return [row];
      return [];
    },
  };

  await runPreMainEffectsWithDocument(fakeDocument, {
    status: { gateway_running: true, active_sessions: 1 },
    sessions: [{
      id: 'sess-unknown',
      title: 'Background cleanup',
      is_active: true,
      source: 'discord',
      attention_state: 'unknown',
      attention_reason: `adapter held ${snowflake}`,
      attention_evidence: [
        { type: 'url', source: 'discord', summary: `unsafe https://discord.com/channels/${snowflake}/${snowflake}` },
      ],
      response_target: { path: `https://discord.com/channels/${snowflake}/${snowflake}`, label: tokenish },
    }],
    error: null,
  });

  assert.equal(row.children.filter((child) => child.dataset.nousromancerAttentionContext === 'true').length, 0);
  const rowText = [row.textContent, ...row.children.map((child) => `${child.textContent} ${child.getAttribute('title') || ''}`)].join(' ');
  assert.doesNotMatch(rowText, new RegExp(`${snowflake}|discord\\.com/channels|sk-unsafeTOKEN`));
  assert.doesNotMatch(rowText, /needs input|blocked on you|highest priority/i);
});

test('Nousromancer CSS visually demotes source chips, attention context, and destructive session row actions', async () => {
  const css = await readFile(CSS_PATH, 'utf8');

  assert.match(css, /data-nousromancer-search-polished/);
  assert.match(css, /data-nousromancer-source-chip/);
  assert.match(css, /src:discord|source chip|session source/i);
  assert.match(css, /data-nousromancer-attention-context/);
  assert.match(css, /attention context|attn:/i);
  assert.match(css, /data-nousromancer-danger-action="delete"/);
  assert.match(css, /opacity:\s*0/);
  assert.match(css, /hover.*data-nousromancer-danger-action/s);
});
