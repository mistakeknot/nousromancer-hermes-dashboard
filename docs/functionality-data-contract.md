# Nousromancer functionality data contract

Status: working contract for the dashboard functionality lane. User-reviewed v1 promise: staged attention layer plus conservative heuristic experiment (**B+C**).

## Purpose

The functionality lane should only add operator-facing behavior when the available Hermes data can support it truthfully. The current product question is:

```text
which agent needs me → why now → where do I respond
```

The public Nousromancer plugin now treats the upstream attention contract as the preferred source when it is present. It can still only claim what the contract says: an evidence-backed attention signal for one fetched session, not a global priority ranking across all work.

## Current public dashboard APIs

The dashboard plugin SDK exposes the same API helpers as the web app:

- `SDK.api.getStatus()` → `GET /api/status`
- `SDK.api.getSessions(limit, offset)` → `GET /api/sessions?limit=…&offset=…`
- `SDK.api.getSessionMessages(id)` → `GET /api/sessions/:id/messages`
- `SDK.api.searchSessions(q)` → `GET /api/sessions/search?q=…`

The protected endpoints use the dashboard session token injected into the page. Public plugin code should rely on `SDK.api` instead of fetching these endpoints manually.

## Available status fields

`/api/status` currently provides:

| Field | Useful for | Notes |
| --- | --- | --- |
| `gateway_running` | runtime health | Reliable high-level live/offline signal. |
| `gateway_state` | runtime health | More semantic state such as `running`, `stopped`, or startup failure. |
| `gateway_platforms` | source health | Per-platform status when available; public-safe if rendered generically. |
| `gateway_exit_reason` | failure explanation | Useful for logs CTA title/detail, not a primary badge. |
| `gateway_updated_at` | runtime freshness | Useful as a stale-health indicator if present. |
| `active_sessions` | activity level | Count only; does not say who needs human input. |
| `version`, `release_date`, config version fields | environment metadata | Useful for status/debug surfaces, not Now Bar priority. |

Implemented now: the Now Bar uses `gateway_running`, `active_sessions`, API error state, and local last-successful poll time to show live/offline/error/fresh/stale text.

## Available session fields

`/api/sessions` currently provides session records with these public-useful fields:

| Field | Useful for | Notes |
| --- | --- | --- |
| `id` | route target / detail fetch | Should not be over-emphasized in public screenshots. |
| `source` | response surface hint | `discord`, `cli`, `cron`, etc.; useful as quiet metadata and possible route hint. |
| `model` | scan metadata | Useful but not attention priority. |
| `title` / `preview` | human-readable context | Best available public summary. Can be empty for new active sessions. |
| `started_at`, `last_active`, `ended_at` | recency / stale state | Good for ranking and stale badges. |
| `is_active` | current activity | Five-minute activity heuristic; not the same as waiting on human. |
| `message_count`, `tool_call_count` | work magnitude | Useful for row scan hierarchy. |
| token/cost fields | usage metadata | Useful for analytics, not human-input triage. |
| `parent_session_id`, lineage fields | continuity | Potential future grouping, but not enough by itself. |

`/api/sessions/:id/messages` can expose message roles, timestamps, content, and tool-call metadata after opening a row. This can support a conservative “last role” heuristic, but fetching messages for every row would be heavier than the current list API and should not be the first public plugin behavior.

## Session attention contract fields

Hermes Agent now exposes additive attention fields on session-list records. Nousromancer consumes them before local heuristics:

| Field | Useful for | Nousromancer behavior |
| --- | --- | --- |
| `attention_state` | Evidence-backed state | `unknown`/empty stays silent; `possibly_waiting` keeps hedged copy; `waiting_on_human`, `blocked`, and `error` render an `Attention: …` pill in the Now Bar and quiet `attn:<state>` metadata in matching Sessions rows without claiming global priority. |
| `attention_reason` | Why now | Rendered only in sanitized title/tooltips, not as noisy row copy. Unsafe URLs, snowflakes, and token-like strings are suppressed. |
| `response_target.path` | Where to answer | Used as the Now Bar CTA and, when row identity is stable, as a bounded Sessions-row `Respond →` / `Inspect →` affordance only when the state is actionable (`waiting_on_human`, `blocked`, or `error`) and the path is safe and dashboard-local; otherwise fallback remains `/sessions` in the Now Bar and row affordance stays silent. |
| `attention_evidence` | Evidence basis | Sanitized summaries may appear in tooltips for the Now Bar and Sessions-row context. Raw private handles and unsafe refs are not rendered. |

Explicit contract signals outrank heuristic signals. Local heuristics remain fallback-only and keep the label `Possibly waiting`.

## Missing signals for true cross-work triage

The current public plugin still does **not** own reliable global triage for:

- comparison across every live workstream / agent body
- durable operator-decision state
- first-party write/answer capture
- approval/consent governance
- cross-project urgency/stakes owned outside Hermes sessions
- whether the latest user message has already been answered when upstream attention fields are absent

