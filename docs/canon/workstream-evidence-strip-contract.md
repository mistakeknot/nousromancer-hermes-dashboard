# Workstream evidence strip contract

Status: working contract for `nousrmncr-s03`. This file defines a boundary-safe product/data-contract pattern for market-shaped workstream evidence in Nousromancer. It is not an implementation spec and does not grant Nousromancer routing, judging, governance, allocation, consent, provenance, or system-of-record authority.

## Purpose

The workstream evidence strip is an operator-orientation pattern: it can show enough evidence for a human to inspect competing attempts, freshness, provenance, disagreement, retry/evaluation context, and safe response targets without pretending that Nousromancer chooses the best route or owns the durable truth.

The source idea from `nousrmncr-qho` is market-shaped coordination: independent attempts and retries can be useful when diversity matters more than centralized planner coherence. In Nousromancer, that becomes a presentation discipline, not a marketplace.

## Layer rule

Nousromancer may:

- show available evidence;
- surface and compare bounded fields;
- orient the operator toward inspection;
- hint when evidence is explicit or visibly uncertain;
- prepare a dashboard-local response or inspect affordance.

Nousromancer must not:

- route, allocate, or choose an agent;
- judge or certify a winner;
- govern approvals, consent, or authorization;
- claim global priority from heuristics;
- become the durable record for Sylveste-grade work.

If a field implies durable coordination, routing, judging, governance, provenance, consent, or artifact authority, the owner is upstream of Nousromancer by default.

## Current public-safe fields

These fields may be rendered from current Hermes dashboard/session data when present. They are orientation metadata, not market proof.

| Field | Likely owner | Rendering behavior | Absent / stale behavior | Unsafe / redaction behavior |
| --- | --- | --- | --- | --- |
| `gateway_running` / `gateway_state` | Hermes | `Gateway live`, `Gateway stopped`, or degraded runtime copy. | Show unknown/offline/error state; do not infer workstream health. | Suppress raw failure details unless already public-safe. |
| `gateway_updated_at` / local poll time | Hermes / Nousromancer | Freshness pill such as `Updated now` or `Stale 20m`. | Show stale/unknown rather than hiding missing recency. | Do not expose host-local paths or logs in copy. |
| `active_sessions` | Hermes | Activity count only: `3 active`. | Show no activity count or `No active sessions`. | Do not claim active count means human attention. |
| `source` | Hermes | Quiet metadata such as `src:discord`, `src:cli`, `src:cron`. | Suppress or show `src:unknown`. | Never render raw Discord channel/thread IDs in public UI. |
| `title` / `preview` | Hermes | Human-readable trace summary after truncation. | Use `Untitled`/empty-state copy. | Sanitize URLs, snowflakes, tokens, secrets, and private handles. |
| `started_at` / `last_active` / `ended_at` | Hermes | Recency/freshness row metadata. | Reduce confidence; mark stale or unknown. | Do not infer urgency from recency alone. |
| `is_active` | Hermes | Current activity hint only. | Suppress when absent. | Do not render as `needs input` or priority. |
| `message_count` / `tool_call_count` | Hermes | Scan-weight metadata such as `msgs:18 · tools:3`. | Suppress when absent. | Do not equate high count with importance. |
| `parent_session_id` / lineage | Hermes | `related trace` / continuity hint when public-safe. | Suppress when absent. | Do not claim retry group or candidate set semantics from lineage alone. |
| `attention_state` | Hermes | Explicit bounded attention pill, e.g. `Attention: waiting_on_human`, only for non-unknown states. | Unknown/empty stays silent; heuristic fallback remains `Possibly waiting`. | Do not promote to global priority. |
| `attention_reason` | Hermes | Sanitized tooltip/explanation, not noisy row copy. | Suppress when absent. | Suppress unsafe URLs, snowflakes, tokens, and private refs. |
| `response_target.path` | Hermes | Dashboard-local `Respond ->` / `Inspect ->` only when safe and actionable. | Fall back to `/sessions` or suppress row action. | Reject external, credential-bearing, raw-channel, and non-dashboard-local paths. |
| `attention_evidence` | Hermes | Sanitized evidence summary or tooltip. | Suppress when absent. | Do not render raw private handles or source payloads. |

## Future upstream-contract fields

These fields would make market-shaped evidence more meaningful, but they require explicit upstream owners and failure behavior before Nousromancer renders them as more than design placeholders.

