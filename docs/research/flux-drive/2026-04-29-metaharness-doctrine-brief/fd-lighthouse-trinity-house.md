---
agent: fd-lighthouse-trinity-house
track: distant
source_domain: Trinity House lighthouse keeping
focus: unconditional truthfulness of the navigational signal, strict separation between the public light and the internal logbook, the doctrine that a light that lies about its own character kills mariners
target: docs/reviews/2026-04-29-metaharness-doctrine-brief.md
date: 2026-04-29
---

## Summary

Trinity House lighthouse doctrine holds that the public light is unconditionally truthful or it is a hazard: it signals only what the logbook has charted, never interpolates a safe passage from partial soundings, and distinguishes clearly between "signal present" and "signal absent/stale" — because a stale light presented as current is more dangerous than darkness. The brief's attention-signal doctrine is the most direct structural correspondent in any of the four Track C domains, and this lens surfaces a concrete gap between the V1 boundary constraints and the proposed root-canon doctrine.

## Source Mechanism

A Trinity House light is characterized by its flash pattern, nominal range, and the conditions documented in the Admiralty List of Lights (ALL) — the logbook counterpart to the public light. The logbook records every sounding, every buoy position, every hazard charted; the light emits only what the logbook confirms. Two rules govern edge cases: first, a lighthouse must never emit a light characteristic it has not been assigned, because mariners rely on the characteristic to identify which lighthouse they are seeing; second, when a light fails or a survey is pending, the keeper shows a "light extinguished" or "survey in progress" signal rather than continuing to show last-known-good — because a stale signal in a changed channel is a navigation hazard. The anti-interpolation rule is explicit: the keeper does not infer that the channel is still clear because it was clear last month; they wait for a new sounding.

## Isomorphism Mapping

- Light characteristic (assigned flash pattern) ↔ the attention-signal classes in the brief's V1 boundary (lines 38–42): "truthful health, freshness, source orientation, active counts, traceability" are assigned characteristics; "Possibly waiting" is a distinct, hedged characteristic with specific conditions; "needs input / blocked / highest priority / ranked" are unassigned characteristics that the brief (line 41–42) explicitly forbids without upstream evidence.
- Charted sounding (logbook entry required before light emits) ↔ the upstream evidence requirement at line 40 ("tested heuristic or explicit upstream evidence") — this is the sounding requirement; attention signals may only be emitted when the logbook (Sylveste attention-state fields) has a corresponding entry.
- Light failure protocol (extinguished or survey-in-progress signal) ↔ absent from the brief and the proposed root-canon spine; the brief does not specify what the operator surface emits when upstream attention-state data is absent or stale.
- Nominal range vs. geographic range (what the light can actually illuminate vs. what it claims) ↔ the public/internal split (lines 84–85): the public surface's nominal range is "multi-agent operator work"; its actual geographic range depends on whether Sylveste attention-state fields are populated; the brief does not name this distinction.
- Anti-interpolation rule (no inferred safe passage from partial data) ↔ constraint 4 (line 94: "do not overclaim attention triage; use truthful signals and explicit upstream evidence") is the exact doctrinal statement of the anti-interpolation rule; the lighthouse framing confirms this constraint is structurally essential and should be elevated from constraint to first-class PHILOSOPHY.md principle.
- Logbook vs. public light (internal record governs external signal) ↔ the internal doctrine / public wording split (lines 84–85) and the boundary at lines 91–96; the logbook is Sylveste canon; the light is the Nousromancer operator surface.

## Findings

- **P0** — The brief and the proposed root-canon spine have no documented light-failure protocol: no specification of what the operator surface emits when upstream attention-state data is absent, stale, or in an unknown-provenance state. The V1 boundary (lines 38–42) specifies which signals are permitted when data is present; it does not specify what the surface shows when data is absent. Failure scenario: an operator opens the Nousromancer dashboard when a Hermes Agent session has no active attention-state fields (e.g., during a handoff gap or a fresh session before any upstream data arrives); the surface either shows nothing (dark lighthouse — navigable, just unclear) or, worse, shows last-known-good state from a prior session without a staleness marker (stale light in a changed channel — a navigation hazard). Neither behavior is specified, so implementation defaults to last-known-good silently.

- **P1** — The anti-interpolation rule at constraint 4 (line 94) is stated as a reviewer constraint ("reviewers should preserve this unless they argue explicitly against it") rather than as a first-class doctrinal rule in PHILOSOPHY.md. Reviewer constraints govern the review process; they do not bind future agents writing PHILOSOPHY.md. Failure scenario: a future agent, instructed to write PHILOSOPHY.md from the mission statement and repo context, does not read the review brief, and writes a philosophy that describes "Possibly waiting" as a smart inference engine rather than as a hedged signal backed by explicit upstream evidence — because no first-class anti-interpolation rule exists in the canon spine to constrain the description.

- **P2** — The VISION.md proposal (line 75) includes "medium-term direction after attention-state / Beads / CASS / review/receipt integrations" but does not specify the upstream verification gate required before each new signal class may be added to the light characteristic. The brief correctly forbids "ranked human-needed decisions" at V1 (line 41) but does not state the condition under which that prohibition is lifted — i.e., what sounding must be taken before the light may emit that characteristic.

- **P3** — The boundary at line 67 ("Sylveste/Intercore/Interspect remain the deeper substrate/canon/governance layer") correctly separates the logbook from the light, but does not name the update cadence: how often the logbook's soundings are reflected in the light's characteristics. Without a stated refresh or staleness-expiry rule, the surface may emit characteristics that the logbook has superseded.

## Recommendations

1. Add a light-failure protocol to the proposed PHILOSOPHY.md: specify exactly three states for the operator surface when upstream attention-state data is absent or stale — (a) "no upstream data" (dark lighthouse: show a blank/neutral state with a label), (b) "stale data, last refreshed [timestamp]" (degraded light: show last-known with an explicit staleness marker), (c) "upstream data present and fresh" (normal operational light). This addresses the P0 gap without requiring new upstream infrastructure.

2. Promote the anti-interpolation rule from reviewer constraint 4 (line 94) to a first-class PHILOSOPHY.md principle: "The operator surface emits only what upstream attention-state fields have explicitly recorded. It does not infer agent state from absence of signal, timing patterns, or prior-session data without a named heuristic backed by tested evidence." This is a one-sentence addition that binds future PHILOSOPHY.md authors independently of whether they read this review brief.

3. In the VISION.md proposal (line 75), add a verification gate template: any new attention-signal class (beyond the V1 set) requires (a) a named upstream field or contract that provides the evidence, (b) a tested false-positive rate, and (c) acceptance into the V1 boundary constraints list before being emitted. This prevents deferred-hazard charting.

4. Add a staleness-expiry rule to the boundary statement (line 67): Nousromancer attention signals derived from Sylveste/Hermes state must specify a maximum staleness window; beyond that window the signal degrades to state (b) above regardless of last-known value.

## Honest Distance Check

The isomorphism transfers with the highest structural rigor of the four Track C agents. The light-failure protocol gap is a direct, specific, currently-absent doctrine element that the lighthouse framing names precisely — it is not a metaphor for a vague concern, it is a named missing protocol with a concrete failure scenario. The anti-interpolation rule mapping onto constraint 4 (line 94) is equally direct: the brief already uses the structural logic of this rule but places it in the wrong doctrinal tier. The nominal-range / geographic-range mapping is the thinnest point and edges toward metaphor. Overall: 5 of 6 mapping points transfer with genuine structural rigor; this is the highest-transfer lens for this brief.
