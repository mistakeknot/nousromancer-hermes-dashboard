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
    attributeWriteCount: 0,
    setAttribute(name, value) {
      this.attributeWriteCount += 1;
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
      if (selector === '[data-nousromancer-response-action="true"]') {
        return this.children.find((child) => child.dataset.nousromancerResponseAction === 'true') || null;
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

test('Nousromancer does not rewrite already-polished source chips on observer reruns', async () => {
  const input = makeElement({ placeholder: 'Search session text' });
  input.dataset.nousromancerSearchPolished = 'true';
  input.setAttribute('aria-label', 'Search across session messages');
  input.setAttribute('title', 'Search across session messages');

  const sourceBadge = makeElement({ textContent: 'src:discord' });
  sourceBadge.dataset.nousromancerSourceOriginal = 'discord';
  sourceBadge.dataset.nousromancerSourceChip = 'true';
  sourceBadge.setAttribute('aria-label', 'Session source: discord');
  sourceBadge.setAttribute('title', 'Session source: discord');
  let sourceText = 'src:discord';
  let sourceTextWrites = 0;
  Object.defineProperty(sourceBadge, 'textContent', {
    get() { return sourceText; },
    set(value) {
      sourceTextWrites += 1;
      sourceText = String(value);
    },
  });

  const deleteButton = makeElement({ attributes: { 'aria-label': 'Delete session', title: 'Delete session' } });
  deleteButton.dataset.nousromancerDangerAction = 'delete';
  const actionRail = makeElement();
  actionRail.querySelector = () => sourceBadge;
  deleteButton.parentElement = actionRail;

  const fakeDocument = {
    body: makeElement(),
    querySelector(selector) {
      if (selector === 'main input[data-nousromancer-search-polished="true"]') return input;
      return null;
    },
    querySelectorAll(selector) {
      if (selector === 'main button[aria-label="Delete session"]') return [deleteButton];
      return [];
    },
  };

  const { observers, cleanups } = await runPreMainEffectsWithDocument(fakeDocument);
  assert.equal(sourceTextWrites, 0, 'idempotent reruns should not cause childList mutations by rewriting source chip text');
  observers[0].callback();
  assert.equal(sourceTextWrites, 0, 'observer callback remains a no-op for already-polished source chip text');
  cleanups.forEach((cleanup) => cleanup());
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

  const { observers } = await runPreMainEffectsWithDocument(fakeDocument, {
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
  const action = row.children.find((child) => child.dataset.nousromancerResponseAction === 'true');
  assert.ok(action, 'safe response target renders a bounded row action');
  assert.equal(action.tagName, 'A');
  assert.equal(action.textContent, 'Respond →');
  assert.equal(action.getAttribute('href'), '/sessions/sess-attention');
  assert.equal(action.getAttribute('aria-label'), 'Respond from Hermes attention context');
  assert.match(action.getAttribute('title'), /Open the dashboard-local response target/i);
  let propagationStopped = false;
  assert.equal(typeof action.onclick, 'function');
  action.onclick({ stopPropagation() { propagationStopped = true; } });
  assert.equal(propagationStopped, true, 'row action click does not bubble into the row click handler');
  assert.doesNotMatch(`${action.textContent} ${action.getAttribute('title')} ${action.getAttribute('href')}`, /needs input|blocked on you|highest priority|discord\.com|\d{17,20}/i);
  assert.equal(created.length, 2, 'one chip and one row action are created for the explicit attention row');
  const writesAfterFirstPass = chip.attributeWriteCount;
  const actionWritesAfterFirstPass = action.attributeWriteCount;
  observers[0].callback();
  assert.equal(created.length, 2, 'observer re-polish does not create duplicate attention chips/actions');
  assert.equal(row.children.filter((child) => child.dataset.nousromancerAttentionContext === 'true').length, 1);
  assert.equal(row.children.filter((child) => child.dataset.nousromancerResponseAction === 'true').length, 1);
  assert.equal(chip.attributeWriteCount, writesAfterFirstPass, 'observer re-polish does not rewrite unchanged chip attributes');
  assert.equal(action.attributeWriteCount, actionWritesAfterFirstPass, 'observer re-polish does not rewrite unchanged action attributes');
});

test('Nousromancer uses Inspect for explicit blocked/error row response targets', async () => {
  const row = makeElement({ textContent: 'Runtime failure handoff' });
  row.dataset.sessionId = 'sess-blocked';
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
      id: 'sess-blocked',
      title: 'Runtime failure handoff',
      is_active: true,
      source: 'cli',
      attention_state: 'blocked',
      attention_reason: 'tool failure requires inspection',
      response_target: { kind: 'dashboard_session', surface: 'dashboard', path: '/sessions/sess-blocked' },
    }],
    error: null,
  });

  const action = row.children.find((child) => child.dataset.nousromancerResponseAction === 'true');
  assert.ok(action, 'safe blocked response target renders a bounded inspect action');
  assert.equal(action.textContent, 'Inspect →');
  assert.equal(action.getAttribute('href'), '/sessions/sess-blocked');
  assert.equal(action.getAttribute('aria-label'), 'Inspect Hermes attention context');
  assert.doesNotMatch(`${action.textContent} ${action.getAttribute('title')}`, /needs input|blocked on you|highest priority/i);
});