| Field | Owning layer | Rendering behavior if present | Absent / stale behavior | Unsafe / redaction behavior |
| --- | --- | --- | --- | --- |
| `workstream_id` | Sylveste / Interverse / future substrate | Group attempts under a named workstream evidence strip. | Do not group by title heuristics. | Use public-safe display names; hide private IDs if needed. |
| `attempt_group_id` | Sylveste / Interverse / Hermes if session-scoped | Group sibling attempts/candidates. | Suppress candidate-count claims. | Do not expose internal run IDs unless safe. |
| `attempt_role` | Upstream coordinator / Clavain / Sylveste | `proposer`, `reviewer`, `judge`, `retry`, `synthesis` labels. | Show generic `attempt` or suppress. | Do not infer roles from model name or source. |
| `attempt_number` / `retry_count` / `candidate_count` | Upstream coordinator | `3 candidates · 2 retries`. | Do not infer retry count from lineage alone. | Cap or generalize counts if private scale is sensitive. |
| `declared_fit` / `model_bid` / `self_confidence` | Ockham / upstream coordinator | Render as self-declared evidence only: `fit:high`, `bid:low cost`. | Suppress when absent; never synthesize. | Label as self-declared, not validated. |
| `judge_result` / `evaluation_score` | Judge/eval owner upstream | `judge:evaluation attached` or bounded score if public-safe. | Suppress winner/score copy. | Hide private rubric details unless safe. |
| `selection_reason` | Judge/eval owner upstream | `selected because: <bounded reason>` only if an upstream judge owns selection. | Do not claim selection. | Redact private project/person/model details. |
| `disagreement_summary` | Reviewer/judge/synthesis owner upstream | `disagreement noted` with inspect affordance. | Suppress; do not invent conflict. | Summarize safely; avoid leaking private text. |
| `winning_candidate_id` | Judge/eval owner upstream | `selected candidate` only when selection is explicit. | Do not render winner language. | Prefer display label over raw ID. |
| `reputation_snapshot` | Ockham / future reputation substrate | Bounded historical evidence with owner and timestamp. | Suppress entirely. | Never imply global competence without owner, sample, and timestamp. |
| `claim_confidence` | Claim-owning upstream layer | Confidence attached to a specific field, not the whole workstream. | Reduce/suppress the claim. | Make low confidence visible. |
| `redaction_policy` | Upstream source + Nousromancer renderer | Render only allowed fields for the current surface. | Default to public-safe suppression. | Fail closed: suppress unsafe evidence. |

## UI/copy examples

### Current safe Now Bar

```text
Now · Gateway live · 3 active · Updated now · Latest: src:discord · Possibly waiting · Inspect ->
```

Meaning: Hermes is live, recent session source is visible, and local heuristic evidence may warrant inspection. It does not mean the operator is definitively needed.

### Current explicit-attention Now Bar

```text
Now · Gateway live · 3 active · Attention: waiting_on_human · Evidence available · Respond ->
```

Meaning: an upstream Hermes attention contract provided explicit session-scoped evidence and a safe dashboard-local response target. It does not mean global priority.

### Future workstream evidence strip

```text
Evidence · 3 candidates · 2 retries · disagreement noted · judge:evaluation attached · Inspect evidence ->
```

Meaning: upstream contracts supplied candidate/retry/disagreement/evaluation fields. Nousromancer presents them for inspection; it does not pick a winner unless an upstream judge explicitly owns and exposes that selection.

## Overclaim blacklist

Do not use these labels unless a named upstream contract explicitly owns the underlying claim and this doc is updated with rendering/failure behavior:

- `Best agent`
- `Winner`
- `Choose this`
- `Route here`
- `Highest priority`
- `Needs you`
- `Blocked on you`
- `Certified answer`
- `Approved`
- `Authorized`
- `Governed`
- `Allocated`
- `Consensus`

Safer replacements:

- `Evidence available`
- `Inspect evidence`
- `Disagreement noted`
- `Possibly waiting`
- `Attention: <explicit upstream state>`
- `Related trace`
- `Candidate evidence`
- `Evaluation attached`

## Failure behavior

1. **Absent data:** suppress the claim or render `unknown`; never fill gaps with confident prose.
2. **Stale data:** show age and lower confidence; do not rank stale evidence above fresh evidence without upstream semantics.
3. **Conflicting data:** show `disagreement noted` only when the conflict is explicit; otherwise prefer inspect affordances over summary claims.
4. **Unsafe data:** fail closed and suppress. Public Nousromancer must not leak raw Discord IDs, private workstream names, credentials, token-like strings, or private project handles.
5. **No upstream owner:** render as design placeholder or do not render. Nousromancer cannot invent ownership.

## GO / NO-GO

**GO:** Use the workstream evidence strip as a product/design contract for orientation. It is appropriate to document, mock, and eventually render bounded evidence when upstream fields exist or current public-safe Hermes fields support the claim.

**NO-GO:** Do not implement a Nousromancer-owned marketplace, router, judge, governor, approval engine, allocation engine, reputation system, or global priority ranking.

**First implementation gate:** only create an implementation bead after one of these is true:

1. current Hermes/session fields are enough for a purely presentational public-safe strip that makes no candidate/retry/judge claims; or
2. an upstream owner supplies explicit fields for candidate grouping, evaluation, disagreement, and redaction.

Until then, this contract is a boundary and design artifact, not code work.
