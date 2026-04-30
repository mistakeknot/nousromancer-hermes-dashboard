---
agent: fd-operator-surface-designer
track: adjacent
focus: Whether the dashboard surface gives a human operator the right signal at the right moment; whether the north-star question is answerable from the surface alone; whether UI doctrine permits states the operator cannot act on.
target: docs/reviews/2026-04-29-metaharness-doctrine-brief.md
date: 2026-04-29
---

## Summary

The north-star question ("which agent / why now / how to answer," line 35) survives the proposed framing but is at risk of being obscured by the strategic role layer, which introduces states (CASS recall, review state, handoff packets) that a non-Sylveste operator may not be able to act on. The V1/demo boundary is preserved in the brief but is not explicitly carried forward into the proposed doctrine documents.

## Findings

- **P1** — The strategic role layer (line 66) names "CASS recall, handoff packets, review state, route decisions, receipts" as operator-facing capabilities. None of these have a defined action the operator takes when they appear on the surface. An operator looking at a CASS recall state needs to know: is this asking me to intervene? Is it informational? What is my next action? The brief does not answer this, and without that answer the north-star question ("how to answer") becomes unanswerable for strategic-role states. Failure scenario: an operator sees a "CASS recall" indicator, cannot determine whether it requires their attention, and either ignores it (misses a required action) or treats every CASS recall as an interrupt (attention overload). Neither outcome is recoverable from the surface alone.

- **P2** — The four-layer identity (lines 64–67) creates a structural ambiguity for the operator: at any moment, are they operating in "public extension mode" (Layer 1) or "Sylveste metaharness mode" (Layer 3)? The brief does not specify whether the operator surface presents a unified view or contextually shifts based on which layer is active. If the surface shifts — e.g., showing Beads and CASS recall only in certain contexts — the operator must track which mode they are in, which is additional cognitive load that the north-star question is designed to eliminate.

- **P2** — The V1/demo attention boundary (lines 39–41) is accepted doctrine but is stated only in the "Current context" section of the brief. It is not referenced in the proposed doctrine documents section (lines 72–76) and is not listed as a constraint the new PHILOSOPHY.md must carry forward. A future agent writing PHILOSOPHY.md from the proposed doctrine section alone would not find the V1/demo boundary and could omit the "no authoritative `needs input`" constraint. The boundary is load-bearing for operator trust and should be explicitly assigned to PHILOSOPHY.md in the brief.

- **P3** — The north-star question (line 35) is quoted in the "Current accepted product north star" section but does not appear in the proposed doctrine document descriptions (lines 72–76). The brief proposes that PHILOSOPHY.md will cover "metaharness principles, visual/product doctrine, anti-goals" (line 73) but does not explicitly require it to restate "which agent / why now / how to answer" as the operator UX constraint. Future agents writing PHILOSOPHY.md will not know whether the north-star question is a PHILOSOPHY.md commitment or a legacy product artifact from the hackathon phase.

- **P3** — The operator role layer description (line 65) — "a live control surface for agent-input triage: which agent needs judgment, why now, and where/how to answer" — is the brief's sharpest, most UI-designable sentence. However, "where" has been added to the accepted north-star question ("which agent / why now / how to answer") without comment. This is either a meaningful addition (the operator needs to know which surface to respond on) or an accidental drift. If "where" is intentional, it should be canonized; if it is not, it should be removed.

## Recommendations

- Line 66: For each strategic-role state (CASS recall, handoff packets, review state, route decisions, receipts), add a one-line operator action: e.g., "CASS recall: operator acknowledges or routes to Sylveste review." Without this, these states cannot be surfaced without operator confusion.
- Line 73: Add "explicitly restates the north-star question ('which agent / why now / how to answer') as the binding operator UX constraint" to the PHILOSOPHY.md description.
- Lines 39–41: Add a line to the proposed doctrine documents section: "V1/demo attention boundary (lines 39–41 of this brief) must be carried forward verbatim into PHILOSOPHY.md anti-goals."
- Line 65: Decide whether "where" is part of the north-star question. If yes, update the accepted north star at line 35; if no, remove it from line 65.

## Open Questions

- Does the operator surface need to visually distinguish Layer 1 (public extension) states from Layer 3 (strategic/Sylveste) states — and if so, is that a PHILOSOPHY.md concern or a VISION.md concern?
- Should CASS recall and handoff packet states be gated behind a Sylveste-connected mode flag, so the surface stays within the V1/demo boundary by default for non-Sylveste operators?
- Is "attention triage" (the operator role layer) compatible with the strategic role's "route decisions" capability, or do these require different interaction patterns that cannot share a single surface?
