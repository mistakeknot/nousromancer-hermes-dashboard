---
agent: fd-monastic-scriptorium
track: distant
source_domain: Benedictine/Cistercian scriptorium copy discipline
focus: chain of authority from autograph to copy, the rule that a copy must never claim to be its source, and the doctrine that marginalia which exceed the text are a corruption
target: docs/reviews/2026-04-29-metaharness-doctrine-brief.md
date: 2026-04-29
---

## Summary

Scriptorium discipline distinguishes three levels of document: the autograph (the author's own hand, the authoritative source), the fair copy (a clean transcription that simplifies without altering meaning), and the working copy (a copy-in-progress that may carry corrections, glosses, and marginalia and must never be released as if it were the fair copy). The brief proposes a three-tier stack — Sylveste (deeper canon), Nousromancer (Hermes-facing adapter), operator surface (dashboard) — that maps precisely onto autograph / fair copy / working copy, but the proposed doctrine does not name these roles or enforce the rules that govern each level.

## Source Mechanism

A scriptorium master enforced a strict provenance chain: every copy must name its exemplar (the manuscript it was copied from), state what corrections the scribe made and by what authority, and close with a colophon declaring the scope of the text and where commentary begins. A fair copy is released as a clean text; it simplifies the autograph's difficult hand but does not add new claims. A working copy is a copy used for active reference and annotation; it may accumulate marginalia, interlinear glosses, and corrections, but it is never released as a fair copy without first stripping the marginalia and submitting the additions for admission into the main text or explicit relegation to commentary. The gravest corruption is a copy that claims the authority of the autograph while containing additions the autograph never authorized — later scribes treat the additions as canon.

## Isomorphism Mapping

- Autograph (the author's own hand, sole authority) ↔ Sylveste / Intercore / Interspect canon (line 67: "the deeper substrate/canon/governance layer"); this is the text Nousromancer must not claim to supersede.
- Fair copy (clean transcription, simplifies without altering) ↔ Nousromancer as the Hermes-facing adapter (line 67: "expose and operate that work from Hermes without absorbing or duplicating it"); a fair copy exposes the text to a new audience without altering it.
- Working copy (active reference, carries marginalia and heuristics) ↔ the operator surface / attention-signal layer (lines 38–42: the V1/demo boundary with hedged "Possibly waiting" signals); the attention heuristics are working-copy glosses on upstream state, not authoritative readings.
- Colophon (closing scope statement) ↔ the absent closing statement in the proposed root-canon spine (lines 72–76); none of the five proposed files is described as bearing a scope boundary that tells future agents where the canon ends and commentary begins.
- Marginalia-exceeding-text corruption ↔ constraint 6 (line 96: "root canon should reduce ambiguity for future agents, not become a cathedral"); the scriptorium's anti-marginalia rule and the brief's anti-bloat constraint are structurally identical, but the brief does not state the enforcement mechanism.
- Provenance statement (naming the exemplar) ↔ the proposed AGENTS.md / CLAUDE.md (line 76) are described as preventing rediscovery from chat history; a provenance statement on each root-canon document serves this function more precisely by naming which upstream Sylveste artifact each document derives from.

## Findings

- **P0** — The candidate mission sentence (line 80) states that Nousromancer "makes Hermes Agent a usable metaharness for Sylveste-grade agent work" without naming its exemplar — the specific Sylveste artifact, contract, or governance document it derives from. A copy that does not name its exemplar cannot be checked for faithfulness, and later scribes cannot verify that the mission statement faithfully transcribes Sylveste intent rather than adding new claims. Failure scenario: a future agent reads MISSION.md, finds no provenance link to Sylveste, and treats the mission statement as a primary source, deriving new integrations that conflict with Sylveste governance without recognizing the conflict.

- **P1** — The attention-signal heuristics (lines 38–42) are presented within the brief as accepted constraints of the V1/demo boundary without being explicitly labeled as working-copy glosses derived from upstream evidence. The concern is that when these heuristics migrate into PHILOSOPHY.md, they may be presented as primary doctrine rather than as derived heuristics. Failure scenario: a future agent reads PHILOSOPHY.md, finds "Possibly waiting" described as a doctrine principle rather than a hedged heuristic, and builds an attention-signal system that emits this state without the upstream evidence requirement the brief currently enforces at line 40.

- **P2** — The proposed root-canon spine (lines 72–76) has no colophon rule. Without a closing scope statement on each file, marginalia (operational caveats, edge-case qualifications, historical context) will accumulate inside MISSION.md and PHILOSOPHY.md over time. Constraint 6 (line 96) names the anti-bloat goal but does not specify who adjudicates when commentary has exceeded the text, or what happens to admitted commentary.

- **P3** — The public/internal wording split (lines 84–85) is sound fair-copy discipline — the public wording simplifies without (apparently) contradicting the internal doctrine. However, neither the brief nor the proposed documents include a rule that the public wording must be reviewed against internal doctrine whenever internal doctrine changes. Without this rule, the public wording drifts from its autograph silently.

## Recommendations

1. Add a provenance statement to each proposed root-canon document. For MISSION.md, add one sentence naming the upstream Sylveste artifact or contract it derives from (e.g., the attention-state contract from `nousrmncr-t0q.4` at line 46, or a named Sylveste governance document). This is the equivalent of the scriptural note "copied from the exemplar held at [location] in the year [date]."

2. Explicitly label the attention-signal heuristics in any PHILOSOPHY.md draft as "working-copy doctrine, derived from upstream evidence, subject to revision as upstream state evolves." The exact mechanism of derivation (which upstream field, which heuristic rule) must be cited, not assumed. This directly addresses the P1 risk.

3. Add a colophon rule to the canon spine governance (line 76 discussion): each root-canon document must close with a one-sentence scope boundary: "This document covers [X]. Operational detail, edge cases, and agent-specific guidance belong in [AGENTS.md / CLAUDE.md / linked bead]." This is the enforcement mechanism that constraint 6 (line 96) currently lacks.

4. Add a fair-copy check rule: whenever internal doctrine (PHILOSOPHY.md) is revised, the public wording (line 84) must be reviewed for consistency. This prevents the public fair copy from drifting from its autograph.

## Honest Distance Check

The isomorphism transfers with strong structural rigor on the provenance-statement and working-copy-vs-fair-copy mechanisms — these map directly onto specific, observable absences in the brief. The colophon mechanism maps cleanly onto the anti-bloat constraint and adds genuine precision: it specifies where to put the enforcement mechanism that constraint 6 describes but does not specify. The fair-copy / public-wording-drift finding is real but thin — it captures a maintenance risk rather than a current defect. Overall: 4 of 6 mapping points transfer with genuine structural rigor; the isomorphism is among the tightest of the four Track C lenses for this brief.
