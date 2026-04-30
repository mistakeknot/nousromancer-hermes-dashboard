---
agent: fd-broadcast-control-room
track: orthogonal
source_domain: broadcast/TV control room operations
focus: feed truthfulness, on-air vs. off-air state discipline, layer boundary leakage
target: docs/reviews/2026-04-29-metaharness-doctrine-brief.md
date: 2026-04-29
---

## Summary

A control room director reads this brief as a routing problem: three distinct output surfaces (public feed, operator monitor, and internal production intercom) sharing a single chassis, with no explicit cut-rule governing which signal is live at which surface. The brief articulates the layers but does not name conditions under which a signal is promoted from one layer to the next — the equivalent of calling a shot without a confirmed source.

## Operational pattern in source domain

In live broadcast, the production chain separates the **cue sheet** (what is planned), the **director's monitor wall** (all candidate feeds at once), and the **on-air output** (what is transmitted to the public). The cardinal discipline is: no signal goes to on-air without explicit confirmation of source state. An unverified feed is always preview-only; promotion to on-air requires a named condition ("correspondent is live," "satellite lock confirmed"). This is the feed-promotion rule. A second discipline governs the intercom: production chatter about source quality never leaks to on-air audio — the talkback channel is physically isolated from the program mix.

## Findings

- **P1 — No feed-promotion rule for the three identity layers.** Lines 64–67 name three layers (public face / operator role / strategic role) but describe them as a list, not as a routing hierarchy with named promotion gates. A future agent reading `AGENTS.md` will not be able to determine whether a new feature (say, displaying raw handoff-packet state) belongs on the public face or only on the operator monitor. The brief has a director's monitor wall but no cut-rule. Concrete failure: a contributor adds a Bead route-status widget and defaults it to the public plugin surface because no document says "operator monitor only."

- **P1 — The 'Possibly waiting' hint lacks an explicit evidence gate for promotion.** Lines 39–41 define a V1/demo boundary: `Possibly waiting` is allowed only when "backed by tested heuristic or explicit upstream evidence," but neither the heuristic test nor the upstream evidence field is named. This is the broadcast equivalent of saying "go to correspondent if the line sounds okay" — hedged language without a checklist. The agent agent spec (severity calibration) flags this exact scenario: hedged signal language appearing authoritative without a named gate constitutes P1 because the next implementation step will promote `Possibly waiting` to `needs input` by incremental drift rather than deliberate promotion.

- **P2 — The proposed mission sentence (line 80) spans all three layers in a single sentence.** The broadcast analog: a single on-air sentence simultaneously describes the public program, the director's talkback, and the transmission uplink. A future agent deriving layer assignment from the mission sentence alone cannot determine which clause governs which surface. The sentence lists "live operator surface," "which agents… need human judgment," and "without collapsing Sylveste's deeper canon" — three layers, one sentence, no break.

- **P2 — Public/internal split is stated as intent (line 84–85) but not enforced as a gate.** The brief correctly proposes layered public wording vs. internal doctrine wording. But this is a design note, not a production rule. The broadcast equivalent: writing "keep talkback off the program mix" in the production plan rather than wiring a hardware mute.

- **P3 — "Which agent → why now → how to answer" (line 35) is a stable cue-calling contract only for single-source scenarios.** In broadcast, a cue sheet works when one correspondent is live; it breaks when two are simultaneously hot and the director must choose. Does the north-star formula have a tiebreak rule for simultaneous active agents? The brief does not say.

## Recommendations

- **Lines 64–67 (layered identity list):** Convert the three-item list into a routing table with an explicit column: "Output surface / Who sees it / Promotion condition." At minimum: "Strategic role signals are director-monitor only; promotion to operator role requires [named condition]; promotion to public face requires [named condition]."
- **Lines 39–41 (attention hint policy):** Rewrite as a feed-promotion rule: "`Possibly waiting` may appear on the operator surface when: (a) upstream attention-state field `waiting_on_human` is set, OR (b) heuristic [name] returns confidence ≥ [threshold]. All other states display as unknown. Promotion to `needs input` requires explicit upstream field; no heuristic promotion."
- **Line 80 (mission sentence):** Split into two sentences by layer. First sentence: public layer claim. Second sentence: operator/strategic claim. Each sentence should be independently true without the other.
- **Lines 84–85 (public/internal split):** Promote from design note to a named rule in `PHILOSOPHY.md`: "Public surface contains only claims derivable from public API fields. Internal doctrine terms (Beads, CASS, Sylveste) do not appear in README or public UI labels."

## What this lens cannot see

This lens has nothing to say about the controlled-vocabulary problem (whether "metaharness" needs a definition), the constitutional authority-level of the proposed document hierarchy, or the diplomatic risk of naming Sylveste in public documents. It also cannot assess the governance structure of `AGENTS.md` vs. `CLAUDE.md` as a catalog vs. local-practice distinction.
