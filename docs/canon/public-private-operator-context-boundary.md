# Public/private operator-context boundary

Status: working contract for `nousrmncr-d14.4`. This file defines the boundary between the public Hermes-safe Nousromancer dashboard and richer private operator context from Masaq, GSV, Sylveste-adjacent workflows, Beads, and future coordination substrates.

## Purpose

Nousromancer helps a Hermes operator recover context after an interruption. It can show what Hermes knows now, make uncertainty visible, and stage safe inspection or response affordances.

It must not turn private operator context into public product surface. It also must not become the system of record for Sylveste, Beads, Masaq, GSV, Ockham, Clavain, Interverse, or future coordination layers.

Short rule:

> Nousromancer may orient the operator. Upstream systems own durable truth.

## Layer boundary

Nousromancer may:

- show Hermes runtime and session state;
- surface public-safe source, recency, freshness, and attention evidence;
- hint when evidence is explicit or visibly uncertain;
- prepare dashboard-local `Inspect` or `Respond` affordances;
- represent upstream work without claiming to own it.

Nousromancer must not:

- govern, authorize, approve, route, allocate, or certify work;
- decide which agent or workstream is globally most important;
- become the durable record for Beads/Sylveste work;
- expose private operator context as public product copy;
- infer strong attention claims from heuristics alone.

## Public-safe fields

These are safe for the public dashboard when sanitized and bounded:

| Field class | Examples | Owner | Nousromancer behavior |
| --- | --- | --- | --- |
| Runtime health | gateway live/offline/error | Hermes | Show health and degradation plainly. |
| Freshness | updated now, stale 20m | Hermes / Nousromancer renderer | Show age; reduce confidence when stale. |
| Activity counts | active sessions count | Hermes | Show as activity only, not priority. |
| Source labels | `src:discord`, `src:cli`, `src:cron` | Hermes | Show generic source labels only. |
| Session summaries | title, preview | Hermes | Truncate and sanitize. |
| Recency metadata | started, last active, ended | Hermes | Use for orientation, not urgency by itself. |
| Explicit attention fields | `attention_state`, `attention_reason`, `response_target`, `attention_evidence` | Hermes or upstream attention contract | Render bounded `Attention: ...`, sanitized evidence, and dashboard-local action only when explicit. |

## Private-only fields

These may be useful to the operator, but they do not belong in public Nousromancer captures or generic product claims unless a later upstream contract explicitly makes them safe:

| Field class | Examples | Owner |
| --- | --- | --- |
| Raw external IDs | Discord channel IDs, thread IDs, message IDs, snowflakes | Source adapter / Hermes |
| Private work handles | internal thread names, private workstream labels, non-public repo paths | Masaq / GSV / local operator context |
| Beads task truth | issue status, assignee, dependency graph, close reason | Beads / Sylveste |
| Durable provenance | review record, artifact lineage, canonical decision history | Sylveste / Interverse |
| Routing/governor state | selected agent, routing reason, policy decision, dispatch state | Ockham / upstream coordinator |
| Approval/consent state | approval required, authorized, blocked, consent granted | Owning governance layer |
| Stakeholder context | people, private orgs, relationship labels, internal notes | Operator/private substrate |

Private-only does not mean useless. It means Nousromancer should either suppress it, redact it, or show it only in an explicitly private/operator-scoped surface with an upstream owner.

## Forbidden or leaky public output

Public Nousromancer must not render:

- raw Discord snowflakes;
- credential-bearing URLs;
- local filesystem paths;
- private repository or workstream names;
- private human names or stakeholder labels;
- token-like strings or secrets;
- `needs you`, `blocked on you`, or `highest priority` from heuristics;
- `approved`, `authorized`, `certified`, `governed`, or `routed` unless an upstream contract owns the claim.

## Copy boundary

Prefer these verbs:

- show
- surface
- orient
- hint
- inspect
- respond
- prepare
- represent
- stage

Avoid these verbs except in explicit boundary/refusal text:

- govern
- own
- authorize
- approve
- route
- decide
- certify
- allocate
- resolve

Good public copy:

> Nousromancer helps Hermes operators resume live agent work after interruptions by showing runtime state, recent traces, explicit attention evidence, and safe places to inspect or respond.

Bad public copy:

> Nousromancer decides which agent needs you next and routes your highest-priority work.

## Failure behavior

When evidence is missing, stale, unsafe, or ownerless:

1. Suppress the claim or show `unknown`.
2. Show freshness/age when data may be stale.
3. Keep heuristic labels hedged, for example `Possibly waiting`.
4. Fall back to safe dashboard routes like `/sessions` or `/logs`.
5. Do not fill gaps with confident prose.

## GO / NO-GO

GO:

- public dashboard orientation;
- sanitized runtime/session metadata;
- explicit attention evidence when upstream fields support it;
- private/operator-only variants that clearly mark private context and preserve ownership;
- docs, tests, and UI copy that make uncertainty visible.

NO-GO:

- public leakage of private operator context;
- local heuristic global priority;
- Nousromancer-owned routing/governance/approval semantics;
- treating Beads, Sylveste, Ockham, Masaq, or GSV truth as if the dashboard owns it.

## Promotion gate

Before adding richer operator context to Nousromancer, require:

1. a named upstream owner for the field;
2. a public/private classification;
3. explicit stale/absent/unsafe behavior;
4. copy that preserves the orientation boundary;
5. tests or review evidence showing the public surface fails closed.
