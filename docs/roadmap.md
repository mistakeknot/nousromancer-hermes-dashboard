# Nousromancer Roadmap

Status: canonical project-docs spine for `nousrmncr-lr8.8`. This roadmap sequences work; Beads remains the live task source of truth.

## Current state

Nousromancer has moved past the original hackathon-polish lane. The durable current shape is:

- root mission/philosophy/vision canon exists;
- public theme/plugin install path works;
- Now Bar and Sessions-row affordances consume Hermes dashboard data;
- explicit attention contract fields are preferred when present;
- fallback attention hints remain hedged;
- functionality lane `nousrmncr-t0q` is closed;
- typography/design/doctrine lane `nousrmncr-lr8` remains open for future product/design increments.

## Roadmap principles

1. **Truth before drama.** Do not make stronger attention claims than the data supports.
2. **Layer discipline.** Keep durable truth, governance, provenance, and routing authority in upstream layers.
3. **Public-safe by default.** Public dashboard copy should not expose private project handles, raw Discord snowflakes, or credential-bearing paths.
4. **Interruption recovery first.** The near-term product wedge is helping a Hermes operator return to live work and choose a safe next move.
5. **Operator usefulness over cockpit sprawl.** Prefer small surfaces that make pickup easier.
6. **Promotion by evidence.** Promote UI hints into canon only after contracts, ownership, failure behavior, and operator value are clear.

## Roadmap layer map

| Layer | Roadmap phase | Primary output | Boundary |
| --- | --- | --- | --- |
| Product copy/docs | Phase 1 and Phase 2 framing | Canon spine, CUJ language, roadmap, first-use narrative | Names the operator value without claiming durable authority. |
| UI proof | Phase 2 | Now Bar / Sessions-row proof that the operator can resume safely after interruption | Shows freshness, source, stale/unknown states, and safe inspect/respond affordances only when evidence permits. |
| Upstream contract | Phase 3 | Explicit attention fields and redaction/failure behavior supplied by Hermes or another owner | Stronger attention claims wait for upstream-owned fields. |
| Dashboard-local action staging | Phase 4 | Prepared Inspect/Respond/handoff surfaces | Stages operator moves; does not dispatch, approve, route, or mutate upstream systems from public UI. |
| Private bridge / research | Phase 5 | Optional richer workstream, Beads, market-shaped, or Sylveste-grade projections | Research-adjacent until upstream contracts define owners, redaction, and semantics. |

## Phase 0 — Hackathon recovery and public baseline

Status: effectively complete / archival.

Delivered:

- standard-layout noir theme;
- public plugin install path;
- Now Bar baseline;
- clean README/SUBMISSION copy;
- screenshot-friendly calm ops surface.

Remaining archival work, if useful:

- `nousrmncr-vjp.6` final submission/media bundle.

This should not outrank current product work unless the user explicitly wants public packaging.

## Phase 1 — Root canon and docs spine

Status: in progress via `nousrmncr-lr8.8`.

Delivered before this pass:

- `MISSION.md`
- `PHILOSOPHY.md`
- `VISION.md`
- `AGENTS.md`
- design philosophy and operator pain-point docs
- functionality data contract

Current completion targets:

- `CLAUDE.md`
- `docs/architecture.md`
- `docs/roadmap.md`
- `docs/cujs/operator-reorientation.md`
- `docs/canon/doc-structure.md`
- optional `docs/glossary.md`

Done when agents can orient in the repo without reconstructing doctrine from chat history.

## Phase 2 — Interruption recovery product wedge

Layer: product copy/docs + UI proof.

Goal: help the Hermes operator return to live work after an interruption, understand what changed, and choose one safe next move.

Candidate work:

- tighten latest-session/workstream summaries around “what changed since I left?”;
- make source, freshness, and stale/unknown states legible before any attention claim;
- preserve clear empty/stale/fresh states in the Now Bar and Sessions rows;
- document and test dashboard-local `Inspect →` / `Respond →` targets for safe explicit targets only;
- add CUJ-backed UI review for interruption recovery across explicit, heuristic, stale, unknown, and unsafe/private states.

Acceptance should be based on the operator journey in `docs/cujs/operator-reorientation.md`, not on visual novelty. Phase 2 is complete only when the public surface can prove “I can safely resume” without reconstructing context from chat, logs, Beads, memory, or parallel agent surfaces.

## Phase 3 — Evidence-backed attention contract

Layer: upstream contract + bounded UI rendering.

Goal: consume explicit upstream attention fields more fully once they exist, while keeping Nousromancer bounded.

Candidate work:

- strengthen rendering of upstream-owned `attention_state`, `attention_reason`, `attention_evidence`, and safe `response_target.path`;
- improve redaction/sanitization for public UI;
- add fixtures for absent, stale, unsafe, and conflicting evidence;
- clarify when Now Bar hints should suppress themselves;
- keep heuristic-only states visibly weaker than explicit attention evidence.

Non-goal: global cross-agent priority ranking. Stronger phrases such as `needs input` or `blocked on you` require explicit upstream fields, evidence, redaction rules, and failure behavior.

## Phase 4 — Dashboard-local action staging

Layer: dashboard-local action staging.

Goal: prepare useful operator actions without making Nousromancer an autonomous dispatcher or routing/governance layer.

Candidate work:

- dashboard-local `Respond →` / `Inspect →` affordances only from safe explicit targets;
- handoff/pickup preparation surfaces that show what the operator can inspect or answer next;
- optional private-operation bridges where Hermes or Sylveste owns the actual action semantics.

Rules:

- no hidden shell/agent dispatch from public dashboard buttons;
- no governance, approval, authorization, or routing semantics without upstream contracts;
- no direct ownership of Beads or Sylveste state;
- if an action would mutate durable work state, the owning upstream system must provide the contract and audit trail.

## Phase 5 — Private bridge / substrate research, if warranted

Layer: private bridge / research until upstream contracts exist.

Goal: let Nousromancer represent richer Sylveste-grade workflows once substrate contracts exist.

Possible upstream dependencies:

- Hermes attention contract maturity;
- Beads/workstream context surfaces with explicit redaction boundaries;
- market-shaped workstream evidence, if it is supplied as evidence fields rather than inferred by the dashboard;
- Ockham or future routing/governance signals, owned upstream rather than by Nousromancer;
- Interverse/Sylveste provenance/review contracts;
- explicit redaction and publication boundaries.

Market-shaped and workstream evidence remains research-adjacent or private-bridge material unless an upstream owner supplies candidate grouping, disagreement/evaluation fields, freshness, redaction, and failure behavior. This phase should be design-reviewed before implementation. If a feature would make Nousromancer the system of record, stop and move the contract upstream.

## What not to prioritize by default

- More hackathon packaging unless explicitly requested.
- Sidebar/cockpit expansion that collides with other dashboard plugins.
- Strong priority/routing copy based on heuristics.
- Broad DOM surgery without stable hooks.
- Public exposure of private workstream or Discord metadata.
