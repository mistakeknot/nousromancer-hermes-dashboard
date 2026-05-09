const SNOWFLAKE = ['1498420617', '710407823'].join('');
const TOKENISH = ['sk-', 'unsafeTOKEN123456789'].join('');

function baseSession(overrides) {
  return {
    id: 'sess-fixture',
    source: 'discord',
    title: 'Fixture session',
    title_source: 'title',
    started_at: 1778340000,
    ended_at: null,
    last_active: 1778340600,
    is_active: true,
    message_count: 3,
    tool_call_count: 0,
    input_tokens: 128,
    output_tokens: 512,
    preview: 'Synthetic public-safe /api/sessions fixture.',
    attention_state: 'unknown',
    attention_reason: '',
    attention_evidence: [],
    response_target: { kind: 'dashboard_session', surface: 'dashboard', path: '/sessions/sess-fixture' },
    ...overrides,
  };
}

export const sessionApiFixtureMatrix = {
  explicit: baseSession({
    id: 'sess-explicit-waiting',
    title: 'Review release decision',
    source: 'discord',
    attention_state: 'waiting_on_human',
    attention_reason: 'approval requested for release merge',
    attention_evidence: [
      { type: 'assistant_prompt', source: 'session', summary: 'Assistant asked for release approval.', confidence: 'high' },
    ],
    response_target: { kind: 'dashboard_session', surface: 'dashboard', label: 'Open session', path: '/sessions/sess-explicit-waiting' },
  }),
  blocked: baseSession({
    id: 'sess-explicit-blocked',
    title: 'Runtime failure handoff',
    source: 'cli',
    attention_state: 'blocked',
    attention_reason: 'tool failure requires inspection',
    attention_evidence: [
      { type: 'tool_error', source: 'session', summary: 'Tool failure needs inspection.', confidence: 'high' },
    ],
    response_target: { kind: 'dashboard_session', surface: 'dashboard', path: '/sessions/sess-explicit-blocked' },
  }),
  error: baseSession({
    id: 'sess-explicit-error',
    title: 'API failure handoff',
    source: 'cli',
    attention_state: 'error',
    attention_reason: 'runtime API error requires inspection',
    attention_evidence: [
      { type: 'api_error', source: 'session', summary: 'Runtime API error.', confidence: 'high' },
    ],
    response_target: { kind: 'dashboard_session', surface: 'dashboard', path: '/sessions/sess-explicit-error' },
  }),
  possiblyWaiting: baseSession({
    id: 'sess-explicit-possibly-waiting',
    title: 'Maybe waiting handoff',
    source: 'telegram',
    attention_state: 'possibly_waiting',
    attention_reason: 'assistant asked a hedged follow-up',
    attention_evidence: [
      { type: 'assistant_question', source: 'messages', summary: 'Assistant asked a question.', confidence: 'low' },
    ],
    response_target: { kind: 'dashboard_session', surface: 'dashboard', path: '/sessions/sess-explicit-possibly-waiting' },
  }),
  heuristic: baseSession({
    id: 'sess-heuristic-question',
    title: 'Fallback question-like session',
    source: 'discord',
    attention_state: 'unknown',
    attention_reason: '',
    attention_evidence: [],
    response_target: { kind: 'dashboard_session', surface: 'dashboard', path: '/sessions/sess-heuristic-question' },
    messages: [
      { role: 'user', content: 'Check whether the branch is ready.' },
      { role: 'assistant', content: 'Should I merge this now, or wait for another pass?' },
    ],
  }),
  unknown: baseSession({
    id: 'sess-unknown-quiet',
    title: 'Background cleanup',
    source: 'local',
    attention_state: 'unknown',
    attention_reason: '',
    attention_evidence: [],
    response_target: { kind: 'dashboard_session', surface: 'dashboard', path: '/sessions/sess-unknown-quiet' },
  }),
  absent: baseSession({
    id: 'sess-absent-evidence',
    title: 'No evidence handoff',
    source: 'cli',
    attention_state: undefined,
    attention_reason: undefined,
    attention_evidence: undefined,
    response_target: undefined,
  }),
  unsafePrivate: baseSession({
    id: 'sess-unsafe-private',
    title: 'Unsafe private target',
    source: 'discord',
    attention_state: 'waiting_on_human',
    attention_reason: `approval requested in https://discord.com/channels/${SNOWFLAKE}/${SNOWFLAKE}`,
    attention_evidence: [
      { type: 'assistant_prompt', source: 'discord', summary: `private token ${TOKENISH}`, confidence: 'high' },
    ],
    response_target: { kind: 'discord', surface: 'discord', label: TOKENISH, path: `https://discord.com/channels/${SNOWFLAKE}/${SNOWFLAKE}` },
  }),
};

export const paginatedSessionsApiFixture = {
  sessions: Object.values(sessionApiFixtureMatrix),
  total: Object.values(sessionApiFixtureMatrix).length,
  limit: Object.values(sessionApiFixtureMatrix).length,
  offset: 0,
};

export const unsafeFixtureParts = {
  snowflake: SNOWFLAKE,
  tokenish: TOKENISH,
};