test('Nousromancer keeps explicit possibly-waiting row context non-actionable', async () => {
  const row = makeElement({ textContent: 'Maybe waiting handoff' });
  row.dataset.sessionId = 'sess-possibly-waiting';
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
      id: 'sess-possibly-waiting',
      title: 'Maybe waiting handoff',
      is_active: true,
      source: 'discord',
      attention_state: 'possibly_waiting',
      attention_reason: 'assistant asked a hedged follow-up',
      response_target: { kind: 'dashboard_session', surface: 'dashboard', path: '/sessions/sess-possibly-waiting' },
    }],
    error: null,
  });

  const chip = row.children.find((child) => child.dataset.nousromancerAttentionContext === 'true');
  assert.ok(chip, 'explicit possibly-waiting row context can render as hedged metadata');
  assert.match(chip.textContent, /attn:waiting/i);
  assert.equal(row.children.filter((child) => child.dataset.nousromancerResponseAction === 'true').length, 0, 'hedged possibly-waiting state does not render a row action');
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
      attention_reason: 'awaiting your input because this is P0 and blocked-on-you',
      attention_evidence: [
        { type: 'assistant_prompt', source: 'session', summary: 'top of the queue and most important approval requested' },
      ],
    }],
    error: null,
  });

  const chip = row.children.find((child) => child.dataset.nousromancerAttentionContext === 'true');
  assert.ok(chip, 'bounded attention context still renders after unsafe detail redaction');
  assert.match(chip.textContent, /attn:requested|attn:attention/i);
  assert.doesNotMatch(`${chip.textContent} ${chip.getAttribute('title')}`, /needs input|needs your input|awaiting your input|blocked on you|blocked-on-you|highest priority|top priority|top of the queue|most important|\bP0\b/i);
});