Therefore, the plugin should not claim “which agent needs me most” as a precise feature yet. It can say what is live, stale, recent, where the latest trace came from, and whether one fetched session carries explicit attention evidence.

## Public-safe implementation boundaries

Safe in public Nousromancer:

- generic gateway/session health
- source labels such as `src:discord`, `src:cli`, `src:cron`
- recency/freshness text
- latest trace title/preview after truncation
- links to built-in dashboard routes such as `/sessions` and `/logs`
- non-color-only state labels: `Gateway live`, `API error`, `Stale 20m`

Avoid in public Nousromancer:

- non-public project names or workstream cards
- raw external channel IDs, thread IDs, or credential-bearing URLs
- pretending internal/governor approval state exists in the public dashboard API
- broad DOM surgery inside core pages unless the selector surface stays narrow and tested

## Smallest next behavior

The current behavior is **explicit-contract first, B+C fallback**: prefer upstream attention evidence when present, then fall back to health/source/freshness plus conservative heuristic hints:

```text
Now · Gateway live · 3 active · Updated now · Latest: src:discord · Attention: approval · Respond →
```

Fallback without explicit contract:

```text
Now · Gateway live · 3 active · Updated now · Latest: src:discord · Possibly waiting · Trace →
```

Rules:

1. Keep the existing health/freshness/error pills.
2. Derive `Latest: src:<source>` from the first returned session when present.
3. Prefer the first fetched session with an explicit non-unknown `attention_state` and render a sanitized `Attention: …` or explicit `Possibly waiting` pill.
4. Use a safe dashboard-local `response_target.path` for the CTA when available; otherwise link to `/sessions` when the dashboard API is healthy and `/logs` on API/runtime errors.
5. Do not label anything `needs input`, `blocked on you`, or `highest priority` from public Nousromancer.
6. If the heuristic is used, label it `Possibly waiting`, source it from bounded evidence, and make the uncertainty visible in copy/tests.

Current infrastructure:

- **Now Bar contract signal:** explicit upstream fields render a bounded `Attention: …` / `Possibly waiting` pill and safe dashboard-local CTA when present.
- **Sessions row context and affordance:** matching Sessions rows with stable row ID hooks get quiet `attn:<state>` and `src:<source>` metadata only from explicit non-unknown upstream attention fields; reason/evidence stay in sanitized tooltips. If the same explicit contract is actionable (`waiting_on_human`, `blocked`, or `error`) and includes a safe dashboard-local `response_target.path`, the row also gets a bounded `Respond →` / `Inspect →` affordance. If row identity is unavailable, the plugin suppresses row metadata/action instead of matching by title text. Stable row hooks currently mean `data-session-id` or `data-session`; generic `data-id` is intentionally ignored.
- **Message-role hint:** show `Possibly waiting` when the latest meaningful session turn is assistant/agent-originated and question-like.
- **Error/stall hint:** show `Possibly waiting` when session state/error fields indicate `stalled`, `failed`, `blocked`, degraded state, failed tools, or similar interruption evidence.
- **Explicit upstream hook:** consume `attention_state`, `attention_reason`, `response_target`, and `attention_evidence` when Hermes exposes them. Explicit evidence outranks local heuristics, but public copy remains bounded to evidence-backed attention state, not global priority.
- **Fallback:** show no attention hint when evidence is insufficient.

## Follow-up implementation candidates

1. **Now Bar source hint**
   - Add latest-session source to the Now Bar.
   - Tests: source shown for latest session; absent sessions keep `No recent trace`; no private handles.

2. **Downstream attention contract consumption**
   - Implemented in the Now Bar: explicit `attention_state`, `attention_reason`, `response_target`, and `attention_evidence` are consumed before heuristics.
   - Tests cover explicit attention rendering, safe response-target routing, unknown suppression, unsafe field redaction, heuristic fallback, and legacy sessions.

3. **Sessions row attention context and response affordance**
   - Implemented for explicit upstream contract evidence: matching rows with stable row ID hooks receive quiet `attn:<state>` / `src:<source>` metadata, sanitized tooltips, and a bounded `Respond →` / `Inspect →` affordance when the state is actionable and `response_target.path` is safe and dashboard-local.
   - Unknown, unsafe, unidentifiable, missing-target, or hedged `possibly_waiting` row action evidence stays silent, and heuristics remain Now Bar fallback-only rather than row-level certainty.

## Decision

For the current public/demo promise, Nousromancer now uses **explicit contract first, B+C fallback**: show health, freshness, source orientation, consume explicit upstream session attention fields when present, and otherwise keep heuristic `Possibly waiting` hints hedged. Treat full operator decision capture and global multi-agent prioritization as private ops / upstream coordination work, not a public CSS/plugin-polish claim.
