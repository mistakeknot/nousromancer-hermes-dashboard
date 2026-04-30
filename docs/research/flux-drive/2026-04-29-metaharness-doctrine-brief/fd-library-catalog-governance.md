---
agent: fd-library-catalog-governance
track: orthogonal
source_domain: library/information-science cataloging governance
focus: authority record integrity, controlled vocabulary, catalog rules vs. local practice notes, anti-cathedral discipline
target: docs/reviews/2026-04-29-metaharness-doctrine-brief.md
date: 2026-04-29
---

## Summary

A cataloging governance officer reads this brief as a proposal to create a new authority file for an entity ("Nousromancer as metaharness") whose key terms are undefined in any public-facing controlled vocabulary, while simultaneously threatening to conflate permanent catalog rules with session-specific local practice notes in the same documents. The anti-bloat constraint (line 96) is the right instinct, but it is not operationalized as a testable rule.

## Operational pattern in source domain

In library cataloging, the distinction between an **authority record** and a **local practice note** is structural and governed. An authority record (e.g., a MARC authority entry) states what is permanently true for all records in the catalog: the preferred form of a name, the scope of a subject heading, the canonical description of an entity. A local practice note states what this library does today under current constraints — it lives in a policy manual, not in the authority file. The cardinal failure mode is **local practice creep**: session-specific decisions (how we handle serials this quarter, temporary scope notes for a new collection) get written into authority records because they were important at time of entry, making the authority file unmaintainable. The cataloging governance officer's test is: "If this claim became false next year, would it require amending the authority record, or only the practice note?"

## Findings

- **P1 — The proposed PHILOSOPHY.md risks conflating authority records with local practice notes.** Lines 72–76 propose that `PHILOSOPHY.md` hold "metaharness principles, visual/product doctrine, anti-goals." Principles are authority-record material (permanent, constraining). Visual/product doctrine at V1 granularity and anti-goals specific to the current integration scope are local-practice material. Without a labeled distinction inside the document, a future agent cannot determine whether a principle in `PHILOSOPHY.md` is permanent (cannot be changed without a formal revision process) or a V1 workaround (expected to rotate). Concrete failure scenario: an agent reads "conservative `Possibly waiting` hints only" (line 40) as a permanent philosophy principle and refuses to implement a confirmed-upstream attention signal because the authority record appears to prohibit authoritative claims.

- **P2 — "Metaharness" is used in the proposed public wording (line 84) without a definition in any public-facing authority record.** The brief uses "metaharness" as a load-bearing term in the candidate public sentence (line 84) and the proposed mission sentence (line 80). Neither sentence points to a definition. A non-Sylveste reader — the analog of a patron using the public OPAC — cannot resolve the term without accessing internal context. The cataloging rule is: every term in a public record must be traceable to a definition in a public authority file. "Metaharness" is currently an undefined local term functioning as a subject heading.

- **P2 — Session decision IDs in the "current context" section (lines 45–46) risk migration into root canon documents.** The brief references `nousrmncr-lr8.3` and `nousrmncr-t0q.4` as accepted decisions. These are local practice note entries, not authority records. The risk is that a future agent writing `PHILOSOPHY.md` or `VISION.md` copies these session decisions as examples or inline constraints, embedding time-specific identifiers in permanent documents. The cataloging governance test: session IDs should never appear in `MISSION.md`, `PHILOSOPHY.md`, or `VISION.md`; they belong only in `AGENTS.md` or equivalent local-practice files.

- **P2 — The layered identity (lines 64–67) is expressed as a flat list, not a subject authority hierarchy.** A cataloging governance officer would represent the three identity layers as a scope note hierarchy: broader term (metaharness) → narrower terms (public extension, operator surface, strategic adapter). Without this hierarchy, a future agent building the catalog cannot determine which layer is authoritative when two layers conflict. Is the "public face" claim (line 64) subordinate to the "strategic role" claim (line 67), or co-equal?

- **P3 — The anti-bloat constraint (line 96) is a good principle but is not operationalized as a named test.** The brief states "root canon should reduce ambiguity for future agents, not become a cathedral." This is catalog governance doctrine. But a catalog governance officer would add a minimum-record test: "A root canon document passes the anti-bloat test if a new agent reading only that document can determine: (a) what Nousromancer is, (b) what it is not, and (c) where the boundary with Sylveste lies." Without a named test, "not a cathedral" is a preference, not a rule.

## Recommendations

- **Lines 72–76 (PHILOSOPHY.md scope):** Add an explicit labeling convention in the brief: "Sections of `PHILOSOPHY.md` labeled [PERMANENT] are authority-record material and require formal revision to change. Sections labeled [V1 POLICY] are local practice notes and may be updated without revision." Apply this to the six constraints at lines 89–96.
- **Line 84 (public wording):** Add a one-sentence definition of "metaharness" as a standalone term in the public-facing root canon — either a glossary entry in `PHILOSOPHY.md` or a defined term in `MISSION.md`. Proposed form: "A metaharness is a control surface that coordinates agent work across systems without absorbing those systems' internal state."
- **Lines 45–46 (session decision references):** Add a note to the brief: "Session decision IDs (nousrmncr-*) are local practice references. They must not appear in `MISSION.md`, `PHILOSOPHY.md`, or `VISION.md`. Reference them only in `AGENTS.md` or changelog artifacts."
- **Line 96 (anti-bloat constraint):** Expand to a named test: "Root canon passes anti-bloat review if a new agent reading only these four files can answer the three boundary questions without accessing chat history or session decision logs."

## What this lens cannot see

This lens has nothing to say about the truthfulness of live attention signals or the feed-promotion rules for the operator surface — that is the broadcast control room domain. It also cannot evaluate the diplomatic risk of naming Sylveste in public documents, or assess the constitutional authority-level hierarchy of the proposed document spine (which document outranks which). The question of whether AGENTS.md should be "local practice" or "authority extension" is within scope; the question of whether AGENTS.md is constitutional is charter-drafting territory.
