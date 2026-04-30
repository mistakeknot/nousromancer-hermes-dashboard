---
agent: fd-doctrine-bloat-auditor
track: adjacent
focus: Whether the canon document set is the minimum needed to eliminate ambiguity for future agents; whether each proposed document has a job no other document can do; whether the root-canon design adds structural weight that will slow future agents.
target: docs/reviews/2026-04-29-metaharness-doctrine-brief.md
date: 2026-04-29
---

## Summary

The proposed four-document root-canon spine (MISSION, PHILOSOPHY, VISION, AGENTS/CLAUDE) is structurally reasonable but contains one near-certain bloat failure: proposed PHILOSOPHY.md will duplicate the already-accepted `docs/design-philosophy.md` without a stated supersession rule, creating two authoritative philosophy sources. The four-layer identity also creates structural pressure to address all four layers in every canon document, which would quadruple effective section count.

## Findings

- **P1** — The brief proposes PHILOSOPHY.md to cover "metaharness principles, visual/product doctrine, anti-goals" (line 73). The repo already has an accepted `docs/design-philosophy.md` listed at line 28 as "accepted visual/product doctrine." The brief does not state whether the new PHILOSOPHY.md supersedes, absorbs, or coexists with the existing `design-philosophy.md`. If both documents persist, future agents have two philosophy sources. If one addresses visual doctrine and the other addresses metaharness principles, they will develop divergent constraints. Failure scenario: a future agent building the dashboard reads `design-philosophy.md` (accepted) and ignores PHILOSOPHY.md (newer, internal), producing work that is visually compliant but strategically out of scope — and both agents are following accepted doctrine.

- **P2** — The brief's four-layer identity (public face / operator role / strategic role / boundary, lines 64–67) creates structural pressure for each root-canon document to address all four layers. MISSION.md will need to explain the mission at all four layers; PHILOSOPHY.md will need principles for all four layers; VISION.md will need direction for all four layers; AGENTS.md will need guidance for all four layers. That is 16 mandatory sections minimum before any content is added. The brief states "lean root canon spine" (line 71) as a goal but provides no structural constraint that would prevent the four-layer identity from expanding into each document.

- **P2** — The accepted `docs/operator-personas-and-pain-points.md` (line 28, "accepted persona matrix and primary pain point") covers operator role doctrine. The proposed root-canon spine does not account for this document. MISSION.md or PHILOSOPHY.md will inevitably re-describe the operator role, creating a second source for persona doctrine. The brief needs to specify whether `operator-personas-and-pain-points.md` is absorbed into root canon or remains a separate accepted document with a defined relationship to MISSION.md.

- **P2** — VISION.md as described (line 75: "medium-term direction after attention-state / Beads / CASS / review/receipt integrations") enumerates five integration categories. In practice, a VISION.md written from this description will become a checklist of integration milestones — precisely the roadmap anti-pattern the brief implicitly warns against at line 97 ("avoid doctrine bloat"). A direction-only VISION.md needs an explicit structural constraint: no more than one directional paragraph per integration domain, no implementation details, no milestone dates.

- **P3** — AGENTS.md / CLAUDE.md is described (line 76) as "repo-local guidance so future agents do not rediscover the boundaries from chat history." This is a legitimate and non-redundant job. However, the brief does not specify what it excludes. If AGENTS.md is not explicitly forbidden from restating MISSION or PHILOSOPHY content, future maintainers will add boundary reminders to AGENTS.md that duplicate PHILOSOPHY.md anti-goals, and the two will drift. One explicit exclusion line ("AGENTS.md does not restate mission, philosophy, or vision content — it links to those documents instead") would prevent this.

## Recommendations

- Line 73: Add a supersession declaration: "PHILOSOPHY.md absorbs and supersedes `docs/design-philosophy.md`. The existing file is archived or removed upon PHILOSOPHY.md publication." Without this, the duplicate persists.
- Line 71: Operationalize "lean" with a structural constraint. Suggested: "Each root-canon document has a maximum of one section per identity layer. Total root-canon reading time should be under 10 minutes." This is a testable constraint.
- Line 75: Add to the VISION.md description: "VISION.md is directional only. It does not enumerate integration milestones, implementation steps, or timelines. It describes the state Nousromancer is moving toward, not the path to get there."
- Lines 72–76: For each existing accepted doc (`design-philosophy.md`, `operator-personas-and-pain-points.md`, `functionality-data-contract.md`), specify one of three dispositions: absorbed into root canon, superseded and archived, or kept alongside with a defined relationship. The brief currently leaves all three in an undefined state.

## Open Questions

- Does `docs/functionality-data-contract.md` (line 29, "public dashboard API/attention-boundary contract") need a root-canon analogue, or does it remain a standalone implementation doc? If it lives outside root canon, who owns updates to it when MISSION.md or PHILOSOPHY.md changes?
- Is AGENTS.md the same file as CLAUDE.md, or are they separate documents with separate jobs? The brief uses a slash notation (line 76) that is ambiguous — one file or two?
- If "lean root canon" is defined as a maximum page count, what happens when a future integration (CASS, Beads) requires additional doctrine? Is there a named process for controlled expansion, or is the constraint absolute?