test('Nousromancer redacts unsafe private handles from non-unknown Sessions-row attention tooltips', async () => {
  const snowflake = ['1498420617', '710407823'].join('');
  const tokenish = ['github_pat_', 'unsafeTOKEN123456789'].join('');
  const row = makeElement({ textContent: 'Unsafe detail handoff' });
  row.dataset.sessionId = 'sess-unsafe-detail';
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
      id: 'sess-unsafe-detail',
      title: 'Unsafe detail handoff',
      is_active: true,
      source: 'discord',
      attention_state: 'waiting_on_human',
      attention_reason: `approval requested in https://discord.com/channels/${snowflake}/${snowflake}`,
      attention_evidence: [
        { type: 'assistant_prompt', source: 'session', summary: `private token ${tokenish}` },
      ],
      response_target: { kind: 'discord', surface: 'discord', label: tokenish, path: `https://discord.com/channels/${snowflake}/${snowflake}` },
    }],
    error: null,
  });

  const chip = row.children.find((child) => child.dataset.nousromancerAttentionContext === 'true');
  assert.ok(chip, 'bounded attention context still renders after private detail redaction');
  assert.match(chip.textContent, /attn:requested/i);
  const rendered = `${chip.textContent} ${chip.getAttribute('title')}`;
  assert.doesNotMatch(rendered, new RegExp(`${snowflake}|discord\\.com/channels|github...OKEN`));
  assert.equal(rendered.includes(tokenish), false);
  assert.doesNotMatch(rendered, /needs input|blocked on you|highest priority/i);
  assert.equal(row.children.filter((child) => child.dataset.nousromancerResponseAction === 'true').length, 0, 'unsafe response target stays silent');
});

test('Nousromancer does not attach attention context by title-only or generic data-id matching when stable row IDs are absent', async () => {
  const row = makeElement({ textContent: 'Release decision', attributes: { 'data-id': 'sess-id-not-on-row' } });
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
      if (/data-session-id|data-session|data-id|role="row"|cursor-pointer|article|li|tr/.test(selector)) return [row];
      return [];
    },
  };

  await runPreMainEffectsWithDocument(fakeDocument, {
    status: { gateway_running: true, active_sessions: 1 },
    sessions: [{
      id: 'sess-id-not-on-row',
      title: 'Release decision',
      is_active: true,
      source: 'discord',
      attention_state: 'waiting_on_human',
      attention_reason: 'approval requested',
    }],
    error: null,
  });

  assert.equal(row.children.filter((child) => child.dataset.nousromancerAttentionContext === 'true').length, 0);
});

test('Nousromancer removes stale Sessions-row attention context when explicit state becomes unknown', async () => {
  const row = makeElement({ textContent: 'State changed handoff' });
  row.dataset.sessionId = 'sess-state-change';
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
      if (/data-session-id|data-session/.test(selector)) return [row];
      if (/data-nousromancer-attention-context/.test(selector)) {
        return row.children.filter((child) => child.dataset.nousromancerAttentionContext === 'true');
      }
      return [];
    },
  };

  await runPreMainEffectsWithDocument(fakeDocument, {
    status: { gateway_running: true, active_sessions: 1 },
    sessions: [{
      id: 'sess-state-change',
      title: 'State changed handoff',
      is_active: true,
      source: 'discord',
      attention_state: 'waiting_on_human',
      attention_reason: 'approval requested',
      response_target: { kind: 'dashboard_session', surface: 'dashboard', path: '/sessions/sess-state-change' },
    }],
    error: null,
  });
  assert.equal(row.children.filter((child) => child.dataset.nousromancerAttentionContext === 'true').length, 1);
  assert.equal(row.children.filter((child) => child.dataset.nousromancerResponseAction === 'true').length, 1);

  await runPreMainEffectsWithDocument(fakeDocument, {
    status: { gateway_running: true, active_sessions: 1 },
    sessions: [{
      id: 'sess-state-change',
      title: 'State changed handoff',
      is_active: true,
      source: 'discord',
      attention_state: 'unknown',
    }],
    error: null,
  });
  assert.equal(row.children.filter((child) => child.dataset.nousromancerAttentionContext === 'true').length, 0);
  assert.equal(row.children.filter((child) => child.dataset.nousromancerResponseAction === 'true').length, 0);
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
  assert.equal(row.children.filter((child) => child.dataset.nousromancerResponseAction === 'true').length, 0);
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
  assert.match(css, /data-nousromancer-response-action/);
  assert.match(css, /Respond|Inspect|response action/i);
  assert.match(css, /data-nousromancer-danger-action="delete"/);
  assert.match(css, /opacity:\s*0/);
  assert.match(css, /hover.*data-nousromancer-danger-action/s);
});
