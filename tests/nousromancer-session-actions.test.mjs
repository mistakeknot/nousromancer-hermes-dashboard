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
    parentElement: null,
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    getAttribute(name) {
      return this.attributes[name];
    },
    querySelector() {
      return null;
    },
  };
  return element;
}

async function runPreMainEffectsWithDocument(fakeDocument) {
  const source = await readFile(PLUGIN_PATH, 'utf8');
  const slots = new Map();
  const effects = [];
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
        return [{ status: { gateway_running: true, active_sessions: 0 }, sessions: [], error: null }, () => {}];
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

test('Nousromancer CSS visually demotes source chips and destructive session row actions', async () => {
  const css = await readFile(CSS_PATH, 'utf8');

  assert.match(css, /data-nousromancer-search-polished/);
  assert.match(css, /data-nousromancer-source-chip/);
  assert.match(css, /src:discord|source chip|session source/i);
  assert.match(css, /data-nousromancer-danger-action="delete"/);
  assert.match(css, /opacity:\s*0/);
  assert.match(css, /hover.*data-nousromancer-danger-action/s);
});
