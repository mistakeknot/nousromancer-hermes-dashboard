---
agent: fd-platform-boundary-strategist
track: adjacent
focus: Where the seam between plugin and host platform is drawn; whether the boundary will hold when the plugin adds capabilities; whether the adapter is being designed to gradually absorb the substrate it was meant to surface.
target: docs/reviews/2026-04-29-metaharness-doctrine-brief.md
date: 2026-04-29
---

## Summary

The brief correctly names the boundary aspiration ("adapter seams, artifacts, and read models" at line 67) but fails to define a single artifact type that crosses any named seam, leaving every future capability expansion to re-litigate where the seam sits. The CASS recall and route decisions listed in the strategic role layer (line 66) are the highest-risk capabilities because neither has a named read-model artifact in the brief.

## Findings

- **P1** — The brief's strategic role layer (line 66) lists "CASS recall, handoff packets, review state, route decisions, receipts" as Nousromancer capabilities but does not specify the artifact shape any of these take from Nousromancer's side. "Adapter seams, artifacts, and read models" (line 67) names the pattern but provides no example artifact. Without at least one named artifact per seam, a future agent implementing CASS recall will default to direct coupling — importing CASS schema into Nousromancer — because the brief provides no read-model specification to follow. The constraint at line 92 says "prefer adapter seams, artifacts, and read models" but "prefer" is advisory, not structural. Failure scenario: CASS recall is implemented as a direct import of Sylveste session schema into `nousromancer-mission-control`, violating constraint #2 (line 92) while technically following the mission sentence.

- **P1** — "Route decisions" in the strategic role (line 66) is the highest-risk item for plugin/platform inversion. If Nousromancer exposes route decisions that agents then act on, Hermes may develop an operational dependency on Nousromancer being present and correct. The brief does not specify whether route decisions are displayed (read-only, operator acts on them) or written (Nousromancer directs routing). This ambiguity is not resolved anywhere in the constraints section (lines 88–96). Failure scenario: a future agent implements Nousromancer as a routing intermediary; removing or disabling the plugin breaks agent workflows; the plugin/platform boundary has inverted.

- **P2** — The four identity layers (lines 64–67) are described as a gradient (public face → operator role → strategic role → boundary), which is the shape of a seam that will dissolve under expansion. Each capability added to the operator role layer will have a natural argument for promotion to the strategic role layer, and each strategic role capability has a natural argument for a write-back to Sylveste. The brief does not provide a named test for whether a new capability crosses the Nousromancer/Sylveste seam — only the aspiration at line 92. Without a binary test (e.g., "does this require writing to a Sylveste artifact?"), the gradient will be re-drawn incrementally.

- **P2** — The brief does not address the Hermes Dashboard extension seam at all beyond noting that Nousromancer began as a "theme/plugin hackathon project" (line 15). Constraint #1 (line 91) prevents Nousromancer from becoming Sylveste, but there is no symmetric constraint preventing Nousromancer from becoming a required Hermes core dependency. If `nousromancer-mission-control` becomes load-bearing for Hermes operator workflows, the plugin identity is lost without a formal seam definition.

- **P3** — The brief lists the Beads prefix (`nousrmncr`, line 22) and references Beads throughout the strategic role (line 66) but does not clarify whether Beads are cross-boundary artifacts (i.e., a Bead is the read model that crosses the Nousromancer/Sylveste seam) or whether they are internal Nousromancer coordination primitives. If Beads are the intended seam artifact, the brief should state that explicitly.

## Recommendations

- Line 66: For each capability in the strategic role list (CASS recall, handoff packets, routes, receipts), add a parenthetical noting the artifact type: e.g., "(via CASS recall artifact: read-only session summary)" or "(via handoff packet: structured JSON, not Sylveste schema)."
- Line 92: Change "prefer adapter seams" to "must use adapter seams." Add one example: "e.g., a CASS recall is surfaced as a structured summary artifact, never as a Sylveste session object."
- Line 66 (route decisions): Clarify read vs. write. Suggest: "route decisions [displayed for operator action, not executed by Nousromancer]."
- Add to the constraints section (after line 96): "Nousromancer must not become a runtime dependency of Hermes Agent — disabling the plugin must not break any Hermes core workflow."

## Open Questions

- Are Beads the intended cross-seam artifact type? If so, the brief should establish this explicitly so future agents do not invent a separate artifact layer.
- Does the `docs/functionality-data-contract.md` (line 29) already define the Hermes/Nousromancer seam? If so, is the new doctrine required to supersede or reference it?
- What is the test for "Nousromancer is absorbing Sylveste canon" vs. "Nousromancer is reading a Sylveste artifact"? The brief needs a one-sentence binary test, not a list of examples.
