import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const PLUGIN_PATH = new URL('../plugins/dtla-mission-control/dashboard/dist/index.js', import.meta.url);
const README_PATH = new URL('../README.md', import.meta.url);

function flattenText(node) {
  if (node == null || typeof node === 'boolean') return [];
  if (typeof node === 'string' || typeof node === 'number') return [String(node)];
  if (Array.isArray(node)) return node.flatMap(flattenText);
  return flattenText(node.children || []);
}

function collectLinks(node, links = []) {
  if (node == null || typeof node !== 'object') return links;
  if (node.type === 'a') links.push(node.props || {});
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
    sessions: [{ id: 'sess-1', title: 'Build DTLA plugin', is_active: true }],
    error: null,
  });
  const text = flattenText(node).join(' ');
  const links = collectLinks(node);

  assert.match(text, /\bNow\b/);
  assert.match(text, /Gateway live/i);
  assert.match(text, /1 active/i);
  assert.match(text, /Build DTLA plugin/i);
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

test('README explains the Now Bar usefulness in judge-scannable language', async () => {
  const source = await readFile(README_PATH, 'utf8');

  assert.match(source, /persistent Now Bar/i);
  assert.match(source, /gateway health/i);
  assert.match(source, /active runs/i);
  assert.match(source, /latest trace/i);
  assert.match(source, /next useful action/i);
});
