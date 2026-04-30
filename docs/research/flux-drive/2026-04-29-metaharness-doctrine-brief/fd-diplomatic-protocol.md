---
agent: fd-diplomatic-protocol
track: orthogonal
source_domain: diplomatic protocol / liaison practice
focus: public communique vs. private briefing discipline, naming obligations, liaison mandate scope, sovereign representation risk
target: docs/reviews/2026-04-29-metaharness-doctrine-brief.md
date: 2026-04-29
---

## Summary

A diplomatic protocol specialist reads this brief as an unresolved naming-and-representation problem: the brief explicitly asks whether to name Sylveste in public documents (line 101) but does not apply the standard diplomatic test — naming a sovereign party in a public communique creates implied endorsement and implied scope commitments on behalf of that party. The brief's proposed public/internal wording split is the right diplomatic instinct, but it is not elevated to a governing rule with audience definitions and naming permissions attached.

## Operational pattern in source domain

In diplomatic protocol, the distinction between a **public communique** and a **private briefing** governs what may be attributed and to whom. A communique issued by an embassy (liaison surface) speaks only about the embassy's mandate — it does not speak for the sovereign state it represents. If the communique names another sovereign ("in coordination with the government of X"), it creates at minimum an implied bilateral relationship and at most an implied authorization from that sovereign. The discipline is: a liaison surface speaks about its own mandate and refers to external sovereigns only in generic terms ("the relevant partners," "coordinating systems") unless explicit authorization to name them exists. The corollary is that internal briefings may name all parties freely, but the briefing classification must be made explicit and the briefing must not be derivable from the public communique.

## Findings

- **P1 — The brief leaves the "name Sylveste explicitly?" question open (lines 101–102) without applying a naming-authorization test.** The question "Should the root mission name Sylveste explicitly, or use layered public/internal wording?" is framed as a preference question, not a protocol question. The diplomatic test is: does Nousromancer have authorization from Sylveste/Intercore to name Sylveste in a public document in a sentence that could be read as a statement about Sylveste's scope or commitments? Line 80's proposed mission sentence — "without collapsing Sylveste's deeper canon into Hermes" — names Sylveste in the context of a constraint on Sylveste canon, which implies Nousromancer has standing to describe what Sylveste canon is and what it must not become. That is a commitment on Sylveste's behalf. Concrete failure: a public contributor reads `MISSION.md`, infers that Sylveste is a defined external system with a known canon boundary, and begins making architectural decisions based on that implied public commitment — without Sylveste/Intercore having authorized that description.

- **P1 — The internal doctrine uses Sylveste-specific terms (Beads, CASS, Interspect, handoff packets, route decisions) without defining them in the public record, creating a two-tier literacy requirement.** Lines 67 and 75 use these terms as functional vocabulary. An operator following only public documentation — README, `MISSION.md` — cannot determine what "Beads" or "CASS recall" mean, what authority Nousromancer has over them, or where the boundary of Nousromancer's mandate ends. In diplomatic terms: the liaison surface is operating on private briefing vocabulary in what may become semi-public operating documents (`AGENTS.md`, `CLAUDE.md`). An operator inherits a mandate they cannot fully read without insider access. The protocol fix is not to define all Sylveste terms publicly — it is to make the referral explicit: "These terms are defined in Sylveste canon. Nousromancer exposes but does not define them."

- **P2 — The proposed VISION.md (line 75) implies integration milestones that depend on Sylveste/Intercore decisions not under Nousromancer's authority.** "Beads / CASS / review/receipt integrations" in a vision document reads as a Nousromancer commitment to achieve these integrations. In diplomatic terms, this is a communique that implies commitments from a third sovereign. A VISION.md milestone is a public declaration; if the milestone depends on an external party's decision, the document must label it as a condition, not a commitment. The protocol form: "When Sylveste exposes [X], Nousromancer will surface [Y]" rather than "Nousromancer will integrate Beads and CASS."

- **P2 — The proposed boundary constraint (line 67) conflates "expose" with "operate."** The brief states: "Nousromancer should expose and operate Sylveste/Intercore work from Hermes without absorbing or duplicating it." A diplomatic protocol specialist notes that "operate" is a stronger verb than "expose" — it implies active control, not just representation. A liaison surface exposes the sovereign's work; it does not operate the sovereign's work (that is the sovereign's function). The verb choice positions Nousromancer closer to a co-sovereign than a liaison. This is the liaison-scope creep risk: the embassy that begins "operating" foreign policy rather than "representing" it gradually absorbs the principal's authority.

- **P3 — The three-audience structure (lines 64–67) does not assign document-to-audience mappings.** Diplomatic protocol requires that each communication channel name its audience explicitly. The brief names three layers but does not say: "README speaks to [audience]. `MISSION.md` speaks to [audience]. Internal doctrine speaks to [audience]." Without this, each document risks code-switching audiences mid-text.

## Recommendations

- **Line 80 (mission sentence, Sylveste naming):** Apply the naming-authorization test before writing `MISSION.md`. If authorization exists, name Sylveste with a scope-limiting clause: "Sylveste is an external canonical system; Nousromancer exposes its outputs but does not define or commit to its scope." If authorization is uncertain, use generic form: "without collapsing the deeper canon of the coordinating systems into Hermes." The brief should resolve this before doc creation, not leave it for the mission-interview step.
- **Lines 67, 75 (Beads, CASS, internal terms in semi-public docs):** Add a referral clause to any document using Sylveste-specific terms: "Terms such as Beads, CASS, and Interspect are defined in Sylveste canon. Nousromancer surfaces these artifacts; their definitions are not under Nousromancer's authority." This makes the liaison boundary explicit and prevents operators from treating Nousromancer as the authority on what these terms mean.
- **Line 75 (VISION.md integration milestones):** Reframe all integration milestones as conditions: "If and when [external capability] becomes available via Hermes-facing contract, Nousromancer will surface [specific output]." This preserves the vision while making external dependency explicit.
- **Line 67 (boundary constraint wording):** Replace "expose and operate" with "expose and represent." This aligns the liaison mandate with diplomatic norms: Nousromancer surfaces and represents Sylveste work, it does not operate it.

## What this lens cannot see

This lens has nothing meaningful to say about feed-promotion rules or the truthfulness discipline of the attention-signal layer — that is broadcast control room territory. It cannot assess whether the document spine maps to the correct constitutional authority hierarchy — that is charter-drafting territory. It also cannot evaluate whether "metaharness" requires a controlled-vocabulary entry in a public authority record — that is library cataloging governance territory.
