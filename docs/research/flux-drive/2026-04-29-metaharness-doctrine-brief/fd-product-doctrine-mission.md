---
agent: fd-product-doctrine-mission
track: adjacent
focus: Whether the mission sentence is load-bearing and testable; whether each downstream decision can be traced to the stated mission; whether the mission is too broad to constrain future agents or too narrow to survive the next product phase.
target: docs/reviews/2026-04-29-metaharness-doctrine-brief.md
date: 2026-04-29
---

## Summary

The candidate mission sentence (line 80) is directionally sound but contains one structural gap that makes it non-rejecting — a future agent could use it to justify pulling Sylveste governance into Nousromancer without violating the stated sentence. The root-canon spine proposal is well-shaped but the public/internal wording split risks creating two semi-authoritative mission truths.

## Findings

- **P1** — The candidate mission sentence (line 80) does not contain a "refuses to become" clause. "…without collapsing Sylveste's deeper canon into Hermes" is a description of the desired outcome, not a boundary a future agent can test against. A future agent asked to implement CASS recall natively could read line 80 as permission, because the sentence names CASS recall as a Nousromancer responsibility ("…tasks, and workflows need human judgment…") without specifying that the implementation must use a read model rather than a direct canon import. The constraint exists in the brief (line 92), but it is not embedded in the mission sentence itself — so if MISSION.md is written from line 80 alone, the constraint is absent from the authoritative document. Failure scenario: an agent builds direct Sylveste governance writes, cites the mission sentence, and is not wrong.

- **P1** — The brief proposes a public/internal wording split (lines 84–85): public uses "a Hermes dashboard metaharness for multi-agent operator work"; internal doctrine names Sylveste explicitly. If MISSION.md carries the internal sentence and README.md carries the public sentence, future agents have two mission sources. The brief does not designate which is canonical when they conflict, nor does it specify a change-propagation rule. A future agent editing MISSION.md will not know whether to update README.md, or vice versa. Failure scenario: MISSION.md is updated to add a Sylveste-specific constraint; the public README is not updated; the two documents produce inconsistent scope decisions.

- **P2** — The four identity layers (lines 64–67) map onto the proposed root-canon spine incompletely. Layer 1 (public face) maps to README.md; Layer 4 (boundary) maps to PHILOSOPHY.md anti-goals; Layers 2 and 3 (operator role, strategic role) have no obvious single home. The brief suggests they live somewhere in MISSION/PHILOSOPHY/VISION but does not assign each layer to a specific document. This creates overlap risk: the operator role will appear partially in MISSION.md ("why Nousromancer exists") and partially in PHILOSOPHY.md ("metaharness principles"). Future agents will not know which document governs a disputed scope question.

- **P2** — The "lean root canon spine" constraint (line 71, line 97) is stated aspirationally — "lean" is not operationalized. There is no maximum section count, no exclusion list, and no rule for what must be a Bead rather than a root-canon section. Without a concrete definition of lean, "lean" becomes a social norm that each future agent calibrates independently, which is functionally no constraint at all.

- **P3** — The possible VISION.md description (line 75) names "medium-term direction after attention-state / Beads / CASS / review/receipt integrations" without specifying what milestone marks the end of V1 and the start of the medium-term. Without a stated V1 exit criterion, VISION.md has no anchoring event and will function as a rolling horizon — always describing the next set of integrations without ever being superseded.

## Recommendations

- Line 80: Append a refusal clause to the candidate mission sentence. Suggested: "…without collapsing Sylveste's deeper canon into Hermes, and without owning or governing Sylveste artifacts directly." This makes the sentence testable.
- Lines 84–85: Designate MISSION.md as the single authoritative source. Specify that README.md public wording is derived from MISSION.md and must be updated whenever MISSION.md changes. One sentence in the AGENTS.md/CLAUDE.md spine is sufficient.
- Line 75: Define VISION.md scope as directional only — no checklist of integrations. Add a note: "VISION.md is not a roadmap; it does not enumerate integration milestones."
- Lines 64–67: Assign each identity layer explicitly to one root-canon document in the brief, even provisionally. E.g., "Layer 2 (operator role) is owned by MISSION.md; Layer 3 (strategic role) is owned by VISION.md."

## Open Questions

- Does the mission sentence need to survive without the constraints section (line 88–96) being co-read? If MISSION.md is ever read in isolation, the constraints are invisible.
- Should the four identity layers be collapsed to three (public / operator+strategic / boundary) to reduce the surface area of potential overlap?
- Is "Sylveste-grade work" in the mission sentence legible to a future agent who has not read the Sylveste canon — and if not, does the mission sentence require a glossary entry to be actionable?
