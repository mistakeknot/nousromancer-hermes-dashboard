# Nousromancer functionality data contract

Status: working contract for the dashboard functionality lane. User-reviewed v1 promise: staged attention layer plus conservative heuristic experiment (**B+C**).

## Purpose

The functionality lane should only add operator-facing behavior when the available Hermes data can support it truthfully. The current product question is:

```text
which agent needs me → why now → where do I respond
```

The public Nousromancer plugin can help with orientation and runtime health today. Its v1/demo promise is staged: show truthful health/freshness/source context, and optionally add a deliberately conservative `Possibly waiting` heuristic. It cannot yet claim reliable human-input triage without a new Hermes session signal.

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

## Missing signals for true human-input triage

The current APIs do **not** expose a reliable public field for:

- `waiting_on_human` / `needs_input`
- last completed assistant ask vs. ongoing assistant/tool work
- response target URL/channel/thread/surface
- blocked reason or approval gate
- explicit urgency/stakes/priority
- whether the latest user message has already been answered

Therefore, the plugin should not claim “which agent needs me most” as a precise feature yet. It can say what is live, stale, recent, and where the latest trace came from.

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

The accepted v1 behavior is **B+C**: a staged attention layer plus a conservative heuristic experiment, not a full triage queue:

```text
Now · Gateway live · 3 active · Updated now · Latest: src:discord · Possibly waiting · Trace →
```

Rules:

1. Keep the existing health/freshness/error pills.
2. Derive `Latest: src:<source>` from the first returned session when present.
3. Link to `/sessions` when the dashboard API is healthy; link to `/logs` on API/runtime errors.
4. Do not label anything `needs input`, `blocked on you`, or `highest priority` until Hermes exposes an explicit signal.
5. If the heuristic is used, label it `Possibly waiting`, source it from bounded evidence, and make the uncertainty visible in copy/tests.

Current infrastructure:

- **Message-role hint:** show `Possibly waiting` when the latest meaningful session turn is assistant/agent-originated and question-like.
- **Error/stall hint:** show `Possibly waiting` when session state/error fields indicate `stalled`, `failed`, `blocked`, degraded state, failed tools, or similar interruption evidence.
- **Future upstream hook:** consume explicit `attention_state`, `waiting_on_human`, `requires_action`, blocked reason, response target, and urgency/stakes when Hermes exposes them, while preserving the public copy boundary.
- **Fallback:** show no attention hint when evidence is insufficient.

## Follow-up implementation candidates

1. **Now Bar source hint**
   - Add latest-session source to the Now Bar.
   - Tests: source shown for latest session; absent sessions keep `No recent trace`; no private handles.

2. **Session attention contract upstream**
   - Propose or implement a Hermes `attention_state` / `waiting_on_human` field in the session list API.
   - Tests: list endpoint includes conservative default; UI can rank without fetching every message.

3. **Sessions row attention context**
   - Carry the tested `Possibly waiting` evidence into Sessions row metadata.
   - Show the evidence source quietly (`assistant question-like turn`, `session stalled`, `failed tool`) without converting it into authoritative priority.
   - Must avoid noisy false certainty.

## Decision

For the current public/demo promise, choose **B+C**: ship/show health, freshness, source orientation, and optionally a hedged `Possibly waiting` hint if implemented and tested. Treat full human-input triage as a Hermes/API contract problem, not a CSS/plugin-polish claim.
