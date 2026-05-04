# CUJ — Operator Reorientation

Status: canonical project-docs spine for `nousrmncr-lr8.8`. This is the primary current user journey for Nousromancer product decisions.

## User

A Hermes operator returning to ongoing Sylveste-grade work after an interruption, cross-surface jump, restart, or parallel agent session.

The operator may not remember which session, thread, bead, or agent lane currently matters. They need a trustworthy surface that makes the next inspection or response easier without inventing authority.

## Situation

The operator opens the Hermes dashboard with Nousromancer enabled.

They want to answer:

1. Is Hermes alive?
2. What changed recently?
3. Which visible session or workstream might need attention?
4. Why might it matter now?
5. Where can I inspect or respond safely?

## Success criteria

The journey succeeds when the operator can choose a next move within a few seconds while still trusting that unknowns are unknown.

A successful Nousromancer surface:

- shows gateway/API health clearly;
- shows recency and freshness;
- distinguishes source surfaces such as Discord, CLI, cron, or browser when available;
- surfaces explicit upstream attention evidence when present;
- keeps heuristic hints visibly hedged;
- provides safe dashboard-local inspection/response targets when evidence supports them;
- avoids claiming global priority, governance, or durable task truth.

## Mainline flow

1. Operator opens the dashboard.
2. Now Bar shows current gateway state and freshness.
3. Now Bar identifies the latest relevant session/source if available.
4. If explicit attention evidence exists, Now Bar shows bounded attention copy and a safe dashboard-local target.
5. Sessions rows add quiet metadata for explicit attention/source context when stable row identity exists.
6. Operator clicks `Inspect →`, `Respond →`, Sessions, or Logs.
7. Operator decides whether to answer in the original surface, inspect more context, or resume through Hermes/Beads outside the dashboard.

## Evidence states

### Explicit evidence present

Example:

```text
Gateway live · Updated now · Latest: src:discord · Attention: waiting · Respond →
```

Allowed only when upstream fields support it, especially `attention_state`, `attention_reason`, `response_target`, and `attention_evidence`.

### Heuristic fallback only

Example:

```text
Gateway live · Updated now · Latest: src:discord · Possibly waiting · Trace →
```

This can help orientation, but it must not become `needs input`, `blocked on you`, or `highest priority`.

### Unknown or absent data

Show quiet unknown/empty state or suppress the claim. Do not fill the gap with inferred priority.

### Stale data

Show age/freshness and lower confidence. Stale data should not look like a fresh call to action.

### Unsafe target or private handle

Suppress, sanitize, or fall back to safe dashboard routes. Do not render raw Discord snowflakes, credential-bearing URLs, or private workstream names in public dashboard copy.

## Anti-flows

Nousromancer fails this CUJ if it:

- makes the operator think a session is definitely blocked on them when only a heuristic exists;
- ranks cross-agent urgency without upstream authority;
- shows stale state as fresh;
- hides absent evidence behind confident copy;
- leaks private channel/thread IDs or credential-bearing paths;
- turns dashboard affordances into hidden dispatch or governance actions.

## Design implications

- Favor compact, repeated orientation cues over large cockpit panels.
- Keep metadata quiet but legible.
- Let the operator retain judgment.
- Prefer `Inspect` and `Respond` over stronger verbs like `Approve`, `Route`, or `Resolve` unless upstream contracts make those verbs true.
- Test absent, stale, unsafe, and conflicting states as carefully as the happy path.

## Proof checklist

Use `docs/cujs/first-30-second-proof.md` as the small demo/review script for this CUJ. It checks whether a returning operator can choose one safe next move within 30 seconds across explicit, heuristic, stale, unknown, and unsafe/private evidence states.

## Open questions

- Which upstream attention fields should become required before stronger copy is allowed?
- How should private/internal Hermes deployments expose richer workstream metadata without leaking it into public plugin assumptions?
- When should this CUJ split into separate public-dashboard and private-operator variants?
