---
agent: fd-public-private-positioning
track: adjacent
focus: Whether the public-facing identity and internal operational role are mutually consistent and independently legible; whether a non-Sylveste user can understand the public surface without accessing internal doctrine; whether internal framing leaks into public documentation.
target: docs/reviews/2026-04-29-metaharness-doctrine-brief.md
date: 2026-04-29
---

## Summary

The proposed public wording (line 84) is legible to a non-Sylveste operator but is at risk of immediate leakage because the brief does not specify which documents are public-facing and which are internal, nor does it define a propagation rule for keeping the two in sync. Several internal terms already present in accepted docs (line 29 lists `functionality-data-contract.md` as public) may surface Sylveste-specific vocabulary.

## Findings

- **P1** — The brief does not designate which of the proposed root-canon documents (MISSION, PHILOSOPHY, VISION, AGENTS/CLAUDE) are public-facing and which are internal. The public repo (`mistakeknot/nousromancer`, line 19) means all files in the repo are potentially public by default unless the brief explicitly restricts them. If MISSION.md or PHILOSOPHY.md are committed to the repo with internal Sylveste doctrine ("Sylveste is the primary canonical target," line 85), internal framing is immediately public. Failure scenario: a non-Sylveste user reads MISSION.md, encounters "Sylveste-grade work," "CASS recall," and "Beads" without definition, and cannot evaluate whether the product is relevant to them — the public/private boundary is violated at the first git push.

- **P1** — The proposed internal doctrine sentence (line 85): "Sylveste is the primary canonical target; Nousromancer is the Hermes-facing adapter/control surface" is not semantically consistent with the public sentence (line 84): "a Hermes dashboard metaharness for multi-agent operator work." The internal sentence establishes a specific primary user (Sylveste workflows); the public sentence implies a general audience (any multi-agent operator). These two sentences describe different products at different levels of specificity. A documentation author updating PHILOSOPHY.md cannot satisfy both sentences simultaneously — the internal sentence would require Sylveste-specific guidance that the public sentence would need to abstract away. Failure scenario: two future agents edit PHILOSOPHY.md independently, one following the internal sentence, one the public sentence, producing irreconcilable drafts.

- **P2** — The proposed public wording "a Hermes dashboard metaharness for multi-agent operator work" (line 84) carries no differentiating signal. "Multi-agent operator work" describes any orchestration dashboard. A Hermes user encountering this phrase has no basis for distinguishing Nousromancer from any other Hermes plugin. The brief acknowledges the public identity risk at constraint #3 (line 93: "do not erase the public extension identity") but does not provide replacement positive signal. The public wording needs at least one differentiating claim — e.g., "calm black-ledger runtime surface" (line 64) — to attract the intended operator audience without leaking internal terminology.

- **P2** — Constraint #5 (line 95) names the prohibited items for public UI/docs ("no raw Discord IDs, private workstream cards, internal governance secrets, or private repo assumptions") but does not name "Sylveste," "Beads," "CASS," "Interverse," or "Interspect" as prohibited internal terms. Each of these is an internal project name that would be opaque to a non-Sylveste user. The constraint list is necessary but not sufficient for protecting the public/private boundary.

- **P3** — The brief does not specify a maintenance process for the public/private split. There is no named document that owns the mapping from internal terms to public aliases, and no rule for when the public wording must be updated when internal doctrine changes. Over time, the split will drift without a structural owner. "Comprehensible to non-Sylveste users" (constraint #3, line 93) is a test condition but has no named enforcement point.

## Recommendations

- Lines 72–76: Add a "public vs. internal" designation for each proposed document. Suggested: MISSION.md = dual-mode (public section + internal section clearly labeled); PHILOSOPHY.md = internal; VISION.md = internal; AGENTS.md/CLAUDE.md = internal.
- Line 84–85: Replace the two-sentence split with a layered single document: one public-facing summary in README.md (derived from MISSION.md), one internal doctrine section in MISSION.md. Specify that README.md is the canonical public-facing surface.
- Line 95: Extend constraint #5 to include a named internal-terms exclusion list: "The following terms must not appear in public UI copy or README.md without an accompanying plain-English definition: Sylveste, Beads, CASS, Interverse, Interspect, nousrmncr [Beads prefix]."
- Line 84: Strengthen the public wording with one differentiating claim. Suggested: "a calm, legible Hermes dashboard for multi-agent operator triage" — this preserves the black-ledger visual identity without importing internal terminology.

## Open Questions

- Is `docs/functionality-data-contract.md` (listed as public at line 29) already using Sylveste-specific terminology that would constitute an existing boundary violation?
- Should the public/private split be enforced structurally (e.g., public docs live in a `public/` subdirectory) or by document-level labeling? The brief does not address this.
- Does "comprehensible to non-Sylveste users" require that the public surface is self-contained, or only that Sylveste terms are defined when they appear? These are meaningfully different standards.
