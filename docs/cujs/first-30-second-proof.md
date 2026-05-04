# First 30-second Nousromancer proof checklist

Status: product proof artifact for `nousrmncr-d14.3`. This checklist turns the operator-reorientation CUJ into a small demo/review script. It is not a new authority model; it verifies that the public dashboard helps an operator choose a safe next move without overclaiming priority, routing, governance, or durable task truth.

## Product claim under test

When a Hermes operator returns after Discord, CLI, cron, browser work, or a parallel agent lane, Nousromancer should answer enough of the first 30 seconds to make one next move clear:

1. Is Hermes alive or degraded?
2. What changed recently?
3. Which visible session or workstream may need human judgment?
4. Why might it matter now?
5. Where can I inspect or respond safely?

A successful proof does **not** require Nousromancer to rank all work globally or decide what the operator should do. It only needs to make the evidence, uncertainty, and safe local targets legible.

## Demo setup

Use public-safe or synthetic data. Do not capture raw Discord snowflakes, credential-bearing URLs, private workstream names, or private project handles in public screenshots.

Before capture, verify:

- [ ] Dashboard loads with the Nousromancer theme/plugin active.
- [ ] Now Bar is visible on the route under test.
- [ ] Sessions rows render without layout breakage.
- [ ] Any explicit attention example comes from sanitized upstream fields.
- [ ] Any heuristic example remains labeled as uncertain.

## 30-second pass criteria

The operator should be able to decide one of these moves within 30 seconds:

- **Answer** — use `Respond →` only when explicit evidence and a safe dashboard-local target exist.
- **Inspect** — use `Inspect →`, Sessions, or Trace when more context is needed.
- **Defer** — leave a visible but non-actionable hint alone when evidence is weak or absent.
- **Investigate health** — open Logs or retry only when freshness/API/runtime state is degraded.
- **Leave it alone** — trust unknown/quiet rows as non-urgent until evidence appears.

## Scenario matrix

| Scenario | Evidence to show | Acceptable copy / affordance | Operator move | Must not do |
| --- | --- | --- | --- | --- |
| Explicit attention evidence | Fresh gateway/API state, latest source, `attention_state`, `attention_reason`, sanitized `attention_evidence`, safe dashboard-local `response_target.path` | `Attention: waiting` or similarly bounded evidence-backed copy; `Respond →` or `Inspect →` | Answer or inspect the specific session | Claim global priority, route work, or expose private target details |
| Heuristic-only fallback | Fresh data plus assistant-question-like or error/stall evidence, but no explicit upstream attention contract | `Possibly waiting`; trace/session inspection target only | Inspect or defer | Say `needs input`, `blocked on you`, or render an action CTA as if the target is explicit |
| Stale state | Last refresh age, stale session data, degraded gateway/API status, or failed poll retaining last known data | `Stale …`, `API error`, `No refresh`, or similar non-color-only freshness text | Investigate health or inspect logs before acting | Present stale state as a fresh response request |
| Unknown/absent data | No source, no attention evidence, empty sessions, missing target, or unsupported route | Suppress attention/action claim; show quiet unknown/empty state if needed | Leave it alone or inspect the neutral route | Fill the gap with inferred urgency or priority |
| Unsafe/private target | External URL, raw snowflake, token-like string, private handle, or credential-bearing path | Suppress target or fall back to a safe dashboard route | Inspect neutral context or defer | Render the unsafe target, private ID, or credential-bearing path |

## Screenshot / artifact checklist

For each captured screenshot or demo note, record:

- [ ] Route and surface under test, e.g. `/`, `/sessions`, `/logs`, or a session detail route.
- [ ] Evidence state: explicit, heuristic, stale, unknown, or unsafe/private.
- [ ] What the Now Bar says.
- [ ] What the relevant Sessions row says, if any.
- [ ] Which operator move is obvious: answer, inspect, defer, investigate health, or leave alone.
- [ ] Why the copy is bounded and public-safe.
- [ ] Any missing upstream field that prevented a stronger claim.

## Pass / fail rubric

Pass if:

- [ ] Runtime health and freshness are visible in text, not color only.
- [ ] Latest source/context is visible when available and quiet when absent.
- [ ] Explicit attention evidence is visually/copy-wise stronger than heuristic hints.
- [ ] Heuristic hints remain hedged and non-authoritative.
- [ ] Safe local `Inspect →` / `Respond →` affordances appear only when evidence supports them.
- [ ] Stale, unknown, and unsafe states reduce confidence or suppress the action.
- [ ] The operator can pick one next move without reconstructing context from logs, Discord, Beads, and memory first.

Fail if:

- [ ] A heuristic looks like an authoritative human-input requirement.
- [ ] Stale state looks fresh.
- [ ] Unknown/absent evidence is replaced by confident copy.
- [ ] Private IDs, handles, snowflakes, or credential-bearing paths appear in public captures.
- [ ] The UI implies global priority ranking, routing authority, governance, or system-of-record ownership.
- [ ] The screenshot proves visual novelty but not operator reorientation.

## Follow-up hooks

Use this checklist to drive later product work:

- `nousrmncr-d14.4` should classify which richer context fields are public-safe, private-only, or forbidden.
- `nousrmncr-d14.5` should keep interruption recovery before stronger attention and action-staging phases.
- Future UI/test beads should add fixtures for explicit, heuristic, stale, unknown, and unsafe states before promoting stronger copy.
